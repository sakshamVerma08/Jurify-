from sentence_transformers import SentenceTransformer
import numpy as np

class EmbeddingManager:
    """
    Handles embedding generation using BAAI BGE (small)
    models.
    """

    def __init__(
        self,
        model_name: str = "BAAI/bge-small-en-v1.5"
    ):
        
        self.model_name = model_name
        self.model = SentenceTransformer(model_name)

        print(f"Loaded Embedding Model: {model_name}")
        print(f"Embedding dimension:{self.model.get_sentence_embedding_dimension()}")

    
    def generate_document_embeddings(
            self,
            texts,
            batch_size: int = 32
    ):
        """
        Generate embeddings for documents/chunks.
        """

        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            normalize_embeddings = True,
            show_progress_bar=True
        )

        return embeddings

    
    def generate_query_embedding(self,query:str):
        """
        Generate Embeddings for User's Query.
        """

        instruction = (
            "Represent this sentence for"
            "searching relevant passages:"
        )

        query = instruction + query 

        embedding = self.model.encode(
            [query],
            normalize_embeddings=True
        )[0]

        return embedding 

    def embedding_dimension(self):
        """
        Returns embedding vector dimension.
        """

        return self.model.sentence_embedding_dimension()

