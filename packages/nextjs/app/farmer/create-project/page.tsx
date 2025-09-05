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
    location: "",
    cropType: "",
    farmSize: "",
  });

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", description: "Land preparation and seed planting", percentage: 25 },
    { id: "2", description: "Mid-season care and maintenance", percentage: 35 },
    { id: "3", description: "Harvest and initial processing", percentage: 25 },
    { id: "4", description: "Final processing and sales", percentage: 15 },
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

      alert("Project created successfully! It will be reviewed before going live.");
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type *
                  </label>
                  <select
                    id="cropType"
                    name="cropType"
                    required
                    value={projectData.cropType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="">Select crop type</option>
                    <option value="maize">Maize</option>
                    <option value="cocoa">Cocoa</option>
                    <option value="cassava">Cassava</option>
                    <option value="yam">Yam</option>
                    <option value="tomato">Tomato</option>
                    <option value="rice">Rice</option>
                    <option value="vegetables">Mixed Vegetables</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
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
                    max="50000"
                    value={projectData.goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Size (acres) *
                  </label>
                  <input
                    type="number"
                    id="farmSize"
                    name="farmSize"
                    required
                    min="0.5"
                    step="0.5"
                    value={projectData.farmSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="5.0"
                  />
                </div>

                <div>
                  <label htmlFor="seasonStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Season Start *
                  </label>
                  <input
                    type="date"
                    id="seasonStartDate"
                    name="seasonStartDate"
                    required
                    value={projectData.seasonStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
              </div>
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
            <h3 className="font-semibold text-black mb-3">⚠️ Important Information</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Your project will be reviewed by our team before being published</p>
              <p>• Funds are released according to milestone completion</p>
              <p>• You&apos;ll need to provide regular updates and documentation</p>
              <p>• Only verified farmers can create projects</p>
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
