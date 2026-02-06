"""Simplified server that runs without heavy dependencies"""
from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI(title="Enterprise Knowledge Assistant - Simple Mode")

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    confidence: float
    sources: list

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "mode": "simple",
        "message": "Server is running. Install remaining dependencies for full functionality."
    }

@app.get("/metrics")
async def get_metrics():
    return {
        "total_documents": 0,
        "mode": "simple",
        "message": "Install faiss-cpu and sentence-transformers for full functionality"
    }

@app.post("/ask")
async def ask_question(request: QueryRequest):
    return QueryResponse(
        answer="System is in simple mode. Please install remaining dependencies (faiss-cpu, sentence-transformers) for full RAG functionality.",
        confidence=0.0,
        sources=[]
    )

if __name__ == "__main__":
    import uvicorn
    print("Starting simple server on http://localhost:8000")
    print("Install remaining dependencies for full functionality:")
    print("  pip install faiss-cpu sentence-transformers")
    uvicorn.run(app, host="0.0.0.0", port=8000)
