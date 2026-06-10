"""Pinecone vector store wrapper.

Encapsulates all Pinecone-specific concerns:
- Idempotent serverless index creation (matches embedding dimension).
- Batched upserts that respect Pinecone's per-request limits.
- Deterministic, traceable chunk IDs: `<document_name>:chunk:<idx>`.
- Metadata filter helpers (filter by document, page range, section, etc.).
"""

from __future__ import annotations

import time
from typing import Any, Dict, Iterable, List, Optional, Sequence

import numpy as np
from langchain_core.documents import Document
import os

def _chunk_id(doc_name: str, idx: int) -> str:
    """Stable, human-readable chunk ID — re-upserting same chunk overwrites it."""
    # Pinecone IDs must be ASCII; replace anything risky.
    safe = "".join(c if c.isalnum() or c in "-_." else "_" for c in doc_name)
    return f"{safe}:chunk:{idx}"


def _sanitize_metadata(meta: Dict[str, Any]) -> Dict[str, Any]:
    """Pinecone metadata values must be str/int/float/bool/list-of-str.

    We strip None values (Pinecone rejects them) and coerce anything weird
    to its string form.
    """
    out: Dict[str, Any] = {}
    for k, v in meta.items():
        if v is None:
            continue
        if isinstance(v, bool):
            out[k] = v
        elif isinstance(v, (int, float, str)):
            out[k] = v
        elif isinstance(v, list) and all(isinstance(x, str) for x in v):
            out[k] = v
        else:
            try:
                out[k] = str(v)
            except Exception:
                pass
    return out


