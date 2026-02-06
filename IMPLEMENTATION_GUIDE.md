# Implementation Guide - Enterprise Knowledge Assistant

## Quick Start

### 1. Setup Environment
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### 2. Run the Application
```bash
# Development
uvicorn app.main:app --reload

# Production with Docker
docker-compose up -d
```

### 3. Test the System
```bash
# Upload a document
curl -X POST "http://localhost:8000/upload-document" \
  -F "file=@your_document.pdf"

# Ask a question
curl -X POST "http://localhost:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the main requirements?"}'
```

## Architecture Overview

### Agent Flow
```
1. Query Planner Agent
   ↓ Decomposes query into sub-queries
2. Retrieval Agent
   ↓ Fetches relevant chunks from FAISS
3. Reranker Agent
   ↓ Scores and refines context
4. Answer Synthesis Agent
   ↓ Generates grounded answer with Groq LLM
5. Hallucination Verifier Agent
   ↓ Validates factual accuracy
6. Confidence Gate
   ↓ Applies confidence thresholds
Final Response
```

## Key Components

### 1. Document Processing (`app/document_processor.py`)
- Supports PDF, DOCX, TXT
- Semantic chunking with overlap
- Metadata preservation

### 2. Vector Store (`app/vector_store.py`)
- FAISS for similarity search
- Sentence transformers for embeddings
- Persistent storage

### 3. Agents (`app/agents.py`)
- Query Planner: Intent detection
- Retrieval: Vector search
- Reranker: Context refinement
- Answer Synthesis: Groq LLM generation
- Hallucination Verifier: Fact checking

### 4. LangGraph Workflow (`app/graph.py`)
- State management
- Agent orchestration
- Error handling

## Configuration

### LLM Settings
- Primary: `llama-3.1-70b-versatile` (accuracy)
- Fallback: `llama-3.1-8b-instant` (speed)

### Retrieval Settings
- Chunk size: 600 tokens
- Overlap: 80 tokens
- Top-k: 6 chunks per query

### Confidence Thresholds
- Low: < 0.7 (ask for clarification)
- Medium: 0.7-0.85 (cautious phrasing)
- High: > 0.85 (normal response)

## API Endpoints

### POST /upload-document
Upload and process documents
```json
Response: {
  "doc_id": "policy_20240206_143022",
  "filename": "policy.pdf",
  "chunks_created": 45,
  "status": "success"
}
```

### POST /ask
Ask questions
```json
Request: {"query": "What is the refund policy?"}
Response: {
  "answer": "According to the policy...",
  "confidence": 0.92,
  "sources": ["policy.pdf (Page 3)"]
}
```

### GET /health
System health check

### GET /metrics
System metrics and statistics

## Production Deployment

### AWS EC2 Deployment
```bash
# 1. Launch EC2 instance (t3.medium or larger)
# 2. Install Docker
sudo yum install docker -y
sudo service docker start

# 3. Clone repository
git clone <your-repo>
cd enterprise-rag

# 4. Configure environment
echo "GROQ_API_KEY=your_key" > .env

# 5. Deploy
docker-compose up -d

# 6. Setup nginx reverse proxy (optional)
```

### Monitoring
- Add CloudWatch logs
- Track API latency
- Monitor token usage
- Set up alerts for errors

## Evaluation Framework

### Metrics to Track
1. Relevance: Are answers on-topic?
2. Faithfulness: Are claims supported by context?
3. Hallucination Rate: % of unsupported statements
4. Latency: Response time
5. Token Cost: Per query

### Testing Approach
```python
# Create golden Q&A set
test_cases = [
    {"query": "...", "expected_answer": "...", "expected_sources": [...]},
]

# Run evaluation
for case in test_cases:
    response = ask_question(case["query"])
    # Compare with expected
    # Calculate metrics
```

## Troubleshooting

### Issue: Low retrieval quality
- Increase chunk overlap
- Adjust chunk size
- Try different embedding models

### Issue: Hallucinations
- Lower temperature (0.1-0.2)
- Strengthen verification prompts
- Increase confidence thresholds

### Issue: Slow responses
- Use fallback model (llama-3.1-8b)
- Reduce top-k
- Optimize reranking

## Next Steps

### Phase A: POC (Weeks 1-2)
✅ Core pipeline implemented
✅ Single document support
✅ Basic API

### Phase B: Production (Weeks 3-4)
- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Add logging/monitoring
- [ ] Multi-user support
- [ ] Document access control

### Phase C: Advanced Features
- [ ] Streaming responses
- [ ] Query history
- [ ] Feedback loop
- [ ] A/B testing framework
- [ ] Advanced analytics
