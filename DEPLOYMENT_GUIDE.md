# Automatic Deployment Setup Guide

This repository is configured for automatic deployment to HostAfrica hosting using GitHub Actions.

## How it works

- When you push changes to the `main` branch, GitHub Actions automatically deploys your website
- The deployment uses FTP to upload files to your HostAfrica hosting
- Only necessary files are deployed (excludes .git, .github, README.md, etc.)

## Initial Setup Required

### 1. Get your HostAfrica hosting details

You'll need the following information from your HostAfrica hosting account:
- **FTP Host**: Usually something like `ftp.resolve.ng` or `ftp.hostafrica.com.ng`
- **FTP Username**: Your hosting username
- **FTP Password**: Your hosting password  
- **Server Directory**: The path to your public website folder (usually `/public_html/` or `/www/`)

### 2. Add secrets to your GitHub repository

1. Go to your GitHub repository: https://github.com/Eyihbanner1/resolve
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add these four secrets:

   - **Name**: `FTP_HOST`
     **Value**: Your FTP host (e.g., `ftp.resolve.ng`)
   
   - **Name**: `FTP_USERNAME`  
     **Value**: Your FTP username
   
   - **Name**: `FTP_PASSWORD`
     **Value**: Your FTP password
   
   - **Name**: `FTP_SERVER_DIR`
     **Value**: Your server directory path (e.g., `/public_html/`)

### 3. Test the deployment

1. After adding the secrets, make a small change to your website
2. Commit and push the changes to the main branch
3. Go to the **Actions** tab in your GitHub repository
4. You should see the deployment workflow running
5. Check your website at https://resolve.ng to see if changes are live

## Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab in your GitHub repository
2. Click on "Deploy to HostAfrica" workflow
3. Click **Run workflow** button

## Troubleshooting

If deployment fails:
1. Check the **Actions** tab for error messages
2. Verify your FTP credentials are correct
3. Make sure the server directory path is correct
4. Contact HostAfrica support if needed

## Security Notes

- Never commit FTP credentials directly to your code
- All sensitive information is stored securely in GitHub Secrets
- Only repository collaborators can view/edit secrets
