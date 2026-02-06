import os
import pickle
import faiss
import numpy as np
from typing import List, Dict
from sentence_transformers import SentenceTransformer
from app.models import DocumentChunk
from app.config import get_settings

settings = get_settings()

class VectorStore:
    """FAISS-based vector store for document retrieval"""
    
    def __init__(self):
        self.embedding_model = SentenceTransformer(settings.embedding_model)
        self.dimension = 384  # all-MiniLM-L6-v2 dimension
        self.index = faiss.IndexFlatL2(self.dimension)
        self.chunks: List[DocumentChunk] = []
        self.db_path = settings.vector_db_path
        
        os.makedirs(self.db_path, exist_ok=True)
        self._load_index()
    
    def add_documents(self, chunks: List[DocumentChunk]) -> int:
        """Add document chunks to vector store"""
        texts = [chunk.text for chunk in chunks]
        embeddings = self.embedding_model.encode(texts, show_progress_bar=False)
        
        self.index.add(np.array(embeddings).astype('float32'))
        self.chunks.extend(chunks)
        
        self._save_index()
        return len(chunks)
    
    def search(self, query: str, top_k: int = 6) -> List[Dict]:
        """Vector similarity search"""
        if self.index.ntotal == 0:
            return []
        
        query_embedding = self.embedding_model.encode([query])
        distances, indices = self.index.search(
            np.array(query_embedding).astype('float32'), 
            min(top_k, self.index.ntotal)
        )
        
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx < len(self.chunks):
                chunk = self.chunks[idx]
                results.append({
                    'text': chunk.text,
                    'metadata': chunk.metadata.dict(),
                    'score': float(1 / (1 + distance))  # Convert distance to similarity
                })
        
        return results
    
    def _save_index(self):
        """Persist index and chunks"""
        faiss.write_index(self.index, os.path.join(self.db_path, 'faiss.index'))
        with open(os.path.join(self.db_path, 'chunks.pkl'), 'wb') as f:
            pickle.dump(self.chunks, f)
    
    def _load_index(self):
        """Load existing index"""
        index_path = os.path.join(self.db_path, 'faiss.index')
        chunks_path = os.path.join(self.db_path, 'chunks.pkl')
        
        if os.path.exists(index_path) and os.path.exists(chunks_path):
            self.index = faiss.read_index(index_path)
            with open(chunks_path, 'rb') as f:
                self.chunks = pickle.load(f)
