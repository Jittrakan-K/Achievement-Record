@echo off
chcp 65001 > nul
title ORBRAY - MOBILE DEVICE SIMULATOR (iOS & Android)
color 0B

echo ================================================================
echo    ORBRAY - PRODUCTION TECHNOLOGY ACHIEVEMENT RECORD
echo        MOBILE DEVICE SIMULATOR (iOS & Android Preview)
echo ================================================================
echo.
echo [i] กำลังเปิดโปรแกรมจำลองหน้าจอมือถือ (Mobile Simulator)...
echo.
echo ฟังก์ชันเด่นในโปรแกรมจำลอง:
echo   - 🍎 เลือกรุ่น Apple iOS ครบทุกรุ่นตั้งแต่ iPhone 11 จนถึง iPhone 16 Pro Max!
echo     (iPhone 11, 11 Pro/Max, iPhone 12, 13, 14, 15, 16 Series, SE, iPad)
echo   - 🤖 เลือกรุ่น Google Android (Samsung Galaxy S24 Ultra, S24, Pixel 9 Pro, ฯลฯ)
echo   - ⚡ กดปุ่ม 'R' หรือคลิก 'รีเฟรช' เพื่อโหลดโค้ดล่าสุดทันทีโดยไม่ต้องอัปโหลด Github!
echo   - 🔄 กดปุ่ม 'P' เพื่อสลับแนวตั้ง / แนวนอน
echo   - 📱 กดปุ่ม 'B' เพื่อเปิด/ปิดกรอบตัวเครื่อง
echo   - 🔍 ปรับขนาดย่อ/ขยาย หรือกด 'F' เพื่อปรับให้พอดีจอคอมพิวเตอร์
echo.
echo ================================================================

start "" "%~dp0mobile-preview.html"

echo.
echo [SUCCESS] เปิดโปรแกรมจำลองเรียบร้อยแล้วในเบราว์เซอร์ของท่าน
echo.
pause
