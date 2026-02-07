# 🚀 Backend Deployment Guide

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
UPLOAD_DIR=./data/uploads
VECTOR_STORE_DIR=./data/vector_store
```

### 3. Run the Backend
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Access**:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Frontend: http://localhost:8000 (if built)

---

## 🌐 Production Deployment Options

### Option 1: Simple Production Server

**Best for**: Small to medium applications

```bash
# Install dependencies
pip install -r requirements.txt

# Run with Uvicorn (production mode)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Option 2: Gunicorn + Uvicorn Workers

**Best for**: Production environments with high traffic

```bash
# Install Gunicorn
pip install gunicorn

# Run with multiple workers
gunicorn app.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
```

### Option 3: Docker Deployment

**Best for**: Containerized deployments

#### Create Dockerfile (already exists):
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create data directories
RUN mkdir -p data/uploads data/vector_store

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Build and Run:
```bash
# Build image
docker build -t rag-backend .

# Run container
docker run -d \
  -p 8000:8000 \
  -e GROQ_API_KEY=your_key_here \
  -v $(pwd)/data:/app/data \
  --name rag-backend \
  rag-backend
```

### Option 4: Docker Compose

**Best for**: Full stack deployment (backend + frontend)

```bash
docker-compose up -d
```

---

## ☁️ Cloud Platform Deployment

### Deploy to Heroku

1. **Create Procfile**:
```bash
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile
```

2. **Create runtime.txt**:
```bash
echo "python-3.11.0" > runtime.txt
```

3. **Deploy**:
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set GROQ_API_KEY=your_key_here

# Deploy
git push heroku master

# Open app
heroku open
```

### Deploy to AWS EC2

1. **Launch EC2 Instance** (Ubuntu 22.04)

2. **SSH into instance**:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install dependencies**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and pip
sudo apt install python3-pip python3-venv -y

# Clone repository
git clone https://github.com/Utkarsh8867/Enterprise-Knowledge-Assistant-Agentic-RAG-System-.git
cd Enterprise-Knowledge-Assistant-Agentic-RAG-System-

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

4. **Set up environment**:
```bash
# Create .env file
nano .env
# Add your GROQ_API_KEY and other variables

# Create data directories
mkdir -p data/uploads data/vector_store
```

5. **Run with systemd** (keeps running after logout):
```bash
# Create service file
sudo nano /etc/systemd/system/rag-backend.service
```

Add this content:
```ini
[Unit]
Description=RAG Backend Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Enterprise-Knowledge-Assistant-Agentic-RAG-System-
Environment="PATH=/home/ubuntu/Enterprise-Knowledge-Assistant-Agentic-RAG-System-/venv/bin"
ExecStart=/home/ubuntu/Enterprise-Knowledge-Assistant-Agentic-RAG-System-/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

6. **Start service**:
```bash
sudo systemctl daemon-reload
sudo systemctl enable rag-backend
sudo systemctl start rag-backend
sudo systemctl status rag-backend
```

7. **Configure firewall**:
```bash
sudo ufw allow 8000
sudo ufw enable
```

### Deploy to DigitalOcean App Platform

1. **Connect GitHub repository** in DigitalOcean dashboard

2. **Configure build settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Run Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8080`

3. **Set environment variables** in dashboard:
   - `GROQ_API_KEY`: your_key_here
   - `PORT`: 8080

4. **Deploy**: Click "Deploy"

### Deploy to Google Cloud Run

1. **Create Dockerfile** (use the one above)

2. **Deploy**:
```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Set project
gcloud config set project your-project-id

# Build and deploy
gcloud run deploy rag-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GROQ_API_KEY=your_key_here
```

### Deploy to Azure App Service

1. **Install Azure CLI**

2. **Deploy**:
```bash
# Login
az login

# Create resource group
az group create --name rag-rg --location eastus

# Create app service plan
az appservice plan create \
  --name rag-plan \
  --resource-group rag-rg \
  --sku B1 \
  --is-linux

# Create web app
az webapp create \
  --resource-group rag-rg \
  --plan rag-plan \
  --name your-app-name \
  --runtime "PYTHON:3.11"

# Configure environment variables
az webapp config appsettings set \
  --resource-group rag-rg \
  --name your-app-name \
  --settings GROQ_API_KEY=your_key_here

# Deploy code
az webapp up \
  --resource-group rag-rg \
  --name your-app-name
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GROQ_API_KEY` | Groq API key for LLM | Yes | - |
| `UPLOAD_DIR` | Directory for uploaded files | No | `./data/uploads` |
| `VECTOR_STORE_DIR` | Directory for vector store | No | `./data/vector_store` |
| `PORT` | Server port | No | `8000` |

### Update .env file:
```env
GROQ_API_KEY=gsk_your_actual_key_here
UPLOAD_DIR=./data/uploads
VECTOR_STORE_DIR=./data/vector_store
```

---

## 🔒 Security Best Practices

### 1. Use HTTPS in Production
```bash
# With Nginx reverse proxy
sudo apt install nginx certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 2. Update CORS Settings
Edit `app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # Specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Add Rate Limiting
```bash
pip install slowapi

# Add to app/main.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(429, _rate_limit_exceeded_handler)

@app.post("/ask")
@limiter.limit("10/minute")
async def ask_question(...):
    ...
```

### 4. Use Environment Variables (Never commit .env)
```bash
# Add to .gitignore
echo ".env" >> .gitignore
```

---

## 📊 Monitoring & Logging

### Health Check Endpoint
```bash
curl http://localhost:8000/health
```

### View Logs
```bash
# Systemd service logs
sudo journalctl -u rag-backend -f

# Docker logs
docker logs -f rag-backend

# Heroku logs
heroku logs --tail
```

### Add Logging to Application
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

---

## 🧪 Testing Deployment

### 1. Health Check
```bash
curl http://your-domain:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "session_id": "...",
  "vector_store_size": 0,
  "model": "llama-3.3-70b-versatile"
}
```

### 2. Upload Document
```bash
curl -X POST http://your-domain:8000/upload-document \
  -F "file=@test.pdf"
```

### 3. Ask Question
```bash
curl -X POST http://your-domain:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "What is this about?"}'
```

---

## 🐛 Troubleshooting

### Issue: Port already in use
```bash
# Find process using port 8000
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### Issue: Module not found
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Issue: Permission denied
```bash
# Fix permissions
chmod +x start_server.sh
sudo chown -R $USER:$USER data/
```

### Issue: Out of memory
```bash
# Reduce workers
uvicorn app.main:app --workers 1

# Or increase server memory
```

---

## 📝 Quick Commands Reference

```bash
# Development
python -m uvicorn app.main:app --reload

# Production (single worker)
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Production (multiple workers)
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Docker
docker build -t rag-backend .
docker run -d -p 8000:8000 --env-file .env rag-backend

# Check status
curl http://localhost:8000/health

# View API docs
open http://localhost:8000/docs
```

---

## ✅ Deployment Checklist

- [ ] Install Python 3.8+
- [ ] Install dependencies from requirements.txt
- [ ] Create .env file with GROQ_API_KEY
- [ ] Create data directories (uploads, vector_store)
- [ ] Test locally first
- [ ] Configure firewall/security groups
- [ ] Set up HTTPS/SSL certificate
- [ ] Update CORS settings for production
- [ ] Set up monitoring/logging
- [ ] Configure auto-restart (systemd/supervisor)
- [ ] Test all endpoints
- [ ] Set up backups for data directory

---

**Need Help?** Check the logs or open an issue on GitHub!

**Last Updated**: February 7, 2026
