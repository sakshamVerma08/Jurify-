from embedding.embedding_manager import EmbeddingManager
from ingestion.ingestion import DocumentIngestion
from vector_store.vector_store import PineconeVectorStore
import os 
from dotenv import load_dotenv
load_dotenv()

class RAGPipeline:
    def __init__(
        self,
        pdf_directory: str
    ):
        self.pdf_directory = pdf_directory
        self.ingestor = DocumentIngestion(pdf_directory)
        self.embedding_manager = EmbeddingManager()
        self.vector_store = (
            PineconeVectorStore(
                dimension = self.embedding_manager.embedding_dimension(),
                index_name = "jurify-rag",
                api_key = os.getenv("PINECONE_DB_KEY")
            )
        )

    def run(self):
            print("=" * 50)
            print("Starting RAG Ingestion Pipeline")
            print("="*50)

            # STEP 1 : LOAD PDFs

            print("\n[1/3] Loading & Chunking PDFs")
            print("-" * 40)
            documents = (
                self.ingestor.load_pdfs()
            )

            chunks = (
                self.ingestor.split_documents(documents)
            )

            print(f"Generated {len(chunks)} chunks")


            # STEP 2 : EMBEDDINGS

            print("\n[2/3] Generating Embeddings")
            print("-"*40)

            texts = [
                chunk.page_content
                for chunk in chunks
            ]

            embeddings = (
                self.embedding_manager.generate_document_embeddings(texts)
            )

            print(f"Generated {len(embeddings)} embeddings")


            # STEP 3: STORE EMBEDDINGS IN VECTOR STORE 

            print("\n[3/3] Uploading to Pinecone")
            print("-"*40)

            count = (
                self.vector_store.upsert_chunks(
                    chunks,
                    embeddings
                )
            )

            print(f"Successfully stored"
            f"{count} vectors")

            print("\nPipeline Completed ✅")

            return count
            

pipeline = RAGPipeline(
    pdf_directory = "./kaggle_dataset/"
)  

pipeline.run()