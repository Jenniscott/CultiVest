"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  farmer: string;
  location: string;
  goal: number;
  raised: number;
  status: string;
  deadline: string;
  minInvestment: number;
  expectedROI: number;
  riskLevel: "Low" | "Medium" | "High";
}

const InvestPage = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock project data - in real app this would be fetched from API
  const project: ProjectData = {
    id: projectId,
    title: "Short-Season Maize Cultivation (120 Days)",
    description:
      "Fast-growing maize variety cultivation for a complete 4-month cycle in Ashanti Region, Ghana. This quick-turnaround project uses hybrid seeds that mature in exactly 120 days, targeting premium market prices with guaranteed buyers lined up for immediate purchase upon harvest completion.",
    farmer: "Kwame Asante",
    location: "Ashanti, Ghana",
    goal: 3500,
    raised: 2800,
    status: "funding",
    deadline: "2025-12-15",
    minInvestment: 25,
    expectedROI: 18,
    riskLevel: "Medium",
  };

  const remaining = project.goal - project.raised;
  const progress = (project.raised / project.goal) * 100;

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investmentAmount);

    if (amount < project.minInvestment) {
      alert(`Minimum investment is $${project.minInvestment}`);
      return;
    }

    if (amount > remaining) {
      alert(`Cannot invest more than remaining amount: $${remaining}`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock investment process
      console.log("Processing investment:", {
        projectId,
        amount,
        timestamp: new Date().toISOString(),
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Investment successful! You have invested $${amount} in ${project.title}`);
      window.location.href = "/investor";
    } catch (error) {
      console.error("Investment error:", error);
      alert("Investment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateExpectedReturn = (amount: number) => {
    return (amount * project.expectedROI) / 100;
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
            <Link href="/investor" className="text-gray-600 hover:text-black">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/projects" className="hover:text-black">
              Projects
            </Link>
            <span>→</span>
            <Link href={`/projects/${projectId}`} className="hover:text-black">
              {project.title}
            </Link>
            <span>→</span>
            <span className="text-black">Invest</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Info */}
          <div>
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {project.status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-black mb-4">{project.title}</h1>
            <p className="text-gray-600 mb-4">
              by {project.farmer} • {project.location}
            </p>

            <p className="text-gray-700 mb-6">{project.description}</p>

            {/* Project Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Funding Goal</div>
                <div className="text-xl font-bold">${project.goal.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Raised So Far</div>
                <div className="text-xl font-bold text-green-600">${project.raised.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Expected ROI</div>
                <div className="text-xl font-bold text-green-600">{project.expectedROI}%</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Risk Level</div>
                <div
                  className={`text-xl font-bold ${
                    project.riskLevel === "Low"
                      ? "text-green-600"
                      : project.riskLevel === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {project.riskLevel}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Funding Progress</span>
                <span className="text-black font-medium">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-black h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">${remaining.toLocaleString()} remaining</div>
            </div>

            {/* Deadline */}
            <div className="text-sm text-gray-600">
              ⏰ Funding deadline: {new Date(project.deadline).toLocaleDateString()}
            </div>
          </div>

          {/* Investment Form */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold text-black mb-6">💰 Make an Investment</h2>

            <form onSubmit={handleInvest} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (USD) *
                </label>
                <input
                  type="number"
                  id="amount"
                  required
                  min={project.minInvestment}
                  max={remaining}
                  step="1"
                  value={investmentAmount}
                  onChange={e => setInvestmentAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-lg"
                  placeholder={`Min: $${project.minInvestment}`}
                />
                <div className="text-sm text-gray-600 mt-1">
                  Minimum: ${project.minInvestment} • Maximum: ${remaining.toLocaleString()}
                </div>
              </div>

              {/* Investment Preview */}
              {investmentAmount && !isNaN(parseFloat(investmentAmount)) && (
                <div className="bg-white p-4 rounded-md border">
                  <h3 className="font-semibold text-black mb-3">Investment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="font-medium">${parseFloat(investmentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Return ({project.expectedROI}%):</span>
                      <span className="font-medium text-green-600">
                        +${calculateExpectedReturn(parseFloat(investmentAmount)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Projected Total:</span>
                      <span className="text-green-600">
                        $
                        {(
                          parseFloat(investmentAmount) + calculateExpectedReturn(parseFloat(investmentAmount))
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Investment Risk</h4>
                <p className="text-sm text-yellow-700">
                  All investments carry risk. Agricultural investments are subject to weather, market, and other
                  factors. Past performance does not guarantee future returns.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href={`/projects/${projectId}`}
                  className="flex-1 bg-white text-black border-2 border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  Back to Project
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || !investmentAmount || parseFloat(investmentAmount) < project.minInvestment}
                  className="flex-1 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Processing..." : "Invest Now"}
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-black mb-2">How it works:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Funds are held in escrow until project milestones are met</li>
                <li>• Returns are distributed based on project success</li>
                <li>• You can track progress in your investor dashboard</li>
                <li>• All transactions are recorded for transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
