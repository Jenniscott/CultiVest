"use client";

import { useState } from "react";
import Link from "next/link";

const Home = () => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"farmer" | "investor" | null>(null);

  const handleLogin = () => {
    if (selectedRole && email) {
      window.location.href = `/${selectedRole}`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-black">FarmLink</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/projects" className="text-gray-600 hover:text-black">
              Projects
            </Link>
            <Link href="/farmer" className="text-gray-600 hover:text-black">
              Farmer
            </Link>
            <Link href="/investor" className="text-gray-600 hover:text-black">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 text-black">🌱 FarmLink</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Agricultural Investment Platform - Connect vetted farmers with global investors for sustainable agricultural
          projects.
        </p>

        {/* Login Form */}
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg">
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
            <p className="text-sm font-medium text-gray-700 mb-3">I am a:</p>
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

          <button
            onClick={handleLogin}
            disabled={!email || !selectedRole}
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-300"
          >
            Continue
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How FarmLink Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">1. Farmers Apply</h3>
              <p className="text-gray-600">
                Farmers submit project proposals with detailed plans and funding requirements
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">2. Verification</h3>
              <p className="text-gray-600">
                Projects undergo vetting including farmer credentials and project viability
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">3. Investment</h3>
              <p className="text-gray-600">
                Verified projects receive funding and progress is tracked through milestones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
