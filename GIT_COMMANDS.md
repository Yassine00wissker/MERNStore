# 🚀 Git Commands Guide - Push MERN Store to GitHub

This guide contains all the necessary Git commands to push your MERN Store project to GitHub.

## 📋 Prerequisites

1. **Install Git** (if not already installed)
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`

2. **Create a GitHub Account** (if you don't have one)
   - Sign up at: https://github.com

3. **Create a GitHub Repository**
   - Go to: https://github.com/new
   - Repository name: `MERNStore` (or your preferred name)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

## 🔧 Step-by-Step Git Commands

### Option 1: Using the Automated Script (Recommended for Windows)

Simply run:
```bash
push-to-github.bat
```

The script will guide you through the process.

---

### Option 2: Manual Git Commands

#### Step 1: Initialize Git Repository (if not already done)
```bash
git init
```

#### Step 2: Check Current Status
```bash
git status
```

#### Step 3: Add All Files to Staging Area
```bash
git add .
```

#### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: MERN Store project with authentication, payments, and admin features"
```

#### Step 5: Rename Branch to Main (if needed)
```bash
git branch -M main
```

#### Step 6: Add Remote Repository
Replace `YOUR_USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git
```

**Or if you prefer SSH:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/MERNStore.git
```

#### Step 7: Push to GitHub
```bash
git push -u origin main
```

---

## 🔄 For Subsequent Updates

After making changes to your project, use these commands:

```bash
# 1. Check what files have changed
git status

# 2. Add all changes
git add .

# 3. Commit with a descriptive message
git commit -m "Description of your changes"

# 4. Push to GitHub
git push
```

### Example Commit Messages:
```bash
git commit -m "Fix authentication and login issues"
git commit -m "Add dark mode toggle to navigation bars"
git commit -m "Improve cart page design and functionality"
git commit -m "Add admin order management features"
```

---

## 🔐 Authentication Methods

### Method 1: Personal Access Token (Recommended)

1. **Generate a Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: `MERNStore Access`
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Use the Token:**
   - When prompted for password, paste your token instead
   - Username: Your GitHub username

### Method 2: SSH Keys (More Secure)

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add SSH Key to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your key and save

3. **Use SSH URL for remote:**
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/MERNStore.git
   ```

---

## 🛠️ Troubleshooting

### Issue: "fatal: remote origin already exists"
**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git
```

### Issue: "Authentication failed"
**Solutions:**
1. Use Personal Access Token instead of password
2. Check if you have 2FA enabled (requires token)
3. Verify your GitHub username is correct

### Issue: "failed to push some refs"
**Solution:**
```bash
# Pull changes first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue: "branch 'main' has no upstream branch"
**Solution:**
```bash
git push -u origin main
```

### Issue: "Updates were rejected"
**Solution:**
```bash
# Force push (use with caution!)
git push -u origin main --force
```

---

## 📝 Quick Reference Commands

```bash
# Initialize repository
git init

# Check status
git status

# Add files
git add .
git add specific-file.js

# Commit
git commit -m "Your message"

# View commit history
git log

# View remote repositories
git remote -v

# Remove remote
git remote remove origin

# Change remote URL
git remote set-url origin NEW_URL

# Push to GitHub
git push -u origin main

# Pull from GitHub
git pull origin main

# Create new branch
git checkout -b feature-branch

# Switch branches
git checkout main

# View branches
git branch
```

---

## ✅ Verification

After pushing, verify your code is on GitHub:

1. Go to: `https://github.com/YOUR_USERNAME/MERNStore`
2. You should see all your project files
3. Check the commit history

---

## 📦 What Gets Pushed

The `.gitignore` files ensure these are **NOT** pushed:
- `node_modules/` folders
- `.env` files (environment variables)
- `uploads/` folder (user-uploaded images)
- Build artifacts
- IDE configuration files

**Important:** Make sure your `.env` files are in `.gitignore` before pushing!

---

## 🎯 Complete Workflow Example

```bash
# 1. Navigate to project directory
cd "c:\Users\SBS\Desktop\mern project\MERNStore"

# 2. Initialize Git (first time only)
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: MERN Store project"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Need Help?** Check the error message and refer to the Troubleshooting section above.
