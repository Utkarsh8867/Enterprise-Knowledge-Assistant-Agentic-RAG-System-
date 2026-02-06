from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    groq_api_key: str
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    vector_db_path: str = "./data/vector_store"
    upload_dir: str = "./data/uploads"
    
    # LLM Settings
    primary_model: str = "llama-3.3-70b-versatile"
    fallback_model: str = "llama-3.1-8b-instant"
    
    # Retrieval Settings
    top_k: int = 6
    chunk_size: int = 600
    chunk_overlap: int = 80
    
    # Confidence Thresholds
    confidence_low: float = 0.7
    confidence_medium: float = 0.85
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
