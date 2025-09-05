"use client";

import { useState } from "react";
import Link from "next/link";

interface Milestone {
  id: string;
  description: string;
  percentage: number;
}

const CreateProject = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    goal: "",
    seasonStartDate: "",
    projectDuration: "90", // in days (60-120 range)
    location: "",
    cropType: "",
    farmSize: "",
  });

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", description: "Land preparation and planting (Days 1-21)", percentage: 30 },
    { id: "2", description: "Growth monitoring and maintenance (Days 22-70)", percentage: 40 },
    { id: "3", description: "Harvest and post-harvest processing", percentage: 25 },
    { id: "4", description: "Marketing and sales completion", percentage: 5 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      description: "",
      percentage: 0,
    };
    setMilestones(prev => [...prev, newMilestone]);
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | number) => {
    setMilestones(prev => prev.map(milestone => (milestone.id === id ? { ...milestone, [field]: value } : milestone)));
  };

  const removeMilestone = (id: string) => {
    setMilestones(prev => prev.filter(milestone => milestone.id !== id));
  };

  const getTotalPercentage = () => {
    return milestones.reduce((sum, milestone) => sum + milestone.percentage, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (getTotalPercentage() !== 100) {
      alert("Milestone percentages must total exactly 100%");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock project creation - simulate API call
      console.log("Creating project:", {
        ...projectData,
        milestones,
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(
        "Quick-cycle project created successfully! Your 60-120 day farming project will be reviewed before going live.",
      );
      window.location.href = "/farmer";
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <Link href="/farmer" className="text-black font-medium">
              Farmer
            </Link>
            <Link href="/investor" className="text-gray-600 hover:text-black">
              Investor
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Create New Project</h1>
          <p className="text-gray-600">Set up a new farming project to receive funding from investors.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Project Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">📋 Project Details</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={projectData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="e.g., Organic Maize Farming - Season 2024"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={projectData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Describe your farming project, methods, expected outcomes, and how the funds will be used..."
                  maxLength={1000}
                />
                <p className="text-sm text-gray-500 mt-1">{projectData.description.length}/1000 characters</p>
              </div>

              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-2">
                  🌱 Crop Type *
                </label>
                <select
                  id="cropType"
                  name="cropType"
                  required
                  value={projectData.cropType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="">Select crop type for quick harvest</option>
                  <option value="maize">Maize (Short-Season)</option>
                  <option value="tomato">Tomato</option>
                  <option value="leafy-greens">Leafy Greens</option>
                  <option value="sweet-potato">Sweet Potato</option>
                  <option value="pepper">Pepper & Chili</option>
                  <option value="mushroom">Mushroom</option>
                  <option value="cassava">Cassava (Quick Varieties)</option>
                  <option value="vegetables">Mixed Vegetables</option>
                  <option value="herbs">Herbs & Spices</option>
                  <option value="other">Other (60-120 day cycle)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Only fast-maturing crops suitable for short cycles</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700 mb-2">
                    ⏱️ Project Duration (Days) *
                  </label>
                  <select
                    id="projectDuration"
                    name="projectDuration"
                    required
                    value={projectData.projectDuration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="60">60 days (2 months)</option>
                    <option value="75">75 days (2.5 months)</option>
                    <option value="90">90 days (3 months)</option>
                    <option value="100">100 days (3.3 months)</option>
                    <option value="120">120 days (4 months)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Only quick-cycle farming projects (2-4 months) are supported
                  </p>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={projectData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="e.g., Ashanti Region, Ghana"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                    💰 Funding Goal (USD) *
                  </label>
                  <input
                    type="number"
                    id="goal"
                    name="goal"
                    required
                    min="500"
                    max="25000"
                    value={projectData.goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="3500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Short-term projects: $500 - $25,000</p>
                </div>

                <div>
                  <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">
                    🌾 Farm Size (acres) *
                  </label>
                  <input
                    type="number"
                    id="farmSize"
                    name="farmSize"
                    required
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={projectData.farmSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="5.0"
                  />
                </div>

                <div>
                  <label htmlFor="seasonStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Project Start *
                  </label>
                  <input
                    type="date"
                    id="seasonStartDate"
                    name="seasonStartDate"
                    required
                    value={projectData.seasonStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // Max 90 days from now
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">Start within 90 days</p>
                </div>
              </div>

              {/* Project Timeline Display */}
              {projectData.seasonStartDate && projectData.projectDuration && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">📈 Project Timeline</h4>
                  <div className="text-sm text-blue-700">
                    <p>
                      <strong>Start Date:</strong> {new Date(projectData.seasonStartDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Duration:</strong> {projectData.projectDuration} days
                    </p>
                    <p>
                      <strong>Expected Completion:</strong>{" "}
                      {new Date(
                        new Date(projectData.seasonStartDate).getTime() +
                          parseInt(projectData.projectDuration) * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">🎯 Project Milestones</h2>
              <button
                type="button"
                onClick={addMilestone}
                className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors flex items-center gap-1"
              >
                ➕ Add Milestone
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Define milestones for fund disbursement. Total percentage must equal 100%.
            </p>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="bg-white border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700">Milestone {index + 1}</span>
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(milestone.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-4 gap-3">
                    <div className="md:col-span-3">
                      <input
                        type="text"
                        value={milestone.description}
                        onChange={e => updateMilestone(milestone.id, "description", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        placeholder="Describe this milestone..."
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={milestone.percentage}
                        onChange={e => updateMilestone(milestone.id, "percentage", parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        placeholder="25"
                        min="1"
                        max="100"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-md">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Percentage:</span>
                <span
                  className={`font-medium ${
                    getTotalPercentage() === 100
                      ? "text-green-600"
                      : getTotalPercentage() > 100
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {getTotalPercentage()}%
                </span>
              </div>
              {getTotalPercentage() !== 100 && (
                <p className="text-xs text-red-500 mt-1">Milestone percentages must total exactly 100%</p>
              )}
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-black mb-3">⚠️ Quick-Cycle Farming Projects</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                • <strong>Project Duration:</strong> 60-120 days only (2-4 months max)
              </p>
              <p>
                • <strong>Funding Range:</strong> $500 - $25,000 for short-term projects
              </p>
              <p>
                • <strong>Suitable Crops:</strong> Fast-maturing varieties only
              </p>
              <p>
                • <strong>Timeline:</strong> Must start within 90 days of approval
              </p>
              <p>
                • <strong>Updates Required:</strong> Weekly progress reports during growing cycle
              </p>
              <p>
                • <strong>Market Focus:</strong> Quick-turnaround crops with existing demand
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Link
              href="/farmer"
              className="flex-1 bg-white text-black border-2 border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || getTotalPercentage() !== 100}
              className="flex-1 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Creating Project..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
