from typing import Any, Dict

class AugmentationPipeline:
    """
    The Job of this class is to augment/attach the retrieved "context"
    along with the Prompt / Instructions that we are about to give to the LLM.

    It sits in between the Query Retrieval (retrieval.py) and the groq_llm.py

    """

    def __init__(
        self, 
        query: str,
        retrieved_docs: list[Dict[str,Any]]
    ):
        self.query=query 
        self.retrieved_docs = retrieved_docs
        self.prompt=""

    def build_prompt(self, query: str, retrieved_docs: Dict[str,Any]):

        context = "\n\n".join(
            s["text"] for s in retrieved_docs
        )

        prompt = f"""
        You are Jurify AI, a legal research and document assistance AI.

        Your role is to answer the user's question ONLY using the information provided in the Context section.

        IMPORTANT RULES:

        1. Do NOT invent, assume, or hallucinate facts.
        2. If the answer cannot be determined from the provided context, explicitly say:
        "The provided documents do not contain sufficient information to answer this question."
        3. Do NOT cite laws, regulations, sections, or legal principles unless they appear in the context.
        4. Do NOT provide legal advice. Provide informational guidance only.
        5. Prefer precise and factual answers over broad explanations.
        6. When possible, organize the answer using bullet points.
        7. If the question asks for a procedure, provide the steps in order.
        8. If the question asks for required documents, provide them as a list.
        9. If multiple relevant passages exist in the context, combine them into a single coherent answer.
        10. If the context contains conflicting information, mention the conflict instead of choosing one.

        ========================
        CONTEXT
        ========================

        {context}

        ========================
        QUESTION
        ========================

        {self.query}

        ========================
        ANSWER
        ========================
        """
        self.prompt = prompt


    def run(self):

        self.build_prompt()
        return self.prompt





    