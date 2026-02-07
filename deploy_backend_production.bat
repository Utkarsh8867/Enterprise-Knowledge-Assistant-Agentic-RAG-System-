@echo off
echo ========================================
echo Backend Production Deployment
echo ========================================
echo.

REM Check if .env file exists
if not exist .env (
    echo ERROR: .env file not found!
    echo.
    echo Please create a .env file with:
    echo GROQ_API_KEY=your_groq_api_key_here
    echo UPLOAD_DIR=./data/uploads
    echo VECTOR_STORE_DIR=./data/vector_store
    echo.
    pause
    exit /b 1
)

echo [1/5] Checking Python installation...
python --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed!
    pause
    exit /b 1
)
echo ✓ Python found
echo.

echo [2/5] Installing dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [3/5] Installing Gunicorn (production server)...
pip install gunicorn
echo ✓ Gunicorn installed
echo.

echo [4/5] Creating data directories...
if not exist data\uploads mkdir data\uploads
if not exist data\vector_store mkdir data\vector_store
echo ✓ Directories created
echo.

echo [5/5] Starting production server...
echo.
echo ========================================
echo Production Server Starting
echo ========================================
echo.
echo Configuration:
echo   - Workers: 4
echo   - Port: 8000
echo   - Host: 0.0.0.0
echo.
echo Access the application at:
echo   - API: http://localhost:8000
echo   - Docs: http://localhost:8000/docs
echo   - Frontend: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --timeout 120 --access-logfile - --error-logfile -

pause
