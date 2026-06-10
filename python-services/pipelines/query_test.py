import os, sys
from dotenv import load_dotenv
load_dotenv()

# Add the project root to PYTHONPATH so sibling packages can be imported
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from embedding.embedding_manager import EmbeddingManager
from vector_store.vector_store import PineconeVectorStore
from pipelines.retrieval import LegalRetriever

embedding_manager = EmbeddingManager()

vs = PineconeVectorStore(
    dimension=embedding_manager.embedding_dimension(),
    index_name = "jurify-rag",
    api_key=os.getenv("PINECONE_DB_KEY")
)

retriever = LegalRetriever(
    vector_store = vs,
    embeddings = embedding_manager
)

query = input("Enter query:")

results = retriever.retrieve(
    query=query,
    top_k=5,
    score_threshold = 0.2
)

if(len(results)==0):
    print("No documents retrieved")

for result in results:
    print("\n" + "= " * 50)
    print("Score: ", result["score"])
    print(result["text"])

print(vs.index.describe_index_stats())