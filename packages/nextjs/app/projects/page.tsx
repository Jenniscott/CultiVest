"use client";

import { useState } from "react";
import Link from "next/link";
import { ClockIcon, CurrencyDollarIcon, FunnelIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
// import { useAccount } from "wagmi";
import { useAccount } from "~~/hooks/mockHooks";

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
  status: "funding" | "in-progress" | "completed";
  category: "maize" | "cocoa" | "rice" | "vegetables" | "other";
  location: string;
}

const ProjectsPage = () => {
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "funding" | "in-progress">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock project data
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Organic Maize Farming - Season 2024",
      description:
        "Growing organic maize using sustainable farming practices in Ashanti Region. This project focuses on implementing modern irrigation systems and organic fertilizers to increase yield while maintaining environmental sustainability.",
      farmer: "0x1234...5678",
      farmerENS: "kwame.farmlink.eth",
      goal: 5000,
      raised: 3200,
      investorCount: 12,
      deadline: "2024-02-15",
      status: "funding",
      category: "maize",
      location: "Ashanti Region, Ghana",
    },
    {
      id: "2",
      title: "Cocoa Plantation Expansion",
      description:
        "Expanding existing cocoa plantation to increase yield and implement new farming techniques. The project includes purchasing new seedlings, improving soil quality, and implementing better post-harvest processing.",
      farmer: "0x8765...4321",
      farmerENS: "ama.farmlink.eth",
      goal: 8000,
      raised: 8000,
      investorCount: 24,
      deadline: "2024-01-20",
      status: "in-progress",
      category: "cocoa",
      location: "Western Region, Ghana",
    },
    {
      id: "3",
      title: "Rice Cultivation Project",
      description:
        "Large-scale rice cultivation using modern techniques and equipment. This project aims to supply local markets and reduce rice imports by increasing domestic production capacity.",
      farmer: "0x2468...1357",
      farmerENS: "kofi.farmlink.eth",
      goal: 12000,
      raised: 4500,
      investorCount: 8,
      deadline: "2024-03-01",
      status: "funding",
      category: "rice",
      location: "Northern Region, Ghana",
    },
    {
      id: "4",
      title: "Vegetable Greenhouse Initiative",
      description:
        "Setting up modern greenhouse facilities for year-round vegetable production. Focus on tomatoes, peppers, and leafy greens using hydroponic systems.",
      farmer: "0x9753...8642",
      farmerENS: "akua.farmlink.eth",
      goal: 6500,
      raised: 2100,
      investorCount: 6,
      deadline: "2024-02-28",
      status: "funding",
      category: "vegetables",
      location: "Greater Accra, Ghana",
    },
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter;
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  const categories = ["all", "maize", "cocoa", "rice", "vegetables", "other"];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">All Projects</h1>
          <p className="text-gray-600">Discover farming projects from verified farmers across Ghana.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                placeholder="Search projects..."
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={e => setSelectedFilter(e.target.value as "all" | "funding" | "in-progress")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                <option value="all">All Status</option>
                <option value="funding">Funding</option>
                <option value="in-progress">In Progress</option>
              </select>
              <FunnelIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <FunnelIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
            >
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

                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {project.category.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <UserIcon className="h-4 w-4 mr-2" />
                  {project.farmerENS || `${project.farmer.slice(0, 6)}...${project.farmer.slice(-4)}`}
                </div>

                <div className="flex items-center text-gray-600">
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

                {project.status === "funding" && (
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

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

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <Link href={`/projects/${project.id}`} className="text-black hover:text-gray-600 text-sm font-medium">
                  View Details
                </Link>
                {project.status === "funding" && isConnected && (
                  <Link
                    href={`/projects/${project.id}/invest`}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors flex items-center gap-1"
                  >
                    <CurrencyDollarIcon className="h-4 w-4" />
                    Invest
                  </Link>
                )}
                {!isConnected && project.status === "funding" && (
                  <span className="text-gray-400 text-sm">Connect wallet to invest</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-black mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
                setSelectedCategory("all");
              }}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        {!isConnected && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-black mb-2">Ready to Start Investing?</h3>
            <p className="text-gray-600 mb-4">
              Connect your wallet to invest in verified farming projects and support sustainable agriculture.
            </p>
            <div className="text-sm text-gray-500">Connect your wallet using the button in the top right corner</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
