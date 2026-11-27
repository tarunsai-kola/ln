@echo off
echo ========================================================
echo   WHITE DART - HR OFFER LETTER PORTAL
echo   Your Trust Our Responsibility
echo ========================================================
echo.
echo Starting server on http://localhost:5000 ...
echo.

cd /d "%~dp0"
start "" http://localhost:5000
npm start
pause
