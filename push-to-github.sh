#!/bin/bash

echo "========================================"
echo "  MERN Store - Push to GitHub Script"
echo "========================================"
echo ""

# Step 1: Initialize Git (if not already done)
echo "[1/7] Checking Git initialization..."
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
else
    echo "Git repository already initialized."
fi
echo ""

# Step 2: Check status
echo "[2/7] Checking repository status..."
git status
echo ""

# Step 3: Add all files
echo "[3/7] Adding all files to staging area..."
git add .
echo "Files added successfully!"
echo ""

# Step 4: Create commit
echo "[4/7] Creating commit..."
git commit -m "Initial commit: MERN Store project with authentication, payments, and admin features"
echo ""

# Step 5: Instructions for remote
echo "[5/7] REMOTE SETUP REQUIRED:"
echo ""
echo "Please create a GitHub repository first:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named 'MERNStore'"
echo "3. DO NOT initialize with README, .gitignore, or license"
echo "4. Copy the repository URL"
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/USERNAME/MERNStore.git): " GITHUB_URL
echo ""

# Step 6: Add remote
echo "[6/7] Adding remote repository..."
git remote remove origin 2>/dev/null
git remote add origin "$GITHUB_URL"
echo "Remote added: $GITHUB_URL"
echo ""

# Step 7: Rename branch to main
echo "[7/7] Setting up branch..."
git branch -M main
echo ""

# Step 8: Push to GitHub
echo "Pushing to GitHub..."
echo ""
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  SUCCESS! Project pushed to GitHub!"
    echo "========================================"
else
    echo ""
    echo "========================================"
    echo "  ERROR: Push failed!"
    echo "========================================"
    echo ""
    echo "Possible issues:"
    echo "- Authentication failed (use Personal Access Token)"
    echo "- Repository URL is incorrect"
    echo "- Network connection issue"
    echo ""
    echo "Please check the error message above and try again."
fi

echo ""
