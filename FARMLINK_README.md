# FarmLink - Decentralized Agricultural Financing Platform

## Overview
FarmLink is a decentralized platform built on the Base network that connects vetted farmers with global investors. The platform abstracts away blockchain complexity and provides a seamless user experience for both farmers seeking funding and investors looking to support sustainable agriculture.

## Features Implemented

### 🎨 **Frontend (Next.js + TailwindCSS)**

#### **1. Landing Page (`/`)**
- Clean black and white theme
- Email-based login interface (Magic.link integration ready)
- Role selection (Farmer vs Investor)
- How it works section
- Responsive design

#### **2. Farmer Dashboard (`/farmer`)**
- Verification status tracking
- Project management
- Progress tracking with milestones
- Funding progress indicators
- Create new project functionality

#### **3. Farmer Verification (`/farmer/verify`)**
- Document upload interface
- Personal information forms
- Bio and farm description
- Verification process explanation

#### **4. Project Creation (`/farmer/create-project`)**
- Comprehensive project setup form
- Dynamic milestone management
- Funding goal setting
- Season planning
- Percentage-based milestone distribution

#### **5. Investor Dashboard (`/investor`)**
- Portfolio overview with statistics
- Available projects discovery
- Investment tracking
- Return calculations
- Risk assessments

#### **6. Projects Listing (`/projects`)**
- Searchable project directory
- Advanced filtering (status, category, location)
- Project cards with key metrics
- Investment opportunities

#### **7. Project Details (`/projects/[id]`)**
- Detailed project information
- Farmer profile and verification status
- Milestone tracking with progress indicators
- Investment interface
- Risk and return information

### 🎯 **Design System**

#### **Theme**
- **Primary Colors**: Black (#000000) and White (#ffffff)
- **Accent Colors**: Various grays for hierarchy
- **Success**: Green for positive actions
- **Warning**: Yellow for pending states
- **Error**: Red for negative states

#### **Components**
- Clean, minimalist cards with border-based design
- Consistent button styles with hover states
- Progress bars for funding and milestone tracking
- Status badges with semantic colors
- Responsive grid layouts
- Mobile-first approach

### 🛠 **Technical Stack**

#### **Frontend**
- **Next.js 15.2.5** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Heroicons** - Icon system

#### **Blockchain Integration Ready**
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection
- **Viem** - TypeScript interface for Ethereum
- Mock implementations for development

### 📱 **User Experience**

#### **Farmer Journey**
1. **Onboarding**: Connect wallet → Get verified → Create projects
2. **Project Management**: Track milestones → Submit proof → Receive funding
3. **Community**: Build reputation through successful projects

#### **Investor Journey**
1. **Discovery**: Browse projects → Filter by criteria → View details
2. **Investment**: Analyze risk → Make investment → Track progress
3. **Returns**: Receive proportional returns → Reinvest or withdraw

### 🔗 **Smart Contract Integration Points**

The frontend is designed to integrate with the following smart contracts:

1. **FarmerRegistry.sol** - Farmer verification management
2. **FarmingProjectFactory.sol** - Project creation and deployment
3. **ProjectEscrow.sol** - Individual project funding and milestone management

### 🚀 **Features Ready for Implementation**

#### **Backend Integration**
- Magic.link authentication
- ENS subdomain registration
- IPFS document storage
- Multi-signature transaction handling
- Milestone verification system

#### **Smart Contract Calls**
- Farmer verification (`vetFarmer`)
- Project creation (`createProject`)
- Investment transactions (`invest`)
- Milestone fund releases (`releaseMilestoneFunds`)
- Return distributions (`payReturns`)

### 📦 **File Structure**

```
packages/nextjs/
├── app/
│   ├── farmer/
│   │   ├── page.tsx                 # Farmer dashboard
│   │   ├── verify/page.tsx          # Verification form
│   │   └── create-project/page.tsx  # Project creation
│   ├── investor/
│   │   └── page.tsx                 # Investor dashboard
│   ├── projects/
│   │   ├── page.tsx                 # Projects listing
│   │   └── [id]/page.tsx           # Project details
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing page
├── components/
│   ├── Header.tsx                   # Navigation
│   └── Footer.tsx                   # Footer
├── hooks/
│   └── mockHooks.ts                 # Development mocks
├── types/
│   └── farmlink.ts                  # TypeScript definitions
└── styles/
    └── globals.css                  # Global styles
```

### 🌐 **Development Setup**

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Start Development Server**:
   ```bash
   cd packages/nextjs
   yarn dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:3001
   - All routes are functional with mock data

### 🎯 **Next Steps for Production**

1. **Smart Contract Deployment**
   - Deploy contracts to Base network
   - Configure contract addresses
   - Set up multi-signature wallets

2. **Backend Implementation**
   - Node.js/Express API server
   - Magic.link integration
   - IPFS integration with Web3.storage
   - ENS subdomain management
   - Multi-signature transaction handling

3. **Real Blockchain Integration**
   - Replace mock hooks with real Wagmi hooks
   - Configure RainbowKit for Base network
   - Implement actual transaction flows

4. **Additional Features**
   - Real-time notifications
   - Email alerts for milestones
   - Mobile app using React Native
   - Analytics dashboard
   - KYC/AML compliance

### 🔐 **Security Considerations**

- Multi-signature escrow contracts
- Farmer verification process
- Document authenticity checks
- Milestone proof verification
- Investor protection mechanisms

---

**Built with ❤️ using Scaffold-ETH 2**
**Powered by Base Network**