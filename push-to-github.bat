@echo off
echo ========================================
echo   MERN Store - Push to GitHub Script
echo ========================================
echo.

REM Step 1: Initialize Git (if not already done)
echo [1/7] Checking Git initialization...
if not exist ".git" (
    echo Initializing Git repository...
    git init
) else (
    echo Git repository already initialized.
)
echo.

REM Step 2: Check status
echo [2/7] Checking repository status...
git status
echo.

REM Step 3: Add all files
echo [3/7] Adding all files to staging area...
git add .
echo Files added successfully!
echo.

REM Step 4: Create commit
echo [4/7] Creating commit...
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Initial commit: MERN Store project with authentication, payments, and admin features
)
git commit -m "%COMMIT_MSG%"
echo.

REM Step 5: Instructions for remote
echo [5/7] REMOTE SETUP REQUIRED:
echo.
echo Please create a GitHub repository first:
echo 1. Go to https://github.com/new
echo 2. Create a new repository named "MERNStore"
echo 3. DO NOT initialize with README, .gitignore, or license
echo 4. Copy the repository URL
echo.
echo Example URLs:
echo   HTTPS: https://github.com/USERNAME/MERNStore.git
echo   SSH:   git@github.com:USERNAME/MERNStore.git
echo.
set /p GITHUB_URL="Enter your GitHub repository URL: "
if "%GITHUB_URL%"=="" (
    echo ERROR: GitHub URL is required!
    pause
    exit /b 1
)
echo.

REM Step 6: Add remote
echo [6/7] Adding remote repository...
git remote remove origin 2>nul
git remote add origin %GITHUB_URL%
echo Remote added: %GITHUB_URL%
echo.

REM Step 7: Rename branch to main
echo [7/7] Setting up branch...
git branch -M main
echo.

REM Step 8: Push to GitHub
echo Pushing to GitHub...
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Project pushed to GitHub!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ERROR: Push failed!
    echo ========================================
    echo.
    echo Possible issues:
    echo - Authentication failed (use Personal Access Token)
    echo - Repository URL is incorrect
    echo - Network connection issue
    echo.
    echo Please check the error message above and try again.
)

echo.
pause
