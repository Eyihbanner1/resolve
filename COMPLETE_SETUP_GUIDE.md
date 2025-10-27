# 🚀 Complete Auto-Deployment Setup for resolve.ng

## Step 1: Push the Workflow File to GitHub

You need to commit and push the `.github/workflows/deploy.yml` file I created locally to your GitHub repository.

### Using Git Commands:
```bash
cd "c:\Users\magpi\OneDrive\Desktop\resolve"
git add .
git commit -m "🚀 Add automatic deployment workflow for HostAfrica"
git push origin main
```

### Using GitHub Desktop:
1. Open GitHub Desktop
2. Select your "resolve" repository
3. You should see the new `.github` folder in changes
4. Add commit message: "🚀 Add automatic deployment workflow"
5. Click "Commit to main"
6. Click "Push origin"

## Step 2: Add GitHub Secrets

After pushing the workflow file, go to your repository settings:

### Direct Link:
https://github.com/Eyihbanner1/resolve/settings/secrets/actions

### Manual Navigation:
1. Go to: https://github.com/Eyihbanner1/resolve
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Add These 4 Secrets:

#### Secret 1: FTP_HOST
- **Name**: `FTP_HOST`
- **Secret**: `ftp.resolve.ng`

#### Secret 2: FTP_USERNAME  
- **Name**: `FTP_USERNAME`
- **Secret**: `sales.doshremit@gmail.com`

#### Secret 3: FTP_PASSWORD
- **Name**: `FTP_PASSWORD`  
- **Secret**: `WY?GjrQq6[xI`

#### Secret 4: FTP_SERVER_DIR
- **Name**: `FTP_SERVER_DIR`
- **Secret**: `/public_html/`

## Step 3: Test the Deployment

After adding all secrets:

1. Make a small change to any file (like adding a comment)
2. Commit and push the change
3. Go to: https://github.com/Eyihbanner1/resolve/actions
4. Watch the deployment workflow run
5. Check https://resolve.ng to see if changes appear

## Alternative FTP Settings to Try

If the first settings don't work, try these alternatives:

### Option A: Different FTP Host
- `FTP_HOST`: `resolve.ng` (without ftp. prefix)

### Option B: HostAfrica Standard
- `FTP_HOST`: `ftp.hostafrica.com.ng`

### Option C: Different Directory
- `FTP_SERVER_DIR`: `/www/` (instead of /public_html/)

## Troubleshooting

### If Deployment Fails:
1. Check the Actions tab for error messages
2. Try alternative FTP settings above
3. Verify your domain is pointing to HostAfrica
4. Contact HostAfrica support for correct FTP details

### If Website Doesn't Update:
1. Clear browser cache
2. Check if files uploaded to correct directory
3. Verify domain DNS settings

## Security Notes

✅ **Secure**: Credentials stored in GitHub Secrets (encrypted)
✅ **Private**: Only repository collaborators can see secrets
✅ **Safe**: Credentials never appear in code or logs

## Success Indicators

When working correctly, you'll see:
- ✅ Green checkmark in Actions tab
- ✅ "Deploy to HostAfrica" workflow completed successfully  
- ✅ Website updates appear at https://resolve.ng
- ✅ Changes reflect within 1-2 minutes of pushing code

---

**Next Step**: Push the workflow file to GitHub, then add the 4 secrets!
