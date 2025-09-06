"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "~~/contexts/AuthContext";
import { useImmediateRedirect } from "~~/hooks/useRedirect";

const Home = () => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"farmer" | "investor" | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated, user, isLoading } = useAuth();
  const { redirectToRole } = useImmediateRedirect();

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role) {
      // Use optimized redirect hook for instant navigation
      redirectToRole(user.role);
    }
  }, [isAuthenticated, user, isLoading, redirectToRole]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-no-repeat flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading state while logging in
  if (isLoggingIn) {
    return (
      <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-no-repeat flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Logging you in...</p>
        </div>
      </div>
    );
  }

  const handleLogin = async () => {
    if (!selectedRole || !email) {
      setError("Please select a role and enter your email");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {
      const success = await login(email, selectedRole);
      if (success) {
        // Use optimized redirect for instant navigation
        redirectToRole(selectedRole);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-no-repeat text-black">
      {/* Header */}
      <div className=" px-4 py-4 backdrop-blur-md  text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">CultiVest</span>
          </Link>
          <nav className="flex gap-6 text-white">
            <Link href="/projects" className="">
              Projects
            </Link>
            <Link href="/farmer" className="text-white font-medium">
              Farmer
            </Link>
            <Link href="/investor" className="text-white font-medium">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">🌱 CultiVest</h1>
        <p className="text-[32px] text-white mb-8 max-w-2xl mx-auto">
          Agricultural Investment Platform - Connect vetted farmers with global investors for sustainable agricultural
          projects.
        </p>

        {/* Login Form */}
        <div className="max-w-md mx-auto backdrop-blur-xl p-8 rounded-xl text-white/80">
          <h2 className="text-2xl font-bold mb-6">Get Started</h2>

          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-3">I am a:</p>
            <div className="flex gap-4">
              <button
                className={`flex-1 px-4 py-3 rounded-md border ${
                  selectedRole === "farmer" ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedRole("farmer")}
              >
                Farmer
              </button>
              <button
                className={`flex-1 px-4 py-3 rounded-md border ${
                  selectedRole === "investor" ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedRole("investor")}
              >
                Investor
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm">{error}</div>
          )}

          <button
            onClick={handleLogin}
            disabled={!email || !selectedRole || isLoggingIn}
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoggingIn ? "Logging in..." : "Continue"}
          </button>
        </div>
      </div>

      {/* How it Works */}
    </div>
  );
};

export default Home;
