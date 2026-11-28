@echo off
echo ========================================================
echo   GROW MORE SOLUTIONS - HR OFFER LETTER PORTAL
echo   Accelerating Growth & Success
echo ========================================================
echo.
echo Starting server on http://localhost:5000 ...
echo.

cd /d "%~dp0"
start "" http://localhost:5000
npm start
pause
