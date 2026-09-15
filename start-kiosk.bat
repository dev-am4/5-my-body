@echo off
setlocal
cd /d "%~dp0"

if not exist node_modules (
  echo [5 MY BODY] Installing dependencies...
  call npm install
  if errorlevel 1 goto :error
)

echo [5 MY BODY] Starting local kiosk server...
start "5 MY BODY SERVER" cmd /c "npm run dev -- --host 127.0.0.1 --port 5173"
timeout /t 3 /nobreak >nul
start "" chrome --kiosk --disable-pinch --overscroll-history-navigation=0 http://127.0.0.1:5173
exit /b 0

:error
echo Failed to start 5 MY BODY.
pause
exit /b 1
