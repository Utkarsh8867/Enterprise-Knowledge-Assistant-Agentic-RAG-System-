# 🚀 How to Run the Application

## Current Status

✅ **Backend is RUNNING** on http://localhost:8000
❌ **Frontend needs to be started**

## Quick Start - Option 1 (Recommended)

### Open TWO separate terminals:

**Terminal 1 - Backend (Already Running):**
```bash
# Backend is already running on port 8000
# You can verify at: http://localhost:8000/health
```

**Terminal 2 - Frontend:**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

The frontend will automatically open at http://localhost:3000

## Quick Start - Option 2 (PowerShell Script)

Open PowerShell in the project root and run:

```powershell
# Start frontend
powershell -ExecutionPolicy Bypass -File start_frontend.ps1
```

## Quick Start - Option 3 (Manual Commands)

### Step 1: Verify Backend
```bash
# Check if backend is running
curl http://localhost:8000/health
```

If not running, start it:
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Step 2: Start Frontend
Open a new terminal:
```bash
cd frontend
npm install  # First time only
npm start
```

## Access the Application

Once both servers are running:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend UI** | http://localhost:3000 | ⏳ Starting |
| **Backend API** | http://localhost:8000 | ✅ Running |
| **API Documentation** | http://localhost:8000/docs | ✅ Available |
| **Health Check** | http://localhost:8000/health | ✅ Available |

## What to Expect

### Backend (Port 8000)
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

### Frontend (Port 3000)
```
Compiled successfully!

You can now view enterprise-knowledge-assistant in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## Using the Application

1. **Open Browser**: Navigate to http://localhost:3000
2. **Upload Document**: Drag and drop a PDF, DOCX, or TXT file
3. **Ask Questions**: Type your question in the chat interface
4. **View Results**: See answers with confidence scores and sources

## Troubleshooting

### Frontend Won't Start

**Issue**: `'react-scripts' is not recognized`
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Issue**: Port 3000 is already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /F /PID <PID>

# Or use a different port
set PORT=3001 && npm start
```

### Backend Issues

**Issue**: Port 8000 is already in use
```bash
# Windows
netstat -ano | findstr :8000
taskkill /F /PID <PID>

# Restart backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Connection Issues

**Issue**: Frontend can't connect to backend
1. Verify backend is running: http://localhost:8000/health
2. Check `frontend/.env` has: `REACT_APP_API_URL=http://localhost:8000`
3. Clear browser cache and reload

## Stopping the Application

### Stop Frontend
- Press `Ctrl+C` in the frontend terminal
- Or close the terminal window

### Stop Backend
- Press `Ctrl+C` in the backend terminal
- Or close the terminal window

## Next Steps

Once both servers are running:

1. ✅ Upload a document (PDF, DOCX, or TXT)
2. ✅ Wait for processing confirmation
3. ✅ Ask questions about the document
4. ✅ Review answers with confidence scores
5. ✅ Check source citations

## Need Help?

- Check `SETUP_GUIDE.md` for detailed setup instructions
- Run `python verify_setup.py` to check your installation
- Review `QUICK_REFERENCE.md` for common commands
- Check console logs for error messages

---

**Ready to start? Open a terminal and run:**
```bash
cd frontend && npm install && npm start
```
