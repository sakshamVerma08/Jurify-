# Pinecone Vector Store Wrapper

A thin, production-focused wrapper around Pinecone for Legal RAG ingestion and retrieval pipelines.

This module encapsulates all Pinecone-specific logic, including:

- Idempotent Pinecone serverless index creation
- Batched vector upserts
- Deterministic chunk IDs
- Metadata sanitization
- Similarity search
- Namespace-aware operations
- Fetching chunks by IDs
- Index administration helpers

Source file: `vector_store.py`

---

## Features

### Deterministic Chunk IDs
Each chunk receives a stable, traceable ID:

```text
<document_name>:chunk:<idx>
```

Re-upserting the same chunk overwrites the existing vector cleanly.

---

### Metadata Sanitization
Pinecone metadata only supports specific data types.

This wrapper:

- Removes `None` values
- Preserves:
  - `str`
  - `int`
  - `float`
  - `bool`
  - `list[str]`
- Converts unsupported values into strings when possible

---

### Automatic Index Creation
If the index does not exist, the wrapper:

1. Creates a serverless Pinecone index
2. Waits until the index becomes ready
3. Verifies embedding dimensions

---

### Batch Upserts
Vectors are uploaded in batches to respect Pinecone request limits.

---

### Query Support
Supports:

- Similarity search
- Metadata filtering
- Optional embedding value return
- Namespace isolation

---

## Installation

```bash
pip install pinecone numpy langchain-core
```

---

## Environment Variables

Create a `.env` file:

```env
PINECONE_API_KEY=your_api_key
```

Your `settings` object should provide:

```python
pinecone_index_name
embedding_dim
pinecone_namespace
pinecone_metric
pinecone_cloud
pinecone_region
upsert_batch_size
default_top_k
```

---

## Project Structure

```text
project/
│
├── vector_store.py
├── config.py
└── ...
```

---

## Usage

### Initialize Vector Store

```python
from vector_store import PineconeVectorStore

store = PineconeVectorStore()
```

---

### Upsert Chunks

```python
from langchain_core.documents import Document
import numpy as np

chunks = [
    Document(
        page_content="Legal clause text",
        metadata={
            "document_name": "contract.pdf",
            "chunk_index_in_doc": 0,
            "page": 1,
        }
    )
]

embeddings = np.random.rand(1, 1536)

store.upsert_chunks(chunks, embeddings)
```

---

### Query Similar Chunks

```python
query_embedding = np.random.rand(1536)

results = store.query(
    embedding=query_embedding,
    top_k=5,
)

for hit in results:
    print(hit["score"])
    print(hit["text"])
```

---

### Metadata Filtering

```python
results = store.query(
    embedding=query_embedding,
    metadata_filter={
        "document_name": "contract.pdf"
    }
)
```

---

### Fetch by IDs

```python
store.fetch_by_ids([
    "contract.pdf:chunk:0"
])
```

---

### Delete All Vectors

```python
store.delete_all()
```

---

## API Reference

---

### `PineconeVectorStore`

Main wrapper class around Pinecone.

#### Constructor

```python
PineconeVectorStore(
    index_name: str,
    dimension: int,
    namespace: str,
    metric: str,
    cloud: str,
    region: str,
    api_key: str,
)
```

---

### Methods

#### `upsert_chunks(...)`

Upserts document chunks and embeddings into Pinecone.

```python
upsert_chunks(
    chunks,
    embeddings,
    batch_size,
)
```

Returns:

```python
int
```

Number of vectors uploaded.

---

#### `query(...)`

Runs similarity search.

```python
query(
    embedding,
    top_k,
    metadata_filter,
    include_values,
)
```

Returns:

```python
List[Dict[str, Any]]
```

---

#### `fetch_by_ids(...)`

Fetches vectors using stable chunk IDs.

---

#### `describe_stats(...)`

Returns Pinecone index statistics.

---

#### `delete_all(...)`

Deletes all vectors in the current namespace.

Use carefully.

---

## Internal Helper Functions

### `_chunk_id(doc_name, idx)`

Creates deterministic Pinecone-safe chunk IDs.

---

### `_sanitize_metadata(meta)`

Ensures metadata complies with Pinecone constraints.

---

## Design Notes

### Why store chunk text in metadata?

This allows retrieval without requiring a second datastore lookup.

Pinecone metadata limit (~40KB/vector) is sufficient for typical chunk sizes.

---

### Why deterministic IDs?

Benefits:

- Idempotent re-indexing
- Easier debugging
- Traceability
- Neighbor lookup support

---

### Why delayed Pinecone import?

```python
from pinecone import Pinecone
```

is imported inside `__init__` so unit tests can run without requiring Pinecone installed.

---

## Example Retrieval Result

```python
{
    "id": "contract.pdf:chunk:0",
    "score": 0.91,
    "text": "This agreement shall...",
    "metadata": {
        "page": 1
    }
}
```

---

## Potential Improvements

Possible future enhancements:

- Async upserts
- Retry/backoff logic
- Hybrid search
- Sparse + dense retrieval
- Multi-tenant namespace management
- Streaming ingestion
- Observability hooks
- Automatic chunk compression

---

## License

MIT License

---

## Source

Generated from:

`vector_store.py`
