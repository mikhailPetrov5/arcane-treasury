# Vercel Deployment Guide for Arcane Treasury

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare your environment configuration

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" on your dashboard
3. Import your GitHub repository: `mikhailPetrov5/arcane-treasury`

### Step 2: Configure Project Settings

1. **Project Name**: `arcane-treasury`
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**How to add environment variables:**
1. In your Vercel project dashboard, go to "Settings"
2. Click on "Environment Variables" tab
3. Add each variable with the exact values above
4. Make sure to set them for "Production", "Preview", and "Development" environments

### Step 4: Build Configuration

Create a `vercel.json` file in your project root (optional but recommended):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 5: Deploy

1. Click "Deploy" button in Vercel dashboard
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your app will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings"
2. Click on "Domains" tab
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Checklist

- [ ] Verify the app loads correctly
- [ ] Test wallet connection functionality
- [ ] Confirm environment variables are working
- [ ] Check that all features are accessible
- [ ] Test responsive design on mobile devices

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check that all dependencies are properly installed
2. **Environment Variables**: Ensure all required variables are set in Vercel
3. **Wallet Connection**: Verify WalletConnect Project ID is correct
4. **Network Issues**: Confirm RPC URLs are accessible

### Build Logs:

If deployment fails, check the build logs in Vercel dashboard:
1. Go to your project dashboard
2. Click on the failed deployment
3. Review the build logs for specific error messages

## Performance Optimization

1. **Enable Vercel Analytics**: Monitor your app's performance
2. **Configure Caching**: Set appropriate cache headers for static assets
3. **Image Optimization**: Use Vercel's built-in image optimization
4. **Edge Functions**: Consider using Vercel Edge Functions for better performance

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to your repository
2. **HTTPS**: Vercel automatically provides HTTPS
3. **CORS**: Configure CORS settings if needed for API calls
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Monitoring and Maintenance

1. **Vercel Analytics**: Monitor user behavior and performance
2. **Error Tracking**: Set up error monitoring (e.g., Sentry)
3. **Uptime Monitoring**: Use services like UptimeRobot
4. **Regular Updates**: Keep dependencies updated for security

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: Create issues in your GitHub repository

---

**Note**: This deployment guide assumes you're using the standard Vite + React setup. Adjust build commands and configurations based on your specific setup if needed.
