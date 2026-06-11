from fastapi import FastAPI
from api.upload import router as upload_router

print("MAIN_IMPORTED")
app = FastAPI()

app.include_router(upload_router, prefix="/upload")

@app.get("/")
async def root():
    return {"message":"Hello World"}