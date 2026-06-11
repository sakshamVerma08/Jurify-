from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os, sys
from langchain_community.document_loaders import PyPDFLoader
print("UPLOAD_IMPORTED")
router = APIRouter()

@router.post("")
async def upload_document(file: UploadFile = File(...)):
    from pipelines.rag_execute import RAGPipeline

    """Receive a file, store it temporarily, and trigger the ingestion pipeline.
    The file is saved to a temporary folder under the project root (./uploads).
    After saving, the ingestion pipeline (DocumentIngestion) can be invoked.
    """
    # Save uploaded file to the kaggle_dataset directory
    upload_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploaded_data"))
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)
    try:
        # Write the uploaded file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
    finally:
        await file.close()

    # After the file is saved, run the ingestion pipeline to index it
    try:
        pipeline = RAGPipeline(pdf_path=file_path)
        pipeline.run()
    except Exception as e:
        # Log but don't break the upload response
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {e}")

    return JSONResponse(content={"filename": file.filename, "status": "uploaded and indexed"})
