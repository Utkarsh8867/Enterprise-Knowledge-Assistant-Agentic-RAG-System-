# Enterprise Knowledge Assistant - Complete Setup Guide

A full-stack Agentic RAG system with React frontend and FastAPI backend.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│  (Chat Interface + Document Upload + System Stats)          │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/REST API
┌─────────────────────▼───────────────────────────────────────┐
│                   FastAPI Backend                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              LangGraph Workflow                      │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Query Planner → Retrieval → Reranker →        │  │   │
│  │  │ Answer Synthesis → Hallucination Verifier →   │  │   │
│  │  │ Confidence Gate                                │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ FAISS Vector │  │ Sentence     │  │ Groq LLM     │      │
│  │ Store        │  │ Transformers │  │ (Llama 3.3)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

### Backend Requirements
- Python 3.10+
- pip package manager

### Frontend Requirements
- Node.js 16+
- npm package manager

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env file with your Groq API key

# Start the backend server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend will be available at: http://localhost:3000

## 🔧 Configuration

### Backend Configuration (.env)

```env
GROQ_API_KEY=your_groq_api_key_here
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
VECTOR_DB_PATH=./data/vector_store
UPLOAD_DIR=./data/uploads
PRIMARY_MODEL=llama-3.3-70b-versatile
FALLBACK_MODEL=llama-3.1-8b-instant
```

### Frontend Configuration (frontend/.env)

```env
REACT_APP_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
.
├── app/                          # Backend application
│   ├── agents.py                 # Agent orchestrator
│   ├── config.py                 # Configuration settings
│   ├── document_processor.py     # Document processing
│   ├── graph.py                  # LangGraph workflow
│   ├── main.py                   # FastAPI application
│   ├── models.py                 # Pydantic models
│   ├── prompts.py                # LLM prompts
│   └── vector_store.py           # FAISS vector store
│
├── frontend/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.js
│   │   │   ├── DocumentUpload.js
│   │   │   └── SystemStats.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── data/                         # Data storage
│   ├── uploads/                  # Uploaded documents
│   └── vector_store/             # FAISS index
│
├── .env                          # Backend environment variables
├── requirements.txt              # Python dependencies
└── README.md
```

## 🎯 Features

### Backend Features
- ✅ Multi-agent RAG pipeline with LangGraph
- ✅ FAISS vector store for semantic search
- ✅ Document processing (PDF, DOCX, TXT)
- ✅ Groq LLM integration (Llama 3.3 70B)
- ✅ Hallucination detection
- ✅ Confidence scoring
- ✅ Source citation

### Frontend Features
- ✅ Modern, responsive UI
- ✅ Real-time chat interface
- ✅ Drag-and-drop file upload
- ✅ Live system statistics
- ✅ Confidence visualization
- ✅ Source citations display

## 🔌 API Endpoints

### Health Check
```
GET /health
```

### Upload Document
```
POST /upload-document
Content-Type: multipart/form-data
Body: file (PDF, DOCX, or TXT)
```

### Ask Question
```
POST /ask
Content-Type: application/json
Body: { "query": "your question here" }
```

### Get Metrics
```
GET /metrics
```

## 🧪 Testing

### Test Backend
```bash
python quick_test.py
```

### Test Frontend
Open http://localhost:3000 in your browser

## 📊 System Requirements

### Minimum
- CPU: 4 cores
- RAM: 8 GB
- Storage: 5 GB

### Recommended
- CPU: 8+ cores
- RAM: 16 GB
- Storage: 20 GB

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /F /PID <PID>

# Change port in startup command
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001
```

**Module not found errors:**
```bash
pip install -r requirements.txt --upgrade
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Set different port
set PORT=3001 && npm start
```

**API connection errors:**
- Ensure backend is running on http://localhost:8000
- Check REACT_APP_API_URL in frontend/.env

## 📝 Usage Example

1. **Start Backend**: Run `python -m uvicorn app.main:app --host 0.0.0.0 --port 8000`
2. **Start Frontend**: Run `npm start` in frontend directory
3. **Upload Document**: Drag and drop a PDF/DOCX file
4. **Ask Questions**: Type questions in the chat interface
5. **View Results**: See answers with confidence scores and sources

## 🔐 Security Notes

- Never commit `.env` files with real API keys
- Use environment variables for sensitive data
- Enable CORS only for trusted origins in production
- Implement authentication for production deployments

## 📚 Technologies Used

### Backend
- FastAPI
- LangChain & LangGraph
- Groq API
- FAISS
- Sentence Transformers
- PyPDF

### Frontend
- React 18
- Axios
- Lucide React Icons
- CSS3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation at http://localhost:8000/docs
- Check console logs for errors

## 🎉 Acknowledgments

- Groq for fast LLM inference
- LangChain team for the framework
- Meta for Llama models
