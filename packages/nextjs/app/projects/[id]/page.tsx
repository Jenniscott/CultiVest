"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
// import { useParams, useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import { useAccount, useParams, useRouter } from "~~/hooks/mockHooks";

interface Milestone {
  id: number;
  description: string;
  percentage: number;
  status: "pending" | "submitted" | "completed";
  proofCID?: string;
  completedAt?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  farmer: string;
  farmerENS?: string;
  goal: number;
  raised: number;
  investorCount: number;
  deadline: string;
  seasonStartDate: string;
  status: "funding" | "in-progress" | "completed";
  category: string;
  location: string;
  milestones: Milestone[];
  documentCID?: string;
}

const ProjectDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isConnected } = useAccount();
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isInvesting, setIsInvesting] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);

  // Mock project data - in real app, fetch based on ID
  const project: Project = {
    id: id as string,
    title: "Organic Maize Farming - Season 2024",
    description:
      "This comprehensive farming project focuses on growing organic maize using sustainable and environmentally friendly practices in the fertile lands of Ashanti Region, Ghana. Our approach combines traditional farming wisdom with modern agricultural techniques to maximize yield while preserving soil health and biodiversity. The project includes land preparation, organic seed selection, natural pest control methods, and sustainable irrigation systems. We are committed to producing high-quality organic maize that meets international standards while supporting local food security and creating employment opportunities in rural communities.",
    farmer: "0x1234...5678",
    farmerENS: "kwame.farmlink.eth",
    goal: 5000,
    raised: 3200,
    investorCount: 12,
    deadline: "2024-02-15",
    seasonStartDate: "2024-01-15",
    status: "funding",
    category: "maize",
    location: "Ashanti Region, Ghana",
    milestones: [
      {
        id: 1,
        description: "Land preparation and seed planting",
        percentage: 25,
        status: "pending",
      },
      {
        id: 2,
        description: "Mid-season care and maintenance",
        percentage: 35,
        status: "pending",
      },
      {
        id: 3,
        description: "Harvest and initial processing",
        percentage: 25,
        status: "pending",
      },
      {
        id: 4,
        description: "Final processing and sales",
        percentage: 15,
        status: "pending",
      },
    ],
  };

  const handleInvestment = async () => {
    if (!investmentAmount || parseFloat(investmentAmount) <= 0) {
      alert("Please enter a valid investment amount");
      return;
    }

    setIsInvesting(true);
    try {
      // Mock investment transaction
      console.log("Investing:", investmentAmount, "in project:", project.id);

      // In real implementation, this would call the smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Successfully invested $${investmentAmount} in ${project.title}`);
      setShowInvestmentForm(false);
      setInvestmentAmount("");
    } catch (error) {
      console.error("Investment failed:", error);
      alert("Investment failed. Please try again.");
    } finally {
      setIsInvesting(false);
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "submitted":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-black hover:text-gray-600 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    project.status === "funding"
                      ? "bg-blue-100 text-blue-800"
                      : project.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {project.status.replace("-", " ").toUpperCase()}
                </span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {project.category.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-black mb-4">{project.title}</h1>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  {project.farmerENS || project.farmer}
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {project.location}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Season starts: {new Date(project.seasonStartDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Project Description</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Milestones */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Project Milestones</h2>
              <div className="space-y-4">
                {project.milestones.map(milestone => (
                  <div key={milestone.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getMilestoneIcon(milestone.status)}
                        <span className="font-medium text-black">Milestone {milestone.id}</span>
                        <span className="text-sm text-gray-600">({milestone.percentage}% of funds)</span>
                      </div>
                      {milestone.completedAt && (
                        <span className="text-sm text-gray-500">Completed: {milestone.completedAt}</span>
                      )}
                    </div>
                    <p className="text-gray-700 ml-8">{milestone.description}</p>
                    {milestone.status === "submitted" && (
                      <div className="ml-8 mt-2">
                        <span className="text-sm text-yellow-600">Proof submitted - under review</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm text-gray-600">Funding Progress</span>
                  <span className="text-sm text-gray-600">{Math.round((project.raised / project.goal) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-black h-3 rounded-full"
                    style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Raised</span>
                  <span className="font-medium text-black">${project.raised.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal</span>
                  <span className="font-medium text-black">${project.goal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investors</span>
                  <span className="font-medium text-black">{project.investorCount}</span>
                </div>
                {project.status === "funding" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days left</span>
                    <span className="font-medium text-black">
                      {daysUntilDeadline > 0 ? daysUntilDeadline : "Expired"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Investment Form */}
            {project.status === "funding" && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                {!isConnected ? (
                  <div className="text-center">
                    <h3 className="font-semibold text-black mb-2">Ready to Invest?</h3>
                    <p className="text-sm text-gray-600 mb-4">Connect your wallet to invest in this project</p>
                  </div>
                ) : !showInvestmentForm ? (
                  <div className="text-center">
                    <h3 className="font-semibold text-black mb-2">Support This Project</h3>
                    <p className="text-sm text-gray-600 mb-4">Invest in sustainable farming and earn returns</p>
                    <button
                      onClick={() => setShowInvestmentForm(true)}
                      className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                    >
                      <CurrencyDollarIcon className="h-5 w-5 inline mr-2" />
                      Invest Now
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-black mb-4">Make Investment</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (USD)</label>
                        <input
                          type="number"
                          min="10"
                          step="10"
                          value={investmentAmount}
                          onChange={e => setInvestmentAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                          placeholder="100"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum investment: $10</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowInvestmentForm(false)}
                          className="flex-1 bg-white text-black border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleInvestment}
                          disabled={isInvesting || !investmentAmount}
                          className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isInvesting ? "Processing..." : "Invest"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Stats */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4">Project Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600 block">Project ID</span>
                  <span className="font-mono text-black">{project.id}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Farmer Address</span>
                  <span className="font-mono text-black text-xs">{project.farmer}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Expected ROI</span>
                  <span className="text-green-600 font-medium">12-18% annually</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Risk Level</span>
                  <span className="text-yellow-600 font-medium">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
