@echo off
echo ========================================
echo Enterprise Knowledge Assistant Setup
echo ========================================
echo.

echo [1/3] Checking backend...
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo Installing backend dependencies...
    pip install -r requirements.txt
) else (
    echo Backend dependencies OK
)

echo.
echo [2/3] Installing frontend dependencies...
cd frontend
if not exist node_modules (
    echo Installing npm packages (this may take a few minutes)...
    call npm install
) else (
    echo Frontend dependencies OK
)

echo.
echo [3/3] Starting servers...
echo.
echo Starting backend on http://localhost:8000
start "Backend Server" cmd /k "cd .. && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 5 /nobreak > nul

echo Starting frontend on http://localhost:3000
start "Frontend Server" cmd /k "npm start"

cd ..

echo.
echo ========================================
echo Setup Complete!
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.
echo Both servers are starting in separate windows.
echo Close this window when done.
pause
