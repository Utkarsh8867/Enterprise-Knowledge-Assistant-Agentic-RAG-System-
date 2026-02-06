import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import QueryRequest, QueryResponse, UploadResponse, RAGState
from app.graph import create_rag_graph
from app.document_processor import DocumentProcessor
from app.vector_store import VectorStore
from app.config import get_settings

settings = get_settings()
app = FastAPI(title="Enterprise Knowledge Assistant", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
rag_graph = create_rag_graph()
doc_processor = DocumentProcessor()
vector_store = VectorStore()

os.makedirs(settings.upload_dir, exist_ok=True)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "vector_store_size": vector_store.index.ntotal,
        "model": settings.primary_model
    }

@app.post("/upload-document", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    try:
        # Save file
        file_path = os.path.join(settings.upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process document
        chunks = doc_processor.process_document(file_path, file.filename)
        
        # Add to vector store
        num_chunks = vector_store.add_documents(chunks)
        
        return UploadResponse(
            doc_id=chunks[0].metadata.doc_id if chunks else "unknown",
            filename=file.filename,
            chunks_created=num_chunks,
            status="success"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    """Ask a question using the agentic RAG system"""
    try:
        # Initialize state
        initial_state: RAGState = {
            "user_query": request.query,
            "intent": "",
            "sub_queries": [],
            "retrieved_chunks": [],
            "refined_context": "",
            "draft_answer": "",
            "verified_answer": "",
            "confidence_score": 0.0,
            "sources": [],
            "error": None
        }
        
        # Run through graph
        final_state = rag_graph.invoke(initial_state)
        
        return QueryResponse(
            answer=final_state["verified_answer"],
            confidence=final_state["confidence_score"],
            sources=final_state["sources"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics")
async def get_metrics():
    """Get system metrics"""
    return {
        "total_documents": vector_store.index.ntotal,
        "embedding_model": settings.embedding_model,
        "llm_model": settings.primary_model,
        "chunk_size": settings.chunk_size,
        "top_k": settings.top_k
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
