"use client";

import { useState } from "react";
import Link from "next/link";

interface InvestmentProject {
  id: string;
  title: string;
  description: string;
  farmer: string;
  goal: number;
  raised: number;
  investorCount: number;
  deadline: string;
  milestones: number;
  completedMilestones: number;
  status: "funding" | "in-progress" | "completed";
  myInvestment: number;
  estimatedReturn: number;
}

const InvestorDashboard = () => {
  // Mock data for available projects
  const [availableProjects] = useState<InvestmentProject[]>([
    {
      id: "1",
      title: "Organic Maize Farming - Season 2024",
      description: "Growing organic maize using sustainable farming practices in Ashanti Region, Ghana",
      farmer: "Kwame Asante",
      goal: 5000,
      raised: 3200,
      investorCount: 12,
      deadline: "2024-02-15",
      milestones: 4,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 0,
      estimatedReturn: 0,
    },
    {
      id: "2",
      title: "Cocoa Plantation Expansion",
      description: "Expanding cocoa plantation to increase yield and implement new farming techniques",
      farmer: "Ama Osei",
      goal: 8000,
      raised: 8000,
      investorCount: 24,
      deadline: "2024-01-20",
      milestones: 5,
      completedMilestones: 2,
      status: "in-progress",
      myInvestment: 500,
      estimatedReturn: 625,
    },
    {
      id: "3",
      title: "Cassava Processing Unit",
      description: "Setting up modern processing facility for value addition",
      farmer: "Joseph Amponsah",
      goal: 12000,
      raised: 4500,
      investorCount: 8,
      deadline: "2024-03-10",
      milestones: 6,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 0,
      estimatedReturn: 0,
    },
  ]);

  // Mock data for user's investments
  const myInvestments = availableProjects.filter(p => p.myInvestment > 0);

  const totalInvested = myInvestments.reduce((sum, project) => sum + project.myInvestment, 0);
  const totalEstimatedReturns = myInvestments.reduce((sum, project) => sum + project.estimatedReturn, 0);

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
            <Link href="/farmer" className="text-gray-600 hover:text-black">
              Farmer
            </Link>
            <Link href="/investor" className="text-black font-medium">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Investor Dashboard</h1>
          <p className="text-gray-600">Discover farming projects and track your investments.</p>
        </div>

        {/* Investment Summary */}
        {myInvestments.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invested</p>
                  <p className="text-2xl font-bold text-black">${totalInvested.toLocaleString()}</p>
                </div>
                <span className="text-2xl">💰</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estimated Returns</p>
                  <p className="text-2xl font-bold text-green-600">${totalEstimatedReturns.toLocaleString()}</p>
                </div>
                <span className="text-2xl">📈</span>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-black">{myInvestments.length}</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        )}

        {/* My Investments */}
        {myInvestments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">My Investments</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {myInvestments.map(project => (
                <div key={`my-${project.id}`} className="bg-white border-2 border-black rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
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
                    <div className="text-right">
                      <p className="text-sm text-gray-600">My Investment</p>
                      <p className="text-lg font-bold text-black">${project.myInvestment}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">By {project.farmer}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-black font-medium">
                          {project.completedMilestones} / {project.milestones} milestones
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${(project.completedMilestones / project.milestones) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected Return</span>
                      <span className="text-green-600 font-medium">${project.estimatedReturn}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/projects/${project.id}`}
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

        {/* Available Projects */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Available Projects</h2>
            <Link href="/projects" className="text-black hover:text-gray-600 text-sm font-medium">
              View All →
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {availableProjects.map(project => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
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
                  {project.status === "funding" && (
                    <div className="flex items-center text-xs text-gray-600">
                      ⏰ {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>

                <div className="flex items-center text-sm text-gray-600 mb-4">👤 {project.farmer}</div>

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
                        style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Investors</span>
                    <span className="text-black font-medium">{project.investorCount}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <Link href={`/projects/${project.id}`} className="text-black hover:text-gray-600 text-sm font-medium">
                    View Details
                  </Link>
                  {project.status === "funding" && (
                    <Link
                      href={`/projects/${project.id}/invest`}
                      className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      Invest
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {availableProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-bold text-black mb-2">No Projects Available</h3>
            <p className="text-gray-600">Check back later for new farming projects to invest in</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
