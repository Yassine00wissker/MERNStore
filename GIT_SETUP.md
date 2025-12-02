# 🚀 Git Setup Guide - Push to GitHub

Follow these steps to push your MERN Store project to GitHub.

## Prerequisites
- Git installed on your system
- GitHub account created
- Project ready to commit

---

## Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project root directory
cd "c:\Users\SBS\Desktop\mern project\MERNStore"

# Initialize git repository
git init
```

---

## Step 2: Check Current Status

```bash
# Check what files are tracked/untracked
git status
```

---

## Step 3: Add All Files to Staging

```bash
# Add all files to staging area
git add .

# Or add specific files/directories
# git add frontend/
# git add backend/
# git add README.md
```

---

## Step 4: Create Initial Commit

```bash
# Create your first commit
git commit -m "Initial commit: MERN Store project with authentication, payments, and admin features"
```

**Or with a more detailed message:**

```bash
git commit -m "Initial commit: MERN Store

- User authentication (login/register)
- Product management (CRUD operations)
- Shopping cart functionality
- PayPal payment integration
- Admin dashboard with statistics
- Order management
- Dark/Light theme toggle
- Search and filter products
- Role-based access control (Buyer, Seller, Admin)"
```

---

## Step 5: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `MERNStore` (or your preferred name)
   - **Description**: "Full-stack MERN marketplace application with authentication, payments, and admin features"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

## Step 6: Add Remote Repository

```bash
# Add GitHub repository as remote origin
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git

# Verify remote was added
git remote -v
```

**If you're using SSH instead of HTTPS:**

```bash
git remote add origin git@github.com:YOUR_USERNAME/MERNStore.git
```

---

## Step 7: Rename Main Branch (if needed)

```bash
# Check current branch name
git branch

# If you're on 'master', rename to 'main' (GitHub's default)
git branch -M main
```

---

## Step 8: Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin main

# For subsequent pushes, you can use:
# git push
```

**If you encounter authentication issues:**

- **HTTPS**: You'll be prompted for username and password (use a Personal Access Token, not your GitHub password)
- **SSH**: Make sure your SSH key is added to GitHub

---

## Step 9: Verify Push

1. Go to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded

---

## 🔄 Common Git Commands for Future Updates

### Check Status
```bash
git status
```

### Add Changes
```bash
# Add all changes
git add .

# Add specific file
git add path/to/file.js
```

### Commit Changes
```bash
git commit -m "Description of changes"
```

### Push Changes
```bash
git push
```

### Pull Latest Changes (if working with team)
```bash
git pull origin main
```

### Create a New Branch
```bash
git checkout -b feature/new-feature
git push -u origin feature/new-feature
```

### Switch Branches
```bash
git checkout main
```

### View Commit History
```bash
git log
```

---

## ⚠️ Important Notes

1. **Never commit `.env` files** - They contain sensitive information (database URLs, API keys, secrets)
2. **Never commit `node_modules/`** - These are dependencies that can be reinstalled
3. **Check `.gitignore`** - Make sure sensitive files are ignored before committing
4. **Use meaningful commit messages** - Describe what changes you made
5. **Push regularly** - Don't wait too long between pushes

---

## 🐛 Troubleshooting

### If you get "remote origin already exists" error:
```bash
# Remove existing remote
git remote remove origin

# Add it again with correct URL
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git
```

### If you need to update remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/MERNStore.git
```

### If you want to force push (⚠️ Use with caution):
```bash
git push -u origin main --force
```

### If you need to undo last commit (but keep changes):
```bash
git reset --soft HEAD~1
```

### If you need to undo last commit (and discard changes):
```bash
git reset --hard HEAD~1
```

---

## 📝 Quick Reference - Complete Workflow

```bash
# 1. Navigate to project
cd "c:\Users\SBS\Desktop\mern project\MERNStore"

# 2. Initialize (if needed)
git init

# 3. Add files
git add .

# 4. Commit
git commit -m "Initial commit"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/MERNStore.git

# 6. Rename branch to main
git branch -M main

# 7. Push
git push -u origin main
```

---

## ✅ Checklist Before Pushing

- [ ] `.env` files are in `.gitignore`
- [ ] `node_modules/` is in `.gitignore`
- [ ] No sensitive data in code (API keys, passwords)
- [ ] README.md is updated
- [ ] All files are saved
- [ ] Backend and frontend are working locally
- [ ] No large unnecessary files

---

**Happy Coding! 🎉**
