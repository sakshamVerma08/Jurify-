from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pathlib import Path
import re
import os 


class DocumentIngestion: 

    def __init__(self,pdf_directory)-> None: 
        self.pdf_directory = pdf_directory

    def load_pdfs(self)-> list:
        """Loading all PDF's"""
        all_documents = []
        pdf_dir = Path(self.pdf_directory)

        pdf_files = list(pdf_dir.glob("**/*.pdf"))

        print(f"Found {len(pdf_files)} PDF's ")
        print("Loading...")

        for pdf_file in pdf_files:
            print(f"Processing {pdf_file.name}")

            try:
                loader = PyPDFLoader(str(pdf_file))
                documents = loader.load()

                for doc in documents:
                    doc.metadata["source_file"] = pdf_file.name
                    doc.metadata["file_type"] = "pdf"

                all_documents.extend(documents)
                print(f"✅ Loaded {len(all_documents)}")


            except Exception as e:
                print("❌ Couldn't load documents")
                print(f"Error {e}")

        
        return all_documents


    # READ THE .MD FILE TO UNDERSTAND CHUNKING
    def split_documents(self,documents)->list:
        """Split the documents
        in such a way that we preserve semantic meaning
        across Clauses, Sections etc. etc.
        """
        splitter = RecursiveCharacterTextSplitter(
            chunk_size = 2200,
            chunk_overlap = 300,
            length_function = len,
            separators = [
                "\n\nSECTION ",
                "\n\nARTICLE ",
                "\n\nCHAPTER ",
                "\n\n",
                ". ",
                "; ",
                " "
            ]
        )

        split_docs = []

        for doc in documents:

            text = doc.page_content

            # Before anything, create segments for major legal sections.
            sections = re.split(
                r'(?=\n(?:SECTION|Section|ARTICLE|Article|CHAPTER|Chapter)\s+)',
                text
            )


            for section in sections:
                chunks = splitter.create_documents(
                    [section],
                    metadatas = [doc.metadata]
                )


                split_docs.extend(chunks)

        return split_docs 

    def ingest(self):
        docs = self.load_pdfs()
        chunks = self.split_documents(docs)

        return chunks

ingestor = DocumentIngestion("./kaggle_dataset/")

chunks = ingestor.ingest()