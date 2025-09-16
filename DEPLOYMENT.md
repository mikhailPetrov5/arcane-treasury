# 🚀 Deployment Guide

## Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository access
- Environment variables ready

### Step-by-Step Deployment

1. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in and click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   Add these variables in Vercel dashboard:
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Access your deployed app

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

### Custom Domain

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS as instructed

## Environment Setup

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CHAIN_ID` | Blockchain network ID | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | `https://sepolia.infura.io/v3/...` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `your-project-id` |
| `VITE_INFURA_API_KEY` | Infura API key (optional) | `your-infura-key` |

### Network Configuration

- **Sepolia Testnet**: Default configuration
- **Mainnet**: Update `VITE_CHAIN_ID` to `1`
- **Other Networks**: Modify chain configuration in `src/lib/wallet.ts`

## Build Configuration

### Vite Configuration
The project uses Vite with the following optimizations:
- React SWC for fast compilation
- TypeScript support
- Path aliases for clean imports
- Development server on port 8080

### Build Process
```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run dev      # Development server
```

## Performance Optimization

### Vercel Features
- **Edge Functions**: For better performance
- **Image Optimization**: Automatic image optimization
- **Analytics**: Built-in performance monitoring
- **Caching**: Optimized caching headers

### Best Practices
- Enable Vercel Analytics
- Use CDN for static assets
- Implement proper error boundaries
- Monitor bundle size

## Security Considerations

### Environment Variables
- Never commit sensitive keys to repository
- Use Vercel's secure environment variable storage
- Rotate keys regularly
- Use different keys for different environments

### HTTPS
- Vercel automatically provides HTTPS
- Configure proper CORS settings
- Implement rate limiting if needed

## Monitoring

### Vercel Analytics
- Monitor user behavior
- Track performance metrics
- Identify optimization opportunities

### Error Tracking
- Set up error monitoring (Sentry recommended)
- Monitor build failures
- Track runtime errors

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check network configuration
   - Ensure RPC URLs are accessible

3. **Environment Variable Issues**
   - Confirm all required variables are set
   - Check variable names match exactly
   - Verify values are correct

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update environment variables as needed
- Review and optimize performance

### Backup Strategy
- Regular database backups (if applicable)
- Environment variable backups
- Code repository backups
- Configuration backups
