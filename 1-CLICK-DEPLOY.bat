@echo off
chcp 65001 > nul
title ACHIEVEMENT RECORD - FIREBASE DEPLOY
color 0B

echo ================================================================
echo    ACHIEVEMENT RECORD - FIREBASE ONE-CLICK HOSTING DEPLOY
echo ================================================================
echo.

:: 1. Setup Node.js and Firebase PATH automatically
set "NODE_PATH=%LOCALAPPDATA%\Programs\node"
set "PATH=%NODE_PATH%;%APPDATA%\npm;%PATH%"

echo [1/3] ตรวจสอบสถานะการเชื่อมต่อบัญชี Google Firebase...
echo ----------------------------------------------------------------
call "%NODE_PATH%\firebase.cmd" login

echo.
echo [2/3] กำลังนำไฟล์ขึ้นเซิร์ฟเวอร์ Google Firebase Hosting...
echo ----------------------------------------------------------------
call "%NODE_PATH%\firebase.cmd" deploy --only hosting

if %errorlevel% neq 0 (
    echo.
    echo [!] เกิดข้อผิดพลาดในการ Deploy
    echo [i] หากต้องการเลือกโปรเจกต์ใหม่ ให้พิมพ์คำสั่ง: "%NODE_PATH%\firebase.cmd" use --add
    echo.
    pause
    exit /b
)

echo.
echo ================================================================
echo   [SUCCESS] นำเว็บไซต์ขึ้น Firebase Hosting สำเร็จเรียบร้อยแล้ว!
echo ================================================================
echo.
echo ลิงก์สำหรับเข้าใช้งานเว็บไซต์ของท่าน (เปิดได้ทั้งมือถือและคอมพิวเตอร์):
echo.
echo   👉 https://orbray-techno-achievements.web.app
echo.
echo กำลังเปิดหน้าเว็บไซต์ในเบราว์เซอร์ให้อัตโนมัติ...
start https://orbray-techno-achievements.web.app
echo.
pause