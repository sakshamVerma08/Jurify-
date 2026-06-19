from fastapi import FastAPI
from api.upload import router as upload_router
from api.query import router as query_router
from fastapi.middleware.cors import CORSMiddleware

print("MAIN_IMPORTED")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

app.include_router(upload_router, prefix="/upload")
app.include_router(query_router, prefix = "/query")

@app.get("/")
async def root():
    return {"message":"Hello World"}