# 🚀 Quick Reference Card

## ⚡ Start Commands

```bash
# Start Everything (Windows)
start_all.bat

# Backend Only
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend Only
cd frontend && npm start

# Verify Setup
python verify_setup.py

# Test Backend
python quick_test.py
```

## 🔗 Important URLs

| What | URL |
|------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Health | http://localhost:8000/health |

## 📁 Key Files

```
.env                          # Backend config (API keys)
frontend/.env                 # Frontend config (API URL)
app/main.py                   # Backend entry point
frontend/src/App.js           # Frontend entry point
requirements.txt              # Python dependencies
frontend/package.json         # Node dependencies
```

## 🔧 Configuration

### Backend (.env)
```env
GROQ_API_KEY=your_key_here
PRIMARY_MODEL=llama-3.3-70b-versatile
FALLBACK_MODEL=llama-3.1-8b-instant
```

### Frontend (frontend/.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

## 📡 API Endpoints

```bash
# Health Check
GET /health

# Upload Document
POST /upload-document
Content-Type: multipart/form-data
Body: file

# Ask Question
POST /ask
Content-Type: application/json
Body: {"query": "your question"}

# Get Metrics
GET /metrics
```

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check port
netstat -ano | findstr :8000

# Kill process
taskkill /F /PID <PID>

# Reinstall packages
pip install -r requirements.txt --upgrade
```

### Frontend Won't Start
```bash
# Clear cache
cd frontend
rm -rf node_modules package-lock.json
npm install

# Use different port
set PORT=3001 && npm start
```

### API Connection Error
1. Check backend is running: http://localhost:8000/health
2. Check CORS settings in `app/main.py`
3. Verify `REACT_APP_API_URL` in `frontend/.env`

## 📦 Installation

### First Time Setup
```bash
# 1. Install Python packages
pip install -r requirements.txt

# 2. Configure backend
# Edit .env with your Groq API key

# 3. Install Node packages
cd frontend
npm install
cd ..

# 4. Verify setup
python verify_setup.py

# 5. Start everything
start_all.bat
```

## 🎯 Common Tasks

### Upload a Document
1. Open http://localhost:3000
2. Drag file to upload area
3. Wait for success message

### Ask a Question
1. Type question in chat input
2. Press Enter or click Send
3. View answer with confidence and sources

### Check System Status
- View sidebar for live stats
- Check vector store size
- Monitor active model

## 🔑 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Send message |
| Ctrl+V | Paste in chat |
| Drag & Drop | Upload file |

## 📊 File Types Supported

- ✅ PDF (.pdf)
- ✅ Word (.docx)
- ✅ Text (.txt)

## 🎨 UI Components

```
App
├── Header (Title + Description)
├── Sidebar
│   ├── SystemStats (Health, Docs, Model)
│   └── DocumentUpload (Drag & Drop)
└── ChatInterface
    ├── Messages (User + AI)
    ├── Confidence Badges
    ├── Source Citations
    └── Input Form
```

## 🔄 Workflow

```
1. Upload Document
   ↓
2. Document Processed → Chunks Created
   ↓
3. Chunks Embedded → Stored in FAISS
   ↓
4. Ask Question
   ↓
5. Query Planned → Sub-queries Generated
   ↓
6. Retrieval → Relevant Chunks Found
   ↓
7. Reranking → Best Chunks Selected
   ↓
8. Answer Synthesis → Draft Created
   ↓
9. Verification → Hallucinations Checked
   ↓
10. Confidence Gate → Final Answer
```

## 💡 Tips

- Upload documents before asking questions
- Be specific in your questions
- Check confidence scores
- Review source citations
- Monitor system stats
- Use drag-and-drop for faster uploads

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Port in use | Kill process or use different port |
| Module not found | `pip install -r requirements.txt` |
| API key error | Check `.env` file |
| CORS error | Check backend CORS settings |
| Upload fails | Check file type (PDF/DOCX/TXT) |
| No results | Upload documents first |

## 📚 Documentation

- `README.md` - Overview
- `SETUP_GUIDE.md` - Detailed setup
- `PROJECT_SUMMARY.md` - Architecture
- `frontend/FEATURES.md` - Frontend features
- `frontend/README.md` - Frontend docs

## 🎓 Learning Resources

- FastAPI: https://fastapi.tiangolo.com
- React: https://react.dev
- LangChain: https://python.langchain.com
- LangGraph: https://langchain-ai.github.io/langgraph
- Groq: https://console.groq.com/docs

---

**Need help? Check SETUP_GUIDE.md or run verify_setup.py**
