# Enterprise Knowledge Assistant (Agentic RAG)

Production-grade multi-agent RAG system using Groq LLM for enterprise document Q&A.

## Features
- Multi-agent architecture with LangGraph
- Groq LLM (llama-3.1-70b) for fast inference
- Hallucination verification
- Source attribution
- FAISS vector store
- FastAPI backend

## Architecture
```
User Query → Query Planner → Retrieval → Reranker → Answer Synthesis → Hallucination Verification → Response
```

## Quick Start
```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

## Environment Variables
```
GROQ_API_KEY=your_key_here
```
