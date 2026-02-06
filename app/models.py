from typing import TypedDict, List, Dict, Optional
from pydantic import BaseModel

class RAGState(TypedDict):
    """Shared state across all agents in the graph"""
    user_query: str
    intent: str
    sub_queries: List[str]
    retrieved_chunks: List[Dict]
    refined_context: str
    draft_answer: str
    verified_answer: str
    confidence_score: float
    sources: List[str]
    error: Optional[str]

class DocumentMetadata(BaseModel):
    doc_id: str
    page: int
    source: str
    document_type: str
    timestamp: str

class DocumentChunk(BaseModel):
    text: str
    metadata: DocumentMetadata
    embedding: Optional[List[float]] = None

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    confidence: float
    sources: List[str]
    
class UploadResponse(BaseModel):
    doc_id: str
    filename: str
    chunks_created: int
    status: str
