@echo off
echo ========================================
echo Backend Deployment Script
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

echo [1/4] Checking Python installation...
python --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python is not installed!
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)
echo ✓ Python found
echo.

echo [2/4] Installing dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [3/4] Creating data directories...
if not exist data\uploads mkdir data\uploads
if not exist data\vector_store mkdir data\vector_store
echo ✓ Directories created
echo.

echo [4/4] Starting backend server...
echo.
echo ========================================
echo Backend is starting...
echo ========================================
echo.
echo Access the application at:
echo   - API: http://localhost:8000
echo   - Docs: http://localhost:8000/docs
echo   - Frontend: http://localhost:8000 (if built)
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause
