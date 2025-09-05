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
    <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-no-repeat text-black">
      {/* Header */}
      <div className=" px-4 py-4 backdrop-blur-md  text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">CultiVest</span>
          </div>
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
    </div>
  );
};

export default Home;
