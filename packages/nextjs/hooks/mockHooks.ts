import { useEffect, useState } from "react";

// Mock hook to simulate blockchain connection
export const useAccount = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simulate wallet connection
    const timeout = setTimeout(() => {
      setIsConnected(true);
      setAddress("0x1234567890123456789012345678901234567890");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    address,
    isConnected,
  };
};

// Mock navigation hooks
export const useRouter = () => ({
  push: (path: string) => {
    console.log("Navigate to:", path);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
    }
  },
  back: () => {
    console.log("Navigate back");
    if (typeof window !== "undefined") {
      window.history.back();
    }
  },
});

export const useParams = () => ({
  id: "1", // Mock project ID
});
