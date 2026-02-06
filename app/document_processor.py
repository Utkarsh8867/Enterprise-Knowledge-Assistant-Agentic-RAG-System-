import os
from datetime import datetime
from typing import List
from pypdf import PdfReader
from docx import Document
from pathlib import Path
from app.models import DocumentChunk, DocumentMetadata
from app.config import get_settings

settings = get_settings()

class DocumentProcessor:
    """Handles document ingestion and chunking"""
    
    def __init__(self):
        self.chunk_size = settings.chunk_size
        self.chunk_overlap = settings.chunk_overlap
    
    def process_document(self, file_path: str, filename: str) -> List[DocumentChunk]:
        """Main entry point for document processing"""
        file_ext = Path(filename).suffix.lower()
        
        if file_ext == '.pdf':
            text = self._extract_pdf(file_path)
        elif file_ext in ['.docx', '.doc']:
            text = self._extract_docx(file_path)
        elif file_ext == '.txt':
            text = self._extract_txt(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_ext}")
        
        chunks = self._chunk_text(text)
        
        doc_id = f"{Path(filename).stem}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        return [
            DocumentChunk(
                text=chunk,
                metadata=DocumentMetadata(
                    doc_id=doc_id,
                    page=idx // 3,  # Approximate page
                    source=filename,
                    document_type=file_ext[1:],
                    timestamp=datetime.now().isoformat()
                )
            )
            for idx, chunk in enumerate(chunks)
        ]
    
    def _extract_pdf(self, file_path: str) -> str:
        """Extract text from PDF"""
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    
    def _extract_docx(self, file_path: str) -> str:
        """Extract text from DOCX"""
        doc = Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    
    def _extract_txt(self, file_path: str) -> str:
        """Extract text from TXT"""
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _chunk_text(self, text: str) -> List[str]:
        """Semantic chunking with overlap"""
        words = text.split()
        chunks = []
        
        for i in range(0, len(words), self.chunk_size - self.chunk_overlap):
            chunk = ' '.join(words[i:i + self.chunk_size])
            if chunk.strip():
                chunks.append(chunk)
        
        return chunks
