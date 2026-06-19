from fastapi import APIRouter
from pydantic import BaseModel 
import os
from dotenv import load_dotenv

from embedding.embedding_manager import EmbeddingManager
from vector_store.vector_store import PineconeVectorStore
from pipelines.retrieval import LegalRetriever
from pipelines.query_pipeline import QueryPipeline
from pipelines.groq_llm import GroqLLM
load_dotenv()

print("QUERY_IMPORTED")
router = APIRouter()

@router.post("", response_model=dict)
async def query_function(payload: dict):
    """Handle query request from frontend.
    Expects JSON payload with a 'query' field.
    Returns a JSON with a 'response' field containing the answer.
    """
    query_text = payload.get("query", "")
    embeddingManager = EmbeddingManager()
    vs = PineconeVectorStore(
        api_key = os.getenv("PINECONE_DB_KEY")
    )
    retriever = LegalRetriever(vs, embeddingManager)
    llm = GroqLLM(
        api_key = os.getenv("GROQ_API_KEY"),
        model="llama-3.3-70b-versatile"
    )

    query_pipeline = QueryPipeline(
        retriever,
        llm
    )
    response = query_pipeline.ask(query_text)
    return {"response": response}
