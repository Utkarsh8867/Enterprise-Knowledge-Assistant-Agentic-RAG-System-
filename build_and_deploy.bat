@echo off
echo ========================================
echo Building Frontend for Production
echo ========================================

cd frontend
echo Installing dependencies...
call npm install

echo Building frontend...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Frontend built successfully!
echo ========================================
echo.
echo Build output: frontend/dist
echo.
echo To deploy:
echo 1. Make sure backend dependencies are installed: pip install -r requirements.txt
echo 2. Run: python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
echo 3. Access at: http://localhost:8000
echo.
echo The backend will serve both API and frontend!
echo ========================================

cd ..
pause
