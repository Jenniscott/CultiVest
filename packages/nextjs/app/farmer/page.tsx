"use client";

import { useState } from "react";
import Link from "next/link";

interface FarmerProject {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  status: "funding" | "in-progress" | "completed";
  milestones: number;
  completedMilestones: number;
}

const FarmerDashboard = () => {
  // Mock user verification status - in real app this would come from backend
  const [vettingStatus, setVettingStatus] = useState<"none" | "pending" | "approved">("none");

  // Mock data - only show projects if farmer is verified
  const [projects] = useState<FarmerProject[]>(
    vettingStatus === "approved"
      ? [
          {
            id: "1",
            title: "Organic Maize Farming - Season 2024",
            description: "Growing organic maize using sustainable farming practices",
            goal: 5000,
            raised: 3200,
            status: "funding",
            milestones: 4,
            completedMilestones: 0,
          },
          {
            id: "2",
            title: "Cocoa Plantation Expansion",
            description: "Expanding cocoa plantation to increase yield",
            goal: 8000,
            raised: 8000,
            status: "in-progress",
            milestones: 5,
            completedMilestones: 2,
          },
        ]
      : [],
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "none":
        return "❌";
      case "pending":
        return "⏳";
      case "approved":
        return "✅";
      default:
        return "❌";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "none":
        return "Not Verified - Get verified to create projects";
      case "pending":
        return "Verification in Progress - Documents under review";
      case "approved":
        return "Verified Farmer - You can create projects";
      default:
        return "Unknown Status";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">FarmLink</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/projects" className="text-gray-600 hover:text-black">
              Projects
            </Link>
            <Link href="/farmer" className="text-black font-medium">
              Farmer
            </Link>
            <Link href="/investor" className="text-gray-600 hover:text-black">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back! Manage your projects and track your progress.</p>
        </div>

        {/* Verification Status */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl">{getStatusIcon(vettingStatus)}</span>
            <div>
              <h3 className="text-lg font-semibold text-black">Verification Status</h3>
              <p className="text-gray-600">{getStatusText(vettingStatus)}</p>
            </div>
          </div>

          {vettingStatus === "none" && (
            <Link
              href="/farmer/verify"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              📄 Get Verified
            </Link>
          )}

          {vettingStatus === "approved" && (
            <Link
              href="/farmer/create-project"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              ➕ Create New Project
            </Link>
          )}

          {/* Debug buttons to test verification states */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Debug: Test verification states</p>
            <div className="flex gap-2">
              <button
                onClick={() => setVettingStatus("none")}
                className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded"
              >
                Not Verified
              </button>
              <button
                onClick={() => setVettingStatus("pending")}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
              >
                Pending
              </button>
              <button
                onClick={() => setVettingStatus("approved")}
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded"
              >
                Approved
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid - Only show if verified */}
        {vettingStatus === "approved" && projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Your Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div
                  key={project.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
                >
                  <div className="mb-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        project.status === "funding"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Funding Progress</span>
                        <span className="text-black font-medium">
                          ${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${(project.raised / project.goal) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Milestones</span>
                      <span className="text-black font-medium">
                        {project.completedMilestones} / {project.milestones} completed
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/farmer/project/${project.id}`}
                      className="text-black hover:text-gray-600 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State for verified farmers */}
        {vettingStatus === "approved" && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-black mb-2">No Projects Yet</h3>
            <p className="text-gray-600 mb-6">Create your first farming project to get started</p>
            <Link
              href="/farmer/create-project"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              ➕ Create Your First Project
            </Link>
          </div>
        )}

        {/* Message for unverified farmers */}
        {vettingStatus !== "approved" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-black mb-2">Verification Required</h3>
            <p className="text-gray-600 mb-6">You need to be verified before you can create and manage projects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
