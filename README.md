# 🏛️ Arcane Treasury

> **A Next-Generation Decentralized Treasury Management Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 🌟 Overview

Arcane Treasury revolutionizes digital asset management through cutting-edge blockchain technology and advanced cryptographic protocols. Built for the modern decentralized economy, it provides secure, transparent, and efficient treasury operations with full homomorphic encryption (FHE) capabilities.

## ✨ Key Features

### 🔐 **Advanced Security**
- **FHE Integration**: Fully Homomorphic Encryption for sensitive data protection
- **Multi-signature Support**: Enhanced security through collaborative decision-making
- **Zero-Knowledge Proofs**: Privacy-preserving transaction verification

### 💼 **Treasury Management**
- **Multi-Vault Architecture**: Organize assets across different treasury vaults
- **Automated Governance**: Smart contract-based proposal and voting system
- **Real-time Analytics**: Comprehensive dashboard with performance metrics

### 🌐 **Blockchain Integration**
- **Multi-Chain Support**: Ethereum, Polygon, and other EVM-compatible chains
- **Wallet Connectivity**: Seamless integration with MetaMask, WalletConnect, and more
- **Gas Optimization**: Efficient transaction batching and optimization

### 🎨 **User Experience**
- **Intuitive Interface**: Modern, responsive design built with shadcn/ui
- **Dark/Light Themes**: Customizable appearance for user preference
- **Mobile-First**: Optimized for all device sizes

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI framework with concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **UI Components**
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful & consistent icon toolkit

### **Blockchain & Web3**
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI components
- **Viem** - TypeScript interface for Ethereum
- **FHEVM** - Fully Homomorphic Encryption for Ethereum

### **State Management**
- **TanStack Query** - Powerful data synchronization
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mikhailPetrov5/arcane-treasury.git
   cd arcane-treasury
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Blockchain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Optional: Additional RPC endpoints
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

### Network Configuration

The application is configured for **Sepolia Testnet** by default. To use other networks:

1. Update `VITE_CHAIN_ID` in your environment variables
2. Modify the chain configuration in `src/lib/wallet.ts`
3. Ensure your wallet is connected to the correct network

## 📁 Project Structure

```
arcane-treasury/
├── 📁 contracts/              # Smart contracts
│   └── ArcaneTreasury.sol    # Main treasury contract
├── 📁 public/                # Static assets
│   ├── favicon.ico           # Browser icon
│   └── favicon.svg           # SVG icon
├── 📁 src/
│   ├── 📁 components/        # Reusable UI components
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 lib/              # Utility functions
│   │   └── wallet.ts        # Wallet configuration
│   ├── 📁 pages/            # Application pages
│   ├── 📁 types/            # TypeScript definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── 📄 package.json          # Dependencies and scripts
├── 📄 vite.config.ts        # Vite configuration
└── 📄 tailwind.config.ts    # Tailwind CSS configuration
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run build:dev` | Build in development mode |

## 🔧 Development

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (recommended)
- **TypeScript**: Strict mode enabled for type safety

### Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Pull Request Guidelines

- Provide a clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** with automatic builds on push

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting provider
```

## 📊 Smart Contracts

### ArcaneTreasury Contract

The main smart contract provides:

- **Vault Management**: Create and manage treasury vaults
- **Transaction Processing**: Secure deposit and withdrawal operations
- **Governance**: Proposal creation and voting mechanisms
- **Member Management**: Add and manage vault members
- **FHE Integration**: Encrypted data storage and processing

### Contract Features

- **Multi-signature Support**: Collaborative decision-making
- **Time-locked Operations**: Enhanced security through delays
- **Reputation System**: Member reputation tracking
- **Audit Trail**: Complete transaction history

## 🔒 Security

### Best Practices

- **Private Key Management**: Never commit private keys to version control
- **Environment Variables**: Use secure environment variable management
- **Smart Contract Audits**: Regular security audits recommended
- **Access Control**: Implement proper role-based access control

### Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. **Email** security concerns to: security@arcane-treasury.dev
3. **Include** detailed reproduction steps
4. **Wait** for acknowledgment before public disclosure

## 📈 Roadmap

### Phase 1: Core Features ✅
- [x] Basic treasury management
- [x] Wallet integration
- [x] FHE encryption
- [x] Multi-vault support

### Phase 2: Advanced Features 🚧
- [ ] Cross-chain support
- [ ] Advanced analytics
- [ ] Mobile application
- [ ] API integration

### Phase 3: Enterprise Features 📋
- [ ] Enterprise SSO
- [ ] Advanced compliance tools
- [ ] Custom integrations
- [ ] White-label solutions

## 🤝 Community

### Get Involved

- **Discord**: Join our community discussions
- **Twitter**: Follow for updates and announcements
- **GitHub**: Contribute to the open-source project
- **Documentation**: Comprehensive guides and tutorials

### Support

- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time community support
- **Email**: support@arcane-treasury.dev

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FHEVM Team** for FHE implementation
- **RainbowKit** for wallet integration
- **shadcn/ui** for beautiful components
- **Vite Team** for the amazing build tool

---

<div align="center">

**Built with ❤️ by the Arcane Treasury Team**

[Website](https://arcane-treasury.dev) • [Documentation](https://docs.arcane-treasury.dev) • [Discord](https://discord.gg/arcane-treasury)

</div>