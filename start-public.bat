@echo off
:: Doc & PPT Studio - Windows 开机自启脚本
:: 此脚本在用户登录时自动运行，启动 Vite + 公网隧道

setlocal

set PROJECT_DIR=D:\文档编辑与ppt制作的网站
set LOG_FILE=%PROJECT_DIR%\tunnel-output.log

echo ========================================= >> "%LOG_FILE%"
echo   Doc & PPT Studio - 开机启动 [%date% %time%] >> "%LOG_FILE%"
echo ========================================= >> "%LOG_FILE%"

:: 查找 Git Bash
set BASH_PATH=
if exist "C:\Program Files\Git\bin\bash.exe" set BASH_PATH=C:\Program Files\Git\bin\bash.exe
if exist "C:\Program Files (x86)\Git\bin\bash.exe" set BASH_PATH=C:\Program Files (x86)\Git\bin\bash.exe
if exist "%LOCALAPPDATA%\Programs\Git\bin\bash.exe" set BASH_PATH=%LOCALAPPDATA%\Programs\Git\bin\bash.exe

if "%BASH_PATH%"=="" (
    echo [ERROR] 未找到 Git Bash，请安装 Git for Windows >> "%LOG_FILE%"
    exit /b 1
)

echo [INFO] 使用 Bash: %BASH_PATH% >> "%LOG_FILE%"

:: 启动（最小化窗口，后台运行）
start "" /MIN "%BASH_PATH%" -c "cd '%PROJECT_DIR%' && bash start-public.sh >> '%PROJECT_DIR%\tunnel-output.log' 2>&1 &"

echo [INFO] 已启动 >> "%LOG_FILE%"
exit /b 0
