# Deployment Instructions

## 🚀 Production Deployment

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Step 1: Build Frontend

```bash
cd frontend
npm install
npm run build
```

This creates an optimized production build in `frontend/dist/`

### Step 2: Deploy Backend (Serves Frontend + API)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Step 3: Access Application

Open your browser and navigate to:
```
http://localhost:8000
```

The backend now serves:
- **Frontend**: http://localhost:8000 (root and all SPA routes)
- **API**: http://localhost:8000/health, /upload-document, /ask, etc.
- **API Docs**: http://localhost:8000/docs

## 🔧 Configuration

### Frontend Environment Variables

Create `frontend/.env` for production:

```env
VITE_API_URL=http://localhost:8000
```

For deployment to a different domain:
```env
VITE_API_URL=https://your-domain.com
```

### Backend Environment Variables

Update `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
UPLOAD_DIR=./data/uploads
VECTOR_STORE_DIR=./data/vector_store
```

## 📦 Quick Deploy Script

### Windows
```bash
build_and_deploy.bat
```

### Linux/Mac
```bash
chmod +x build_and_deploy.sh
./build_and_deploy.sh
```

## 🐳 Docker Deployment (Optional)

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:
1. Build the frontend
2. Set up the backend
3. Serve everything on port 8000

## 🌐 Production Server Options

### Option 1: Uvicorn (Development/Small Scale)
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Option 2: Gunicorn + Uvicorn Workers (Production)
```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Option 3: Nginx + Uvicorn (Large Scale)

1. Run Uvicorn on internal port:
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

2. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🔍 Troubleshooting

### Issue: MIME Type Error
**Error**: `Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream"`

**Solution**: 
1. Make sure frontend is built: `cd frontend && npm run build`
2. Check that `frontend/dist` folder exists
3. Restart the backend server

### Issue: 404 on Favicon
**Solution**: The favicon.svg is now included in the build. Rebuild frontend.

### Issue: API Calls Failing
**Solution**: 
1. Check `frontend/.env` has correct `VITE_API_URL`
2. Rebuild frontend after changing .env
3. Check CORS settings in `app/main.py`

### Issue: Static Files Not Loading
**Solution**:
1. Verify `frontend/dist/assets` folder exists
2. Check file permissions
3. Restart backend server

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:8000/health
```

### Metrics
```bash
curl http://localhost:8000/metrics
```

### API Documentation
Visit: http://localhost:8000/docs

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use environment variables for sensitive data
3. **CORS**: Update `allow_origins` in production to specific domains
4. **HTTPS**: Use SSL certificates in production
5. **Rate Limiting**: Consider adding rate limiting middleware

## 📝 Build Output

After building, you should see:
```
frontend/dist/
├── index.html
├── favicon.svg
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [other assets]
```

## ✅ Verification Checklist

- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] Can access http://localhost:8000
- [ ] Can upload documents
- [ ] Can ask questions
- [ ] Session management works
- [ ] Favicon loads correctly
- [ ] No console errors in browser
- [ ] API endpoints respond correctly

## 🚀 Cloud Deployment

### Heroku
```bash
# Add Procfile
echo "web: uvicorn app.main:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy
git push heroku main
```

### AWS EC2
1. SSH into EC2 instance
2. Clone repository
3. Install dependencies
4. Build frontend
5. Run with systemd service

### DigitalOcean App Platform
1. Connect GitHub repository
2. Set build command: `cd frontend && npm install && npm run build`
3. Set run command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

---

**Last Updated**: February 7, 2026
**Version**: 1.0.0
