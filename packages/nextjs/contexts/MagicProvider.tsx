"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Magic as MagicBase } from "magic-sdk";

export type Magic = MagicBase;

type MagicContextType = {
  magic: Magic | null;
  isMagicReady: boolean;
};

const MagicContext = createContext<MagicContextType>({
  magic: null,
  isMagicReady: false,
});

export const useMagic = () => {
  const context = useContext(MagicContext);
  if (!context) {
    throw new Error("useMagic must be used within a MagicProvider");
  }
  return context;
};

const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null);
  const [isMagicReady, setIsMagicReady] = useState(false);

  useEffect(() => {
    const initMagic = async () => {
      try {
        if (process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
          const magicInstance = new MagicBase(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string, {
            network: {
              rpcUrl: "https://sepolia.base.org", // Base Sepolia testnet
              chainId: 84532, // Base Sepolia chain ID
            },
          });

          setMagic(magicInstance);
        } else {
          console.warn("Magic Publishable Key not found in environment variables");
        }
      } catch (error) {
        console.error("Failed to initialize Magic:", error);
      } finally {
        setIsMagicReady(true);
      }
    };

    initMagic();
  }, []);

  const value = useMemo(() => {
    return {
      magic,
      isMagicReady,
    };
  }, [magic, isMagicReady]);

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>;
};

export default MagicProvider;
