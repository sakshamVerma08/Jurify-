from .retrieval import LegalRetriever
from .augmentation import AugmentationPipeline


class QueryPipeline:
    """The central orchestrator file for the client side.
    When the user asks something from the AI Assistant then this file wires up the individual retrieval.py code, the augmentation.py code and the groq_llm.py code.
    """
    
    def __init__(self, retriever, llm):
        self.retriever = retriever
        self.llm = llm

    def ask(self, query: str):
        retrieved_chunks = self.retriever.retrieve_with_neighbor(
            query=query,
            top_k=5,
        )
        # Create augmentation pipeline with query and retrieved documents
        augmenter = AugmentationPipeline(query, retrieved_chunks)
        prompt = augmenter.run()
        response = self.llm.invoke(prompt)
        return response