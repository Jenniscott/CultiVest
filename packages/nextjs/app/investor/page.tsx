"use client";

import { useState } from "react";
import Link from "next/link";
import { PopupMessage, usePopupMessage } from "~~/components/PopupMessage";

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
  availableForWithdrawal?: number; // Available returns to withdraw for completed projects
  image?: any;
}

const InvestorDashboard = () => {
  const { popup, showSuccess, showError, closePopup } = usePopupMessage();
  const [isWithdrawing, setIsWithdrawing] = useState<string | null>(null);
  // Mock data for available projects - realistic 3-6 month farm projects including livestock
  const [availableProjects, setAvailableProjects] = useState<InvestmentProject[]>([
    {
      id: "1",
      title: "Short-Season Maize Cultivation (120 Days)",
      description: "Fast-growing maize variety cultivation for a complete 4-month cycle targeting 5 tons/hectare yield",
      farmer: "Kwame Asante",
      goal: 3500,
      raised: 2800,
      investorCount: 14,
      deadline: "2025-12-15",
      milestones: 4,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 0,
      estimatedReturn: 0,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
    },
    {
      id: "2",
      title: "Broiler Chicken Farm (70 Days)",
      description: "Fast-growing broiler chickens from chicks to market weight in 10 weeks with established buyers",
      farmer: "Ama Osei",
      goal: 4500,
      raised: 4500,
      investorCount: 22,
      deadline: "2025-11-30",
      milestones: 3,
      completedMilestones: 1,
      status: "in-progress",
      myInvestment: 600,
      estimatedReturn: 780,
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop",
    },
    {
      id: "3",
      title: "Pig Fattening Operation (90 Days)",
      description: "Pig fattening from weaners to market weight in 3 months with quality feed program",
      farmer: "Akua Boateng",
      goal: 3800,
      raised: 2100,
      investorCount: 15,
      deadline: "2025-12-10",
      milestones: 3,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 400,
      estimatedReturn: 520,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
    },
    {
      id: "4",
      title: "Layer Chicken Egg Production (120 Days)",
      description: "Point-of-lay hens for immediate egg production targeting local markets and restaurants",
      farmer: "Abena Mensah",
      goal: 3600,
      raised: 2900,
      investorCount: 16,
      deadline: "2025-12-05",
      milestones: 4,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 0,
      estimatedReturn: 0,
      image: "https://images.unsplash.com/photo-1612170153139-6f881c5daa78?w=400&h=250&fit=crop",
    },
    {
      id: "5",
      title: "Goat Breeding Program (100 Days)",
      description: "Fast-growing goat breeds for meat production with premium festival market pricing",
      farmer: "Yaw Appiah",
      goal: 3200,
      raised: 1600,
      investorCount: 11,
      deadline: "2025-12-01",
      milestones: 4,
      completedMilestones: 0,
      status: "funding",
      myInvestment: 0,
      estimatedReturn: 0,
      image: "https://images.unsplash.com/photo-1551882680-70d6d33dc14d?w=400&h=250&fit=crop",
    },
    {
      id: "6",
      title: "Pepper & Tomato Hydroponic Farm (90 Days)",
      description: "High-value hydroponic vegetables completed successfully with premium market sales",
      farmer: "Kofi Mensah",
      goal: 2800,
      raised: 2800,
      investorCount: 15,
      deadline: "2025-08-15",
      milestones: 3,
      completedMilestones: 3,
      status: "completed",
      myInvestment: 500,
      estimatedReturn: 650,
      availableForWithdrawal: 650,
      image: "https://images.unsplash.com/photo-1592477725143-8a3b3c0a68e6?w=400&h=250&fit=crop",
    },
    {
      id: "7",
      title: "Sweet Potato Cultivation (110 Days)",
      description: "Successfully completed sweet potato farming project with guaranteed buyer contracts fulfilled",
      farmer: "Akua Boateng",
      goal: 3200,
      raised: 3200,
      investorCount: 18,
      deadline: "2025-07-20",
      milestones: 4,
      completedMilestones: 4,
      status: "completed",
      myInvestment: 400,
      estimatedReturn: 520,
      availableForWithdrawal: 520,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=250&fit=crop",
    },
  ]);

  // Mock data for user's investments
  const myInvestments = availableProjects.filter(p => p.myInvestment > 0);

  const totalInvested = myInvestments.reduce((sum, project) => sum + project.myInvestment, 0);
  const totalEstimatedReturns = myInvestments.reduce((sum, project) => sum + project.estimatedReturn, 0);
  const totalAvailableForWithdrawal = myInvestments.reduce(
    (sum, project) => sum + (project.availableForWithdrawal || 0),
    0,
  );

  const handleWithdraw = async (projectId: string, amount: number) => {
    if (isWithdrawing) return;

    setIsWithdrawing(projectId);

    try {
      // Mock withdrawal process - in real app this would call smart contract's claimReturns()
      console.log("Withdrawing returns:", {
        projectId,
        amount,
        timestamp: new Date().toISOString(),
      });

      // Simulate smart contract call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update the project data to remove available withdrawal amount
      setAvailableProjects(prevProjects =>
        prevProjects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              availableForWithdrawal: 0,
            };
          }
          return project;
        }),
      );

      showSuccess("Withdrawal Successful!", `Successfully withdrew $${amount} from your investment returns.`);
    } catch (error) {
      console.error("Withdrawal error:", error);
      showError("Withdrawal Failed", "Failed to withdraw funds. Please try again.");
    } finally {
      setIsWithdrawing(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">CultiVest</span>
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Investor Dashboard</h1>
              <p className="text-gray-600">Discover farming projects and track your investments.</p>
            </div>
            {totalAvailableForWithdrawal > 0 && (
              <Link
                href="/investor/withdrawals"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                💰 Withdraw Returns ($${totalAvailableForWithdrawal.toLocaleString()})
              </Link>
            )}
          </div>
        </div>

        {/* Investment Summary */}
        {myInvestments.length > 0 && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
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

            {totalAvailableForWithdrawal > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Available to Withdraw</p>
                    <p className="text-2xl font-bold text-green-600">${totalAvailableForWithdrawal.toLocaleString()}</p>
                  </div>
                  <span className="text-2xl">💸</span>
                </div>
              </div>
            )}

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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">My Investments</h2>
              {totalAvailableForWithdrawal > 0 && (
                <Link
                  href="/investor/withdrawals"
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  View All Withdrawals →
                </Link>
              )}
            </div>
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

                    {/* Show available withdrawal amount for completed projects */}
                    {project.status === "completed" &&
                      project.availableForWithdrawal &&
                      project.availableForWithdrawal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Available to Withdraw</span>
                          <span className="text-green-600 font-bold">${project.availableForWithdrawal}</span>
                        </div>
                      )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-black hover:text-gray-600 text-sm font-medium"
                    >
                      View Details →
                    </Link>

                    {/* Withdrawal button for completed projects */}
                    {project.status === "completed" &&
                      project.availableForWithdrawal &&
                      project.availableForWithdrawal > 0 && (
                        <button
                          onClick={() => handleWithdraw(project.id, project.availableForWithdrawal!)}
                          disabled={isWithdrawing === project.id}
                          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                          {isWithdrawing === project.id ? "Withdrawing..." : "💰 Withdraw Returns"}
                        </button>
                      )}
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
      <PopupMessage
        type={popup.type}
        title={popup.title}
        message={popup.message}
        isVisible={popup.isVisible}
        onClose={closePopup}
      />
    </div>
  );
};

export default InvestorDashboard;