class PineconeVectorStore:
    """Thin wrapper around Pinecone for legal-RAG ingestion + retrieval."""

    def __init__(
        self,
        index_name: str,
        dimension: int,
        api_key: str,
        namespace: str = "",
        cloud: str = "aws",
        region: str = "us-east-1",
        metric: str = "cosine"
    ):
        # Import here so the rest of the package doesn't require pinecone-client
        # to be installed (useful for unit-testing the chunker in isolation).
        from pinecone import Pinecone, ServerlessSpec

        if not api_key:
            raise RuntimeError(
                "PINECONE_API_KEY is not set. Add it to your .env file."
            )

        self.index_name = index_name
        self.dimension = dimension
        self.namespace = namespace or None  # Pinecone wants None for default ns
        self._pc = Pinecone(api_key=api_key)

        if not self._pc.has_index(index_name):
            print(
                f"Creating Pinecone index '{index_name}' "
                f"(dim={dimension}, metric={metric}, {cloud}/{region})..."
            )
            self._pc.create_index(
                name=index_name,
                dimension=dimension,
                metric=metric,
                spec=ServerlessSpec(cloud=cloud, region=region),
            )
            # Wait for readiness (serverless is usually fast but be safe).
            for _ in range(60):  # cap wait at ~60s
                desc = self._pc.describe_index(index_name)
                status = getattr(desc, "status", {}) or {}
                ready = status.get("ready") if isinstance(status, dict) else getattr(status, "ready", False)
                if ready:
                    break
                time.sleep(1)
            print("  → index ready.")
        else:
            desc = self._pc.describe_index(index_name)
            if desc.dimension != dimension:
                raise RuntimeError(
                    f"Pinecone index '{index_name}' exists with dimension "
                    f"{desc.dimension}, but the embedding model produces "
                    f"{dimension}-d vectors. Either change the model, change "
                    f"the index name, or delete the old index."
                )
            print(f"Using existing Pinecone index '{index_name}' (dim={desc.dimension}).")

        self.index = self._pc.Index(index_name)

    # ------------------------------------------------------------------ #
    # Ingest
    # ------------------------------------------------------------------ #
    def upsert_chunks(
        self,
        chunks: Sequence[Document],
        embeddings: np.ndarray,
        batch_size: int = 100
    ) -> int:
        """Upsert a list of (Document, embedding) pairs in batches."""
        if len(chunks) != len(embeddings):
            raise ValueError(
                f"Mismatch: {len(chunks)} chunks vs {len(embeddings)} embeddings"
            )

        print(f"Upserting {len(chunks)} vectors into '{self.index_name}'...")
        vectors: List[Dict[str, Any]] = []
        for chunk, emb in zip(chunks, embeddings):
            doc_name = chunk.metadata.get("document_name", "unknown")
            idx = chunk.metadata.get("chunk_index_in_doc", 0)
            vid = _chunk_id(doc_name, idx)

            # Persist the chunk text in metadata so retrieval can return it
            # without a second lookup. Pinecone metadata is ~40KB per vector;
            # our 2200-char chunks fit comfortably.
            md = _sanitize_metadata({**chunk.metadata, "text": chunk.page_content})

            vectors.append({"id": vid, "values": emb.tolist(), "metadata": md})

        total = 0
        for start in range(0, len(vectors), batch_size):
            batch = vectors[start : start + batch_size]
            self.index.upsert(vectors=batch, namespace=self.namespace)
            total += len(batch)
            print(f"  upserted {total}/{len(vectors)}")

        print(f"Upsert complete. Index stats:")
        print(f"  {self.describe_stats()}")
        return total

    # ------------------------------------------------------------------ #
    # Query
    # ------------------------------------------------------------------ #
    def query(
        self,
        embedding: np.ndarray,
        top_k: int = 5,
        metadata_filter: Optional[Dict[str, Any]] = None,
        include_values: bool = False,
    ) -> List[Dict[str, Any]]:
        """Run a similarity search and return enriched hit dicts."""
        result = self.index.query(
            vector=embedding.tolist(),
            top_k=top_k,
            include_metadata=True,
            include_values=include_values,
            filter=metadata_filter,
            namespace=self.namespace,
        )
        hits: List[Dict[str, Any]] = []
        # Pinecone QueryResponse supports both dict-like access (older) and
        # attribute access (newer). Handle both.
        matches = getattr(result, "matches", None)
        if matches is None and isinstance(result, dict):
            matches = result.get("matches", [])
        for match in matches or []:
            # `match` can be dict-like or a pydantic-style object.
            if isinstance(match, dict):
                mid = match["id"]
                mscore = match.get("score", 0.0)
                md = match.get("metadata", {}) or {}
            else:
                mid = match.id
                mscore = getattr(match, "score", 0.0)
                md = getattr(match, "metadata", {}) or {}
            hits.append(
                {
                    "id": mid,
                    "score": float(mscore),
                    "text": md.get("text", ""),
                    "metadata": {k: v for k, v in md.items() if k != "text"},
                }
            )
        return hits

    def fetch_by_ids(self, ids: Iterable[str]) -> Dict[str, Dict[str, Any]]:
        """Fetch chunks by their stable IDs — used for neighbor lookup."""
        ids = list(ids)
        if not ids:
            return {}
        result = self.index.fetch(ids=ids, namespace=self.namespace)
        out: Dict[str, Dict[str, Any]] = {}
        # The Pinecone SDK returns either an object with `.vectors` or a dict.
        vectors = getattr(result, "vectors", None)
        if vectors is None and isinstance(result, dict):
            vectors = result.get("vectors", {})
        for vid, v in (vectors or {}).items():
            md = (getattr(v, "metadata", None) or (v.get("metadata", {}) if isinstance(v, dict) else {})) or {}
            out[vid] = {
                "id": vid,
                "text": md.get("text", ""),
                "metadata": {k: val for k, val in md.items() if k != "text"},
            }
        return out

    # ------------------------------------------------------------------ #
    # Admin
    # ------------------------------------------------------------------ #
    def describe_stats(self) -> Dict[str, Any]:
        return self.index.describe_index_stats()

    def delete_all(self) -> None:
        """Wipe every vector in the current namespace. Use with care."""
        self.index.delete(delete_all=True, namespace=self.namespace)
        print(f"Deleted all vectors from namespace='{self.namespace or '(default)'}'.")
