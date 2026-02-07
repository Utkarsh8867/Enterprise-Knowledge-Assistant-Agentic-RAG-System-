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

<img width="1900" height="869" alt="Screenshot 2026-02-07 163052" src="https://github.com/user-attachments/assets/0c5ca0b4-9644-4d1c-a171-2dd0253e6dea" />



<img width="1889" height="867" alt="Screenshot 2026-02-07 163102" src="https://github.com/user-attachments/assets/915498ed-5657-412b-986b-506f4386af15" />

