import os
import shutil
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException, Header, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import Optional
from app.models import QueryRequest, QueryResponse, UploadResponse, RAGState
from app.graph import create_rag_graph
from app.document_processor import DocumentProcessor
from app.session_manager import SessionManager
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
    expose_headers=["X-Session-ID"]
)

# Initialize components
doc_processor = DocumentProcessor()
session_manager = SessionManager(session_timeout_minutes=30)  # 30 minute timeout

os.makedirs(settings.upload_dir, exist_ok=True)

def get_or_create_session(session_id: Optional[str] = None) -> tuple[str, bool]:
    """Get existing session or create new one"""
    if session_id and session_manager.get_session(session_id):
        return session_id, False
    else:
        new_session_id = session_manager.create_session()
        return new_session_id, True

@app.get("/health")
async def health_check(x_session_id: Optional[str] = Header(None)):
    """Health check endpoint"""
    session_id, is_new = get_or_create_session(x_session_id)
    vector_store = session_manager.get_vector_store(session_id)
    
    return {
        "status": "healthy",
        "session_id": session_id,
        "is_new_session": is_new,
        "vector_store_size": vector_store.index.ntotal if vector_store else 0,
        "model": settings.primary_model,
        "active_sessions": session_manager.get_total_sessions()
    }

@app.post("/session/new")
async def create_new_session(response: Response):
    """Create a new session explicitly"""
    session_id = session_manager.create_session()
    response.headers["X-Session-ID"] = session_id
    return {
        "session_id": session_id,
        "message": "New session created",
        "expires_in_minutes": 30
    }

@app.delete("/session/clear")
async def clear_session(x_session_id: Optional[str] = Header(None)):
    """Clear current session and all its documents"""
    if not x_session_id:
        raise HTTPException(status_code=400, detail="No session ID provided")
    
    success = session_manager.delete_session(x_session_id)
    if success:
        return {"message": "Session cleared successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@app.get("/session/info")
async def get_session_info(x_session_id: Optional[str] = Header(None)):
    """Get information about current session"""
    if not x_session_id:
        raise HTTPException(status_code=400, detail="No session ID provided")
    
    info = session_manager.get_session_info(x_session_id)
    if info:
        return info
    else:
        raise HTTPException(status_code=404, detail="Session not found")

@app.post("/upload-document", response_model=UploadResponse)
async def upload_document(
    response: Response,
    file: UploadFile = File(...),
    x_session_id: Optional[str] = Header(None)
):
    """Upload and process a document for the current session"""
    try:
        # Get or create session
        session_id, is_new = get_or_create_session(x_session_id)
        response.headers["X-Session-ID"] = session_id
        
        # Get session's vector store
        vector_store = session_manager.get_vector_store(session_id)
        if not vector_store:
            raise HTTPException(status_code=500, detail="Failed to get session vector store")
        
        # Save file
        file_path = os.path.join(settings.upload_dir, f"{session_id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process document
        chunks = doc_processor.process_document(file_path, file.filename)
        
        # Add to session's vector store
        num_chunks = vector_store.add_documents(chunks)
        
        # Track in session
        doc_id = chunks[0].metadata.doc_id if chunks else "unknown"
        session_manager.add_document_to_session(session_id, doc_id, file.filename)
        
        return UploadResponse(
            doc_id=doc_id,
            filename=file.filename,
            chunks_created=num_chunks,
            status="success"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask", response_model=QueryResponse)
async def ask_question(
    request: QueryRequest,
    response: Response,
    x_session_id: Optional[str] = Header(None)
):
    """Ask a question using the agentic RAG system"""
    try:
        # Get or create session
        session_id, is_new = get_or_create_session(x_session_id)
        response.headers["X-Session-ID"] = session_id
        
        # Get session's vector store
        vector_store = session_manager.get_vector_store(session_id)
        if not vector_store:
            raise HTTPException(status_code=500, detail="Failed to get session vector store")
        
        # Create graph with session's vector store
        rag_graph = create_rag_graph(vector_store)
        
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
async def get_metrics(x_session_id: Optional[str] = Header(None)):
    """Get system metrics for current session"""
    session_id, _ = get_or_create_session(x_session_id)
    vector_store = session_manager.get_vector_store(session_id)
    
    return {
        "session_id": session_id,
        "total_documents": vector_store.index.ntotal if vector_store else 0,
        "embedding_model": settings.embedding_model,
        "llm_model": settings.primary_model,
        "chunk_size": settings.chunk_size,
        "top_k": settings.top_k,
        "active_sessions": session_manager.get_total_sessions()
    }

# Serve static files for production deployment
frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    # Mount static assets
    app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")
    
    # Serve favicon
    @app.get("/favicon.svg")
    async def favicon():
        favicon_path = frontend_dist / "favicon.svg"
        if favicon_path.exists():
            return FileResponse(favicon_path, media_type="image/svg+xml")
        raise HTTPException(status_code=404, detail="Favicon not found")
    
    # Serve index.html for all other routes (SPA)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # If requesting a file with extension, try to serve it
        if "." in full_path.split("/")[-1]:
            file_path = frontend_dist / full_path
            if file_path.exists():
                return FileResponse(file_path)
        
        # Otherwise serve index.html (for SPA routing)
        index_path = frontend_dist / "index.html"
        if index_path.exists():
            return FileResponse(index_path, media_type="text/html")
        
        raise HTTPException(status_code=404, detail="Frontend not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
