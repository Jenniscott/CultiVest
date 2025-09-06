# � CultiVest

> **Decentralized Agriculture Investment Platform**

CultiVest is a blockchain-based platform that connects investors with farmers for quick-cycle agricultural projects (60-120 days). Built with Next.js, TypeScript, and smart contracts on Ethereum.

## 🚀 Features

- **Farmer Verification**: Complete KYC process for farmer onboarding
- **Project Creation**: Farmers can create time-bound agricultural projects
- **Investment Marketplace**: Investors can browse and fund projects
- **Milestone Tracking**: Project progress tracking with milestone-based fund release
- **Returns Management**: Automated return calculations and distributions
- **Demo Mode**: Full demonstration capabilities without blockchain interaction

## 📋 Prerequisites

Before running the application, ensure you have:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [Git](https://git-scm.com/)

## 🏃‍♂️ Quick Start - Frontend Only

Follow these steps to run the CultiVest frontend application:

### 1. Clone the Repository
```bash
git clone https://github.com/Jenniscott/CultiVest.git
cd CultiVest
```

### 2. Install Dependencies
```bash
# Install dependencies for the Next.js frontend
cd packages/nextjs
yarn install
```

### 3. Start the Development Server
```bash
# Start the Next.js development server
yarn dev
```

### 4. Open the Application
Visit [http://localhost:3000](http://localhost:3000) in your browser to access CultiVest.

## 🎭 Demo Features

The application runs in full demo mode by default, allowing you to:

### For Farmers:
- **Complete Verification Flow**: `/farmer/verify`
  - Fill out farmer verification form
  - Upload documents (any files work for demo)
  - Watch status change from "Form" → "Pending" → "Verified"
- **Create Projects**: `/farmer/create-project`
  - Set up quick-cycle agricultural projects
  - Define milestones and funding goals
- **Manage Projects**: View and track project progress

### For Investors:
- **Browse Projects**: `/projects`
  - View available investment opportunities
  - Filter by project type and status
- **Invest in Projects**: Click on any project to invest
  - Make investments with demo calculations
  - Track portfolio performance
- **Withdraw Returns**: `/investor/withdrawals`
  - View completed projects and returns
  - Process withdrawal requests

### Demo Reset:
- Use the "Reset Demo" buttons available in various sections
- Clear localStorage to restart demo flows
- Debug buttons allow testing different states

## 📱 Main Routes

- **Homepage**: `/` - Platform overview and navigation
- **Projects**: `/projects` - Browse all investment opportunities
- **Farmer Dashboard**: `/farmer` - Farmer project management
- **Investor Dashboard**: `/investor` - Investment portfolio
- **Verification**: `/farmer/verify` - Farmer verification process

## 🛠 Development

### Project Structure
```
packages/nextjs/
├── app/                    # Next.js app router pages
│   ├── farmer/            # Farmer-related pages
│   ├── investor/          # Investor-related pages
│   ├── projects/          # Project browsing and details
│   └── ...
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
└── styles/               # Global styles
```

### Key Features Implemented
- ✅ Complete farmer verification workflow
- ✅ Project creation and management
- ✅ Investment flow and tracking
- ✅ Returns calculation and withdrawal
- ✅ Responsive design for all devices
- ✅ Demo mode with realistic data
- ✅ localStorage persistence for demo states

### Environment Setup
The application runs in demo mode by default. No additional environment configuration is needed for frontend-only operation.

## 🎯 Demo Scenarios

### Complete Farmer Journey:
1. Visit `/farmer/verify`
2. Click "Fill Sample Data" for quick setup
3. Submit verification form
4. Watch automatic progression: Pending → Verified
5. Create your first project at `/farmer/create-project`

### Complete Investor Journey:
1. Visit `/projects` to browse opportunities
2. Click on any project to view details
3. Click "Invest Now" to make an investment
4. View your portfolio at `/investor`
5. Check returns at `/investor/withdrawals`

## 📝 Notes

- All data is mocked for demonstration purposes
- Smart contract integration is abstracted for demo mode
- Real blockchain functionality would require additional setup
- The platform is designed for quick-cycle agricultural projects (60-120 days)

## 🤝 Contributing

This project is built on Scaffold-ETH 2 framework. For development guidelines and contribution information, please refer to the development documentation.

---

**Built with:** Next.js • TypeScript • Tailwind CSS • React • Scaffold-ETH 2