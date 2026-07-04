@echo off
title KROMA ONE - local server
cd /d "%~dp0"

python --version >nul 2>nul
if %errorlevel%==0 (
  echo.
  echo   KROMA ONE is running:  http://localhost:8090
  echo   Keep this window open. Close it to stop the site.
  echo.
  start "" "http://localhost:8090"
  python -m http.server 8090
  goto :eof
)

py --version >nul 2>nul
if %errorlevel%==0 (
  echo.
  echo   KROMA ONE is running:  http://localhost:8090
  echo   Keep this window open. Close it to stop the site.
  echo.
  start "" "http://localhost:8090"
  py -m http.server 8090
  goto :eof
)

echo.
echo  Python is not installed on this computer.
echo  Install it FREE from the Microsoft Store: search "Python 3.12"
echo  and click Get. Then double-click this file again.
echo.
start ms-windows-store://search/?query=python
pause
