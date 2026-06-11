from groq import Groq 

class GroqLLM: 
    """
    This class acts as a LLM wrapper
    that contains the code to initialize the model
    and call the model with the proper context (retrieved_docs + prompt)
    """
    
    def __init__( 
        self,
        api_key,
        model
    ):
        self.client=Groq(
            api_key=api_key
        )
        self.model=model 


    def invoke(
        self,
        prompt 
    ):

        response = (
            self.client.chat.completions.create(
                model=self.model ,
                messages = [
                    {
                        "role":"user",
                        "content": prompt 
                    }
                ]
            )
        )

        return response.choices[0].message.content