"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMagic } from "./MagicProvider";
import { User } from "~~/types/farmlink";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: "farmer" | "investor") => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { magic, isMagicReady } = useMagic();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!magic || !isMagicReady) {
        setIsLoading(false);
        return;
      }

      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          const metadata = await magic.user.getInfo();
          // Try to get role from localStorage first for faster loading
          const savedRole = localStorage.getItem("userRole") as "farmer" | "investor" | null;
          const userData: User = {
            address: metadata.publicAddress,
            email: metadata.email || undefined,
            role: savedRole,
            isVetted: false,
          };
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [magic, isMagicReady]);

  const login = async (email: string, role: "farmer" | "investor"): Promise<boolean> => {
    if (!magic) {
      console.error("Magic not initialized");
      // For development, create a mock user
      const mockUser: User = {
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        email: email,
        role: role,
        isVetted: false,
      };
      setUser(mockUser);
      // Save role to localStorage for faster subsequent loads
      localStorage.setItem("userRole", role);
      return true;
    }

    setIsLoading(true);
    try {
      // Use Magic's email OTP authentication
      const didToken = await magic.auth.loginWithMagicLink({ email });

      if (didToken) {
        // Get user metadata
        const metadata = await magic.user.getInfo();
        const userData: User = {
          address: metadata.publicAddress,
          email: metadata.email || email,
          role: role,
          isVetted: false,
        };

        setUser(userData);

        // Save role to localStorage for faster subsequent loads
        localStorage.setItem("userRole", role);

        // Send DID token to backend for verification
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              didToken,
              address: metadata.publicAddress,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log("Backend authentication successful:", result);
          }
        } catch (error) {
          console.error("Backend authentication failed:", error);
          // Continue with frontend login even if backend fails
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Magic login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (!magic) return;

    try {
      await magic.user.logout();
      setUser(null);
      // Clear localStorage
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Magic logout error:", error);
    }
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
