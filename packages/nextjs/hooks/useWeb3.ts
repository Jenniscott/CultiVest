import { useEffect, useState } from "react";
import { useMagic } from "~~/contexts/MagicProvider";

// Simple Web3 interface for Magic integration
export interface Web3Instance {
  getBalance: (address: string) => Promise<string>;
  sendTransaction: (tx: any) => Promise<any>;
  getAccounts: () => Promise<string[]>;
  signMessage: (message: string) => Promise<string>;
  signTransaction: (tx: any) => Promise<any>;
}

const useWeb3 = () => {
  const { magic, isMagicReady } = useMagic();
  const [web3, setWeb3] = useState<Web3Instance | null>(null);

  useEffect(() => {
    if (magic && isMagicReady) {
      const web3Instance: Web3Instance = {
        getBalance: async (address: string) => {
          console.log("Getting balance for:", address);
          // Get balance using Magic's RPC provider
          const balance = await magic.wallet.getBalance();
          return balance.toString();
        },
        sendTransaction: async (tx: any) => {
          // Send transaction using Magic
          return await magic.wallet.sendTransaction(tx);
        },
        getAccounts: async () => {
          // Get user's wallet address
          const metadata = await magic.user.getInfo();
          return [metadata.publicAddress];
        },
        signMessage: async (message: string) => {
          // Sign message using Magic
          return await magic.wallet.signMessage(message);
        },
        signTransaction: async (tx: any) => {
          // Sign transaction using Magic
          return await magic.wallet.signTransaction(tx);
        },
      };

      setWeb3(web3Instance);
    } else {
      setWeb3(null);
    }
  }, [magic, isMagicReady]);

  return { web3, isMagicReady };
};

export default useWeb3;
