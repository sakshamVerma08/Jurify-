# Pipelines Overview

This directory contains utility scripts that support the **Legal Retrieval & Retrieval‑Augmented Generation (RAG)** workflow of the LexConnect project.

## Files

| File | Purpose |
|------|---------|
| `query_test.py` | Simple interactive script that demonstrates how to use the **LegalRetriever**. It loads environment variables, creates an `EmbeddingManager`, connects to a Pinecone vector store, builds a `LegalRetriever`, prompts the user for a query, and prints the retrieved results along with their scores. Useful for quick manual testing of the retrieval pipeline. |
| `rag_execute.py` | Implements the full **RAG ingestion pipeline** (`RAGPipeline`). It loads PDFs from a given directory, splits them into chunks, generates embeddings via `EmbeddingManager`, and upserts those embeddings into Pinecone. The script also prints progress messages and a final summary of vectors stored. It can be run directly (`python rag_execute.py`) to ingest a document collection. |
| `retrieval.py` | Provides the **LegalRetriever** class, which performs semantic search against a Pinecone vector store. It includes:
  - `retrieve`: basic top‑k retrieval with optional score threshold and metadata filtering.
  - `retrieve_with_neighbor`: retrieval that also pulls adjacent chunks (previous/next) for context expansion.
  - Helper static methods (`filter_by_documents`, `filter_by_page_range`, `filter_by_section_kind`) for building Pinecone metadata filters.
  This module is the core of the retrieval side of the RAG system. |

## Usage
- **Testing retrieval**: Run `python query_test.py` and enter a query when prompted.
- **Ingesting documents**: Adjust `pdf_directory` in `rag_execute.py` (default points to `../kaggle_dataset/`) and execute `python rag_execute.py`.
- **Programmatic access**: Import `LegalRetriever` from `retrieval.py` in other services to perform semantic searches.

---
*Generated automatically to keep documentation in sync with pipeline scripts.*
