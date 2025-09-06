"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PopupMessage, usePopupMessage } from "~~/components/PopupMessage";

interface CompletedProject {
  id: string;
  title: string;
  description: string;
  farmer: string;
  completedDate: string;
  myInvestment: number;
  totalReturns: number;
  availableForWithdrawal: number;
  roi: number;
}

const WithdrawalsPage = () => {
  const { popup, showSuccess, showError, closePopup } = usePopupMessage();
  const [isWithdrawing, setIsWithdrawing] = useState<string | null>(null);
  const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([
    {
      id: "6",
      title: "Pepper & Tomato Hydroponic Farm (90 Days)",
      description: "High-value hydroponic vegetables completed successfully with premium market sales",
      farmer: "Kofi Mensah",
      completedDate: "2025-08-15",
      myInvestment: 500,
      totalReturns: 650,
      availableForWithdrawal: 650,
      roi: 30,
    },
    {
      id: "7",
      title: "Sweet Potato Cultivation (110 Days)",
      description: "Successfully completed sweet potato farming project with guaranteed buyer contracts fulfilled",
      farmer: "Akua Boateng",
      completedDate: "2025-07-20",
      myInvestment: 400,
      totalReturns: 520,
      availableForWithdrawal: 520,
      roi: 30,
    },
    {
      id: "8",
      title: "Mushroom Production Cycle (75 Days)",
      description: "Oyster mushroom cultivation completed with excellent yields and restaurant sales",
      farmer: "Yaw Appiah",
      completedDate: "2025-06-30",
      myInvestment: 300,
      totalReturns: 390,
      availableForWithdrawal: 390,
      roi: 30,
    },
  ]);

  const totalAvailableWithdrawals = completedProjects.reduce((sum, project) => sum + project.availableForWithdrawal, 0);
  const totalInvestment = completedProjects.reduce((sum, project) => sum + project.myInvestment, 0);
  const totalReturns = completedProjects.reduce((sum, project) => sum + project.totalReturns, 0);

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
      setCompletedProjects(prevProjects =>
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

  const handleWithdrawAll = async () => {
    if (isWithdrawing || totalAvailableWithdrawals === 0) return;

    setIsWithdrawing("all");

    try {
      console.log("Withdrawing all returns:", {
        totalAmount: totalAvailableWithdrawals,
        projectCount: completedProjects.filter(p => p.availableForWithdrawal > 0).length,
        timestamp: new Date().toISOString(),
      });

      // Simulate smart contract call for batch withdrawal
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update all projects to remove available withdrawal amounts
      setCompletedProjects(prevProjects =>
        prevProjects.map(project => ({
          ...project,
          availableForWithdrawal: 0,
        })),
      );

      showSuccess(
        "Bulk Withdrawal Successful!",
        `Successfully withdrew $${totalAvailableWithdrawals} from all completed projects.`,
      );
    } catch (error) {
      console.error("Bulk withdrawal error:", error);
      showError("Bulk Withdrawal Failed", "Failed to withdraw funds. Please try again.");
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/investor" className="hover:text-black flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Investor Dashboard
            </Link>
            <span>→</span>
            <span className="text-black">Withdrawals</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">💰 Withdraw Returns</h1>
          <p className="text-gray-600">Withdraw your investment returns from completed projects.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-black">${totalInvestment.toLocaleString()}</p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Total Returns</p>
                <p className="text-2xl font-bold text-green-600">${totalReturns.toLocaleString()}</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Available to Withdraw</p>
                <p className="text-2xl font-bold text-blue-600">${totalAvailableWithdrawals.toLocaleString()}</p>
              </div>
              <span className="text-2xl">💸</span>
            </div>
          </div>
        </div>

        {/* Bulk Withdrawal Button */}
        {totalAvailableWithdrawals > 0 && (
          <div className="mb-8">
            <button
              onClick={handleWithdrawAll}
              disabled={isWithdrawing === "all"}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
            >
              {isWithdrawing === "all"
                ? "Processing Withdrawal..."
                : `💸 Withdraw All Returns ($${totalAvailableWithdrawals.toLocaleString()})`}
            </button>
          </div>
        )}

        {/* Completed Projects */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">Completed Projects</h2>
            <span className="text-sm text-gray-600">{completedProjects.length} projects</span>
          </div>

          {completedProjects.map(project => (
            <div key={project.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      COMPLETED
                    </span>
                    <span className="text-sm text-gray-600">
                      Completed: {new Date(project.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600">By {project.farmer}</p>
                </div>
              </div>

              {/* Investment Details */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">My Investment</div>
                  <div className="text-lg font-bold text-black">${project.myInvestment}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-700">Total Returns</div>
                  <div className="text-lg font-bold text-green-600">${project.totalReturns}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-700">ROI Achieved</div>
                  <div className="text-lg font-bold text-blue-600">{project.roi}%</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-700">Available</div>
                  <div className="text-lg font-bold text-yellow-600">${project.availableForWithdrawal}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <Link href={`/projects/${project.id}`} className="text-black hover:text-gray-600 text-sm font-medium">
                  View Project Details →
                </Link>

                {project.availableForWithdrawal > 0 ? (
                  <button
                    onClick={() => handleWithdraw(project.id, project.availableForWithdrawal)}
                    disabled={isWithdrawing === project.id}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isWithdrawing === project.id ? "Withdrawing..." : `💰 Withdraw $${project.availableForWithdrawal}`}
                  </button>
                ) : (
                  <span className="text-green-600 font-medium px-6 py-2">✅ Already Withdrawn</span>
                )}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {completedProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-black mb-2">No Completed Projects</h3>
              <p className="text-gray-600">Your investment returns will appear here when projects are completed.</p>
            </div>
          )}
        </div>
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

export default WithdrawalsPage;
