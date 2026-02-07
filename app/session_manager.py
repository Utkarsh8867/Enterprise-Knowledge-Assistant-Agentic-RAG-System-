"""
Session Manager for User Isolation
Manages user sessions and their associated documents
"""
import uuid
import time
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import threading
from app.vector_store import VectorStore

class SessionManager:
    """Manages user sessions and their isolated vector stores"""
    
    def __init__(self, session_timeout_minutes: int = 30):
        self.sessions: Dict[str, dict] = {}
        self.session_timeout = session_timeout_minutes * 60  # Convert to seconds
        self.lock = threading.Lock()
        
        # Start cleanup thread
        self.cleanup_thread = threading.Thread(target=self._cleanup_expired_sessions, daemon=True)
        self.cleanup_thread.start()
    
    def create_session(self) -> str:
        """Create a new session and return session ID"""
        session_id = str(uuid.uuid4())
        
        with self.lock:
            self.sessions[session_id] = {
                'vector_store': VectorStore(),
                'created_at': time.time(),
                'last_accessed': time.time(),
                'document_ids': [],
                'uploaded_files': []
            }
        
        return session_id
    
    def get_session(self, session_id: str) -> Optional[dict]:
        """Get session data and update last accessed time"""
        with self.lock:
            if session_id in self.sessions:
                self.sessions[session_id]['last_accessed'] = time.time()
                return self.sessions[session_id]
        return None
    
    def get_vector_store(self, session_id: str) -> Optional[VectorStore]:
        """Get vector store for a session"""
        session = self.get_session(session_id)
        if session:
            return session['vector_store']
        return None
    
    def add_document_to_session(self, session_id: str, doc_id: str, filename: str):
        """Track uploaded documents in session"""
        with self.lock:
            if session_id in self.sessions:
                self.sessions[session_id]['document_ids'].append(doc_id)
                self.sessions[session_id]['uploaded_files'].append(filename)
    
    def delete_session(self, session_id: str) -> bool:
        """Delete a session and cleanup its resources"""
        with self.lock:
            if session_id in self.sessions:
                session = self.sessions[session_id]
                
                # Clear vector store
                if 'vector_store' in session:
                    del session['vector_store']
                
                # Remove session
                del self.sessions[session_id]
                return True
        return False
    
    def _cleanup_expired_sessions(self):
        """Background thread to cleanup expired sessions"""
        while True:
            try:
                time.sleep(60)  # Check every minute
                current_time = time.time()
                expired_sessions = []
                
                with self.lock:
                    for session_id, session_data in self.sessions.items():
                        if current_time - session_data['last_accessed'] > self.session_timeout:
                            expired_sessions.append(session_id)
                
                # Delete expired sessions
                for session_id in expired_sessions:
                    self.delete_session(session_id)
                    print(f"Cleaned up expired session: {session_id}")
                    
            except Exception as e:
                print(f"Error in cleanup thread: {e}")
    
    def get_session_info(self, session_id: str) -> Optional[dict]:
        """Get session information"""
        session = self.get_session(session_id)
        if session:
            return {
                'session_id': session_id,
                'created_at': datetime.fromtimestamp(session['created_at']).isoformat(),
                'last_accessed': datetime.fromtimestamp(session['last_accessed']).isoformat(),
                'documents_count': len(session['document_ids']),
                'uploaded_files': session['uploaded_files'],
                'chunks_count': session['vector_store'].index.ntotal if session['vector_store'] else 0
            }
        return None
    
    def list_active_sessions(self) -> List[str]:
        """List all active session IDs"""
        with self.lock:
            return list(self.sessions.keys())
    
    def get_total_sessions(self) -> int:
        """Get total number of active sessions"""
        with self.lock:
            return len(self.sessions)
