# FarmLink Setup Guide

## 🌾 **FarmLink: Decentralized Agricultural Financing Platform**

This guide will help you set up and run the complete FarmLink platform locally.

## 📋 **Prerequisites**

- Node.js 18+ and Yarn
- Git
- A Base testnet wallet with some ETH for gas
- Web3.storage account (for IPFS storage)
- Magic.link account (for email authentication)

## 🚀 **Quick Start**

### 1. Install Dependencies

```bash
# Install root dependencies
yarn install

# Install foundry dependencies
cd packages/foundry
yarn install

# Install nextjs dependencies
cd ../nextjs
yarn install
```

### 2. Environment Setup

**Quick Setup (Recommended):**
```bash
cd packages/nextjs
yarn setup
```

**Manual Setup:**
Create `.env.local` in `packages/nextjs/`:

```bash
# Magic.link API Keys (Already provided)
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_CBF2E32B12D6C923
MAGIC_SECRET_KEY=sk_live_D3E20D7474BC27FF

# JWT Secret for authentication
JWT_SECRET=farmlink-super-secret-jwt-key-2024

# Web3.storage API token for IPFS storage
WEB3_STORAGE_TOKEN=your-web3-storage-token-here

# Alchemy API key for Base network
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-api-key-here

# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=3a8170812b534d0ff9d794f19a901d64

# Smart Contract Addresses (will be populated after deployment)
NEXT_PUBLIC_FARMER_REGISTRY_ADDRESS=
NEXT_PUBLIC_FACTORY_ADDRESS=
NEXT_PUBLIC_MOCK_USDC_ADDRESS=
```

### 3. Deploy Smart Contracts

```bash
# Start local blockchain
yarn chain

# In another terminal, deploy contracts
yarn deploy

# Or deploy to Base testnet
cd packages/foundry
forge script script/CultiVest.s.sol --rpc-url https://sepolia.base.org --broadcast --verify
```

### 4. Start the Application

```bash
# Start the frontend
yarn start

# Or start both blockchain and frontend
yarn chain && yarn deploy && yarn start
```

## 🏗️ **Architecture Overview**

### Smart Contracts
- **FarmerRegistry**: Manages farmer verification status
- **FarmingProjectFactory**: Creates new project escrow contracts
- **ProjectEscrow**: Handles funding, milestones, and returns

### Frontend
- **Next.js 15** with App Router
- **Wagmi** for Ethereum interaction
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Backend API
- **Next.js API Routes** for backend logic
- **Web3.storage** for IPFS document storage
- **Magic.link** for email-based authentication
- **JWT** for session management

## 🔧 **Development Workflow**

### 1. Smart Contract Development
```bash
cd packages/foundry

# Run tests
forge test

# Deploy locally
forge script script/CultiVest.s.sol --fork-url http://localhost:8545 --broadcast

# Deploy to Base testnet
forge script script/CultiVest.s.sol --rpc-url https://sepolia.base.org --broadcast --verify
```

### 2. Frontend Development
```bash
cd packages/nextjs

# Start development server
yarn dev

# Build for production
yarn build

# Deploy to Vercel
yarn vercel
```

## 🧪 **Testing the Platform**

### Farmer Flow
1. Go to `/farmer`
2. Click "Get Verified"
3. Upload required documents
4. Submit verification
5. Create a new project
6. Set milestones and funding goal

### Investor Flow
1. Go to `/investor`
2. Browse available projects
3. Click on a project to view details
4. Invest in the project
5. Monitor milestone progress

## 🔐 **Security Features**

- **Multi-signature escrow** for fund releases
- **IPFS storage** for immutable document storage
- **ENS subdomains** for farmer identity
- **Milestone-based funding** with proof requirements
- **Automatic refunds** if funding goals aren't met

## 🌐 **Production Deployment**

### 1. Deploy Smart Contracts
```bash
# Deploy to Base mainnet
forge script script/CultiVest.s.sol --rpc-url https://mainnet.base.org --broadcast --verify
```

### 2. Deploy Frontend
```bash
# Deploy to Vercel
yarn vercel

# Or deploy to IPFS
yarn ipfs
```

### 3. Configure Environment
Update production environment variables with:
- Real Magic.link API keys
- Base mainnet contract addresses
- Production Web3.storage token

## 📚 **Key Features**

### For Farmers
- **Email-based authentication** (no seed phrases)
- **Document verification** with IPFS storage
- **ENS subdomain identity** (e.g., `kwame.farmlink.eth`)
- **Milestone-based funding** with proof submission
- **Transparent project management**

### For Investors
- **Browse verified projects** with detailed information
- **Track milestone progress** with proof verification
- **Secure investment** with escrow protection
- **Automatic returns** distribution
- **Refund protection** if goals aren't met

## 🛠️ **Troubleshooting**

### Common Issues

1. **Contract deployment fails**
   - Check RPC URL and private key
   - Ensure sufficient ETH for gas

2. **Frontend can't connect to contracts**
   - Verify contract addresses in environment
   - Check network configuration

3. **IPFS upload fails**
   - Verify Web3.storage token
   - Check file size limits

4. **Magic.link authentication fails**
   - Verify API keys
   - Check domain configuration

## 📞 **Support**

For issues or questions:
- Check the GitHub issues
- Join our Discord community
- Email: support@farmlink.eth

## 🎯 **Roadmap**

- [ ] **Phase 1**: Core platform (Current)
- [ ] **Phase 2**: Mobile money integration
- [ ] **Phase 3**: AI-powered verification
- [ ] **Phase 4**: DAO governance
- [ ] **Phase 5**: Cross-chain expansion

---

**FarmLink** - Empowering farmers with decentralized funding, one harvest at a time. 🌱
