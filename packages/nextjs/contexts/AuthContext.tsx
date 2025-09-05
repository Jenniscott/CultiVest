"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { User } from "~~/types/farmlink";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      // Mock user data - in real implementation, fetch from backend
      const mockUser: User = {
        address,
        role: null,
        isVetted: false,
      };
      setUser(mockUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [address, isConnected]);

  const login = async (email: string) => {
    setIsLoading(true);
    // Mock Magic.link integration
    // In real implementation: magic.auth.loginWithMagicLink({ email })
    console.log("Mock login with email:", email);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
