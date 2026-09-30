@echo off
title GitHub Pages Uploader
color 0A

start https://github.com/Jittrakan-K/Achievement-Record/upload/main
explorer.exe /select,"%~dp0index.html"

echo ================================================================
echo    ACHIEVEMENT RECORD - GITHUB PAGES UPDATE
echo ================================================================
echo.
echo 1. Browser has opened GitHub upload page.
echo 2. File Explorer has opened the folder.
echo.
echo Drag and drop these files into GitHub upload box:
echo   - index.html
echo   - app.js
echo   - styles.css
echo   - ACHIEVEMENT RECORD.html
echo   - mobile-preview.html (Optional - Mobile Simulator)
echo.
echo Then click "Commit changes" button at the bottom.
echo ================================================================
echo.
pause
