# 🚀 Simple Backend Deployment

## For Windows Users

### Method 1: Using Batch Script (Easiest)

1. **Make sure you have Python installed**
   - Download from: https://www.python.org/downloads/
   - Version 3.8 or higher

2. **Create .env file** in project root:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   UPLOAD_DIR=./data/uploads
   VECTOR_STORE_DIR=./data/vector_store
   ```

3. **Double-click one of these files**:
   - `deploy_backend.bat` - For development (with auto-reload)
   - `deploy_backend_production.bat` - For production (4 workers)

4. **Done!** Access at http://localhost:8000

### Method 2: Manual Commands

Open Command Prompt or PowerShell:

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Create data folders
mkdir data\uploads
mkdir data\vector_store

# 3. Run server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## For Linux/Mac Users

### Method 1: Quick Start

```bash
# 1. Create .env file
cat > .env << EOF
GROQ_API_KEY=your_groq_api_key_here
UPLOAD_DIR=./data/uploads
VECTOR_STORE_DIR=./data/vector_store
EOF

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create directories
mkdir -p data/uploads data/vector_store

# 4. Run server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Method 2: Production with Gunicorn

```bash
# Install Gunicorn
pip install gunicorn

# Run with 4 workers
gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

---

## 🌐 Access Your Backend

Once running, you can access:

| URL | Description |
|-----|-------------|
| http://localhost:8000 | Main application (serves frontend if built) |
| http://localhost:8000/docs | Interactive API documentation |
| http://localhost:8000/health | Health check endpoint |
| http://localhost:8000/metrics | System metrics |

---

## 🔑 Get Your Groq API Key

1. Go to https://console.groq.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

---

## ✅ Verify It's Working

### Test 1: Health Check
Open browser: http://localhost:8000/health

Should see:
```json
{
  "status": "healthy",
  "session_id": "...",
  "vector_store_size": 0,
  "model": "llama-3.3-70b-versatile"
}
```

### Test 2: API Documentation
Open browser: http://localhost:8000/docs

You should see interactive Swagger UI

### Test 3: Upload a Document
1. Go to http://localhost:8000/docs
2. Find `/upload-document` endpoint
3. Click "Try it out"
4. Upload a PDF/DOCX/TXT file
5. Click "Execute"

---

## 🐛 Common Issues

### Issue: "pip is not recognized"
**Solution**: Add Python to PATH or use:
```bash
python -m pip install -r requirements.txt
```

### Issue: "Port 8000 is already in use"
**Solution**: 
- Windows: `netstat -ano | findstr :8000` then `taskkill /PID <number> /F`
- Linux/Mac: `lsof -i :8000` then `kill -9 <PID>`

Or use a different port:
```bash
python -m uvicorn app.main:app --port 8001
```

### Issue: "ModuleNotFoundError"
**Solution**: Reinstall dependencies:
```bash
pip install -r requirements.txt --force-reinstall
```

### Issue: "GROQ_API_KEY not found"
**Solution**: Make sure `.env` file exists in project root with your API key

---

## 🔄 Restart the Server

### Windows
- Press `Ctrl+C` in the command window
- Run the batch script again

### Linux/Mac
- Press `Ctrl+C` in terminal
- Run the command again

---

## 📦 What Gets Installed

The backend uses these main packages:
- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **LangChain**: LLM orchestration
- **Groq**: LLM API client
- **FAISS**: Vector database
- **Sentence Transformers**: Embeddings
- **PyPDF**: PDF processing

Total size: ~500MB (includes ML models)

---

## 🎯 Next Steps

1. ✅ Backend is running
2. Build frontend: `cd frontend && npm run build`
3. Access full app: http://localhost:8000
4. Upload documents and start asking questions!

---

## 💡 Tips

- **Development**: Use `deploy_backend.bat` (auto-reloads on code changes)
- **Production**: Use `deploy_backend_production.bat` (4 workers, better performance)
- **Keep it running**: Use `nohup` (Linux) or run as Windows Service
- **Monitor logs**: Check terminal output for errors
- **Update code**: Pull from git, restart server

---

**Need more help?** Check `BACKEND_DEPLOYMENT.md` for advanced options!

**Last Updated**: February 7, 2026
