# Legal Document Chunking Plan

## Goal

Improve RAG retrieval quality for legal documents by preserving:

- Sections
- Clauses
- Definitions
- Context continuity

Instead of naive fixed-size chunking.

---

# Problems in Current Chunking

Current issues:

- Splits clauses mid-sentence
- Breaks legal meaning
- Small chunk size loses context
- Period-based splitting is too aggressive
- Metadata is not document-aware

---

# Improved Strategy

## 1. Increase Chunk Size

### Current

```python
chunk_size = 1024
chunk_overlap = 150
```

### New

```python
chunk_size = 2200
chunk_overlap = 300
```

Reason:

- Legal clauses are long
- Definitions span multiple paragraphs
- Context preservation matters more than small chunks

---

# 2. Structure-Aware Splitting

Before recursive chunking:

- Split document into major legal sections

Examples:

- SECTION
- ARTICLE
- CHAPTER
- Numbered clauses

Use regex preprocessing.

Example:

```python
re.split(
    r'(?=\n(?:SECTION|Section|ARTICLE|Article|CHAPTER|Chapter))',
    text
)
```

---

# 3. Better Separators

Use legal-aware separators.

Recommended:

```python
separators=[
    "\n\nSECTION ",
    "\n\nARTICLE ",
    "\n\nCHAPTER ",
    "\n\n",
    "\n",
    ". ",
    "; ",
    " "
]
```

Avoid aggressive sentence splitting.

---

# 4. Metadata Improvements

Add metadata:

```python
chunk.metadata['section_title']
chunk.metadata['clause_number']
chunk.metadata['document_name']
chunk.metadata['page_number']
```

Benefits:

- Better filtering
- Better retrieval
- Better citations
- Better reranking

---

# 5. Track Chunk Position Per Document

Do NOT compute:

```python
relative_position
```

globally across all PDFs.

Instead:

- Track positions per document
- Preserve local ordering

---

# 6. Future Improvements

## Better Embeddings

Current:

```python
all-MiniLM-L6-V2
```

Recommended:

- BAAI/bge-base-en-v1.5
- intfloat/e5-large-v2

---

# 7. Long-Term Architecture

Recommended pipeline:

```text
PDF
→ structure extraction
→ legal-aware chunking
→ embeddings
→ hybrid retrieval
→ reranker
→ LLM
```

Instead of:

```text
PDF
→ naive chunking
→ embeddings
→ LLM
```

---

# Priority Order

1. Structure-aware chunking
2. Better separators
3. Larger chunk sizes
4. Better metadata
5. Better embeddings
6. Hybrid retrieval
7. Reranker
