# BAAI Embedding Manager for RAG

This implementation uses:

```python
BAAI/bge-small-en-v1.5
```

which is:
- lightweight
- fast
- strong for semantic retrieval
- excellent for beginner/intermediate RAG systems

---

# Install Dependencies

```bash
pip install sentence-transformers
```

---

# EmbeddingManager Class

```python
from sentence_transformers import SentenceTransformer
import numpy as np


class EmbeddingManager:

    # Handles embedding generation using BAAI BGE models.


    def __init__(
        self,
        model_name: str = "BAAI/bge-small-en-v1.5"
    ):

        self.model_name = model_name
        self.model = SentenceTransformer(model_name)

        print(f"Loaded embedding model: {model_name}")
        print(
            f"Embedding Dimension: "
            f"{self.model.get_sentence_embedding_dimension()}"
        )

    def generate_document_embeddings(
        self,
        texts,
        batch_size: int = 32
    ):

        # Generate embeddings for documents/chunks.


        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            normalize_embeddings=True,
            show_progress_bar=True
        )

        return embeddings

    def generate_query_embedding(self, query: str):

        # Generate embedding for user query.


        instruction = (
            "Represent this sentence for "
            "searching relevant passages: "
        )

        query = instruction + query

        embedding = self.model.encode(
            [query],
            normalize_embeddings=True
        )[0]

        return embedding

    def embedding_dimension(self):

        # Returns embedding vector dimension.


        return self.model.get_sentence_embedding_dimension()
```

---

# Example Usage

```python
embedding_manager = EmbeddingManager()

documents = [
    "This Agreement shall terminate upon breach.",
    "Recovery Point Objective defines acceptable data loss."
]

doc_embeddings = (
    embedding_manager
    .generate_document_embeddings(documents)
)

query_embedding = (
    embedding_manager
    .generate_query_embedding(
        "What is Recovery Point Objective?"
    )
)

print(doc_embeddings.shape)
print(query_embedding.shape)
```

---

# Why normalize_embeddings=True?

Very important for cosine similarity search.

Benefits:
- better retrieval quality
- more stable similarity scores
- optimized for Pinecone/Chroma cosine search

---

# Recommended Vector DB Metric

When using Pinecone or Chroma:

```python
metric = "cosine"
```

Do NOT use:
- euclidean
- dot product (unless intentionally configured)

---

# Why BGE Small?

Advantages:
- fast inference
- low VRAM/RAM usage
- excellent retrieval quality
- production-friendly
- much stronger than MiniLM

---

# Recommended Next Steps

After embeddings:
1. legal-aware chunking
2. metadata filtering
3. Pinecone/Chroma integration
4. hybrid retrieval
5. rerankers
