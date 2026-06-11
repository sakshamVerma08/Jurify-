from __future__ import annotations

from typing import Any, Dict, List, Optional, Sequence

from embedding.embedding_manager import EmbeddingManager
from vector_store.vector_store import PineconeVectorStore, _chunk_id

class LegalRetriever:

    def __init__(self,
    vector_store: PineconeVectorStore,
    embeddings: EmbeddingManager,
    score_threshold: float = 0.7
    ):
        self.vs = vector_store
        self.emb = embeddings 
        self.score_threshold = score_threshold


    # Primary Retrieval

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
        metadata_filter: Optional[Dict[str,Any]] = None,
        score_threshold: Optional[float] = 0.7
    )-> List[Dict[str,Any]]:
        """Do Semantic Search in Vector DB.
            Then apply the score-threshold value and discard useless documents.
            Then sort the documents in Descending order by their score value.
        """

        threshold = (
            score_threshold if score_threshold is not None else self.score_threshold
        )

        q_vec = self.emb.generate_query_embedding(query)

        hits = self.vs.query(
            embedding = q_vec,
            top_k=top_k,
            metadata_filter= metadata_filter
        )

        print(f"Raw hits count: {len(hits)}")

        for h in hits:
            print(h["score"])

        kept: List[Dict[str,Any]] = []

        for rank, h in enumerate(hits, start=1):
            if(h["score"] < threshold):
                continue 
                
            h["rank"] = rank 
            h["is_neighbor"] = False 
            kept.append(h)    

        return kept

        

    # Retrieval + Same-Document Neighbor Expansion 
    # Basically, in Neighbor Expansion we retrieve the adjacent chunks of the original retrieved chunk to preserve the partial context present in adjacent chunk
    # For example: [chunk 0, chunk 1, chunk 2]
    #                            ^ 
    #                            |__ original retrieved chunk
    #                            
    # So we retrieve chunk 0 & chunk 2 as well. 

    def retrieve_with_neighbor(
        self,
        query: str,
        top_k: int = 5,
        include_prev: bool = True,
        include_next: bool = True,
        metadata_filter: Optional[Dict[str,Any]] = None,
        score_threshold: float = 0.7
    )-> List[Dict[str,Any]]:
        """ Retrieve top_k, then pull each iht's adjacent chunks in the same doc.

        Neighbor chunks share document_name and have chunk_index_in_doc = i±1.
        We resolve them by deterministic chunk ID (`<doc>:chunk:<idx>`) and
        return everything ordered first by document, then by chunk index — so
        the LLM sees the surrounding flow of the text naturally.
        """
        primary_chunk = self.retrieve(
            query=query,
            top_k=top_k,
            metadata_filter=metadata_filter,
            score_threshold = score_threshold
        )

        if not primary_chunk:
            return []

        # Buld the set of neighbor ID's to fetch
        neighbor_ids: List[str] = []

        seen_ids = {h["id"] for h in primary_chunk}

        for h in primary_chunk: 
            md = h["metadata"]
            doc_name = md.get("document_name", "unknown")

            idx = md.get("chunk_index_in_doc")

            if(idx is None):
                continue

            try:
                idx=int(idx)
            except (TypeError, ValueError):
                continue 

            if include_prev and md.get("has_previous"):
                nid = _chunk_id(doc_name, idx-1)
                if(nid not in seen_ids):
                    neighbor_ids.append(nid)
                    seen_ids.add(nid)

            if include_next and md.get("has_next"):
                nid = _chunk_id(doc_name, idx+1)
                if(nid not in seen_ids):
                    neighbor_ids.append(nid)
                    seen_ids.add(nid)

        # Single Batched fetch for all neighbors
        raw_neighbors = self.vs.fetch_by_ids(neighbor_ids) if neighbor_ids else {}
        neighbors = []

        for nid in neighbor_ids:
            n = raw_neighbors.get(nid)
            if(n is None):
                continue 

            neighbors.append(
                {
                    **n,
                    "score": 0.0,
                    "rank": None,
                    "is_neighbor": True,
                }
            )


        combined = primary_chunk + neighbors

        combined.sort(
            key =lambda h:(
                h["metadata"].get("document_name",""),
                int(h["metadata"].get("chunk_index_in_doc",0) or 0)
                )
        )

        return combined



    # Helpers for building common filters


    @staticmethod
    def filter_by_documents(document_names: Sequence[str])->Dict[str,Any]:
            """Pinecone metadata filter: only match chunks from these documents.
            """
            return {"document_name": {"$in": list(document_names)}}



    @staticmethod
    def filter_by_page_range(min_page: int, max_page: int)->Dict[str,Any]:
        """
        Pinecone metadata filter: only chunks whose page number is in range.
        """
        return {"page_number":{"$gte":min_page, "$lte": max_page}}
            
    @staticmethod
    def filter_by_section_kind(kinds: Sequence[str]) -> Dict[str, Any]:
        """Pinecone metadata filter: only chunks tagged with these section kinds."""
        return {"section_kind": {"$in": list(kinds)}}
                

    