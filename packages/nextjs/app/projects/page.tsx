"use client";

import { useState } from "react";
import Link from "next/link";
import { ClockIcon, FunnelIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import AuthGuard from "~~/components/AuthGuard";

// import { useAccount } from "wagmi";
// import { useAccount } from "~~/hooks/mockHooks";

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
  category: "maize" | "cocoa" | "rice" | "vegetables" | "tubers" | "other" | "poultry" | "crops" | "livestock";
  location: string;
  image: any;
}

const ProjectsPage = () => {
  // const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "funding" | "in-progress">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock project data - realistic 3-6 month farm projects with images
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Short-Season Maize Cultivation (120 Days)",
      description:
        "Fast-growing maize variety cultivation for a complete 4-month cycle. Project includes land preparation, hybrid seed procurement, fertilizer application, and harvest. Expected yield of 5 tons per hectare with ready market guaranteed.",
      farmer: "0x1234...5678",
      farmerENS: "kwame.CultiVest.eth",
      goal: 3500,
      raised: 2800,
      investorCount: 14,
      deadline: "2025-12-15",
      status: "funding",
      category: "crops",
      location: "Ashanti Region, Ghana",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
    },
    {
      id: "2",
      title: "Broiler Chicken Farm (70 Days)",
      description:
        "Fast-growing broiler chickens from chicks to market weight in 10 weeks. Modern poultry management with climate-controlled housing, automated feeding systems, and established buyer contracts with local restaurants and markets.",
      farmer: "0x8765...4321",
      farmerENS: "ama.CultiVest.eth",
      goal: 4500,
      raised: 4500,
      investorCount: 22,
      deadline: "2025-11-30",
      status: "in-progress",
      category: "poultry",
      location: "Western Region, Ghana",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop",
    },
    {
      id: "3",
      title: "Leafy Greens Hydroponics (60 Days)",
      description:
        "Quick-cycle leafy vegetables (lettuce, spinach, kale) using hydroponic systems. 2-month harvest cycle with multiple rotations possible. Targeting urban restaurants and supermarkets with premium pricing.",
      farmer: "0x2468...1357",
      farmerENS: "kofi.CultiVest.eth",
      goal: 2800,
      raised: 1500,
      investorCount: 9,
      deadline: "2025-11-20",
      status: "funding",
      category: "crops",
      location: "Greater Accra, Ghana",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
    },
    {
      id: "4",
      title: "Pig Fattening Operation (90 Days)",
      description:
        "Pig fattening from weaners to market weight in 3 months. Modern pig housing with proper waste management, quality feed program, and contracts with butchers and pork processors for immediate sale upon maturity.",
      farmer: "0x9753...8642",
      farmerENS: "akua.CultiVest.eth",
      goal: 3800,
      raised: 2100,
      investorCount: 15,
      deadline: "2025-12-10",
      status: "funding",
      category: "livestock",
      location: "Eastern Region, Ghana",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
    },
    {
      id: "5",
      title: "Dry Season Tomato Production (90 Days)",
      description:
        "High-value tomato farming during dry season using drip irrigation. 3-month cycle from seedling to harvest targeting premium market prices. Includes greenhouse setup, irrigation system, and organic pest management.",
      farmer: "0x5678...9012",
      farmerENS: "yaw.CultiVest.eth",
      goal: 4200,
      raised: 3400,
      investorCount: 18,
      deadline: "2025-11-25",
      status: "funding",
      category: "crops",
      location: "Central Region, Ghana",
      image: "https://images.unsplash.com/photo-1592841200221-21e1c8f7c7c5?w=400&h=250&fit=crop",
    },
    {
      id: "6",
      title: "Layer Chicken Egg Production (120 Days)",
      description:
        "Point-of-lay hens for immediate egg production. 4-month cycle targeting consistent daily egg supply for local markets and restaurants. Modern layer housing with automated collection and sorting systems.",
      farmer: "0x3456...7890",
      farmerENS: "abena.CultiVest.eth",
      goal: 3600,
      raised: 2900,
      investorCount: 16,
      deadline: "2025-12-05",
      status: "funding",
      category: "poultry",
      location: "Volta Region, Ghana",
      image: "https://images.unsplash.com/photo-1612170153139-6f881c5daa78?w=400&h=250&fit=crop",
    },
    {
      id: "7",
      title: "Goat Breeding Program (100 Days)",
      description:
        "Fast-growing goat breeds for meat production. 3.5-month fattening cycle with quality breeding stock, modern housing, and direct contracts with meat processors and festival markets for premium pricing.",
      farmer: "0x7890...3456",
      farmerENS: "kofi.CultiVest.eth",
      goal: 3200,
      raised: 1600,
      investorCount: 11,
      deadline: "2025-12-01",
      status: "funding",
      category: "livestock",
      location: "Northern Region, Ghana",
      image: "https://images.unsplash.com/photo-1551882680-70d6d33dc14d?w=400&h=250&fit=crop",
    },
    {
      id: "8",
      title: "Mushroom Production Cycle (75 Days)",
      description:
        "Oyster mushroom cultivation in controlled environment. 2.5-month production cycle with substrate preparation, inoculation, and harvesting. High-value crop with consistent demand from restaurants.",
      farmer: "0x1357...2468",
      farmerENS: "emma.CultiVest.eth",
      goal: 2500,
      raised: 2500,
      investorCount: 13,
      deadline: "2025-11-18",
      status: "completed",
      category: "crops",
      location: "Central Region, Ghana",
      image: "https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=400&h=250&fit=crop",
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

  const categories = ["all", "crops", "poultry", "livestock", "other"];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-black">CultiVest</span>
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
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-black transition-colors"
              >
                {/* Project Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={e => {
                      // Fallback image if the URL fails to load
                      e.currentTarget.src = `https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=250&fit=crop`;
                    }}
                  />
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full backdrop-blur-sm ${project.status === "funding"
                        ? "bg-blue-100/90 text-blue-800"
                        : project.status === "in-progress"
                          ? "bg-yellow-100/90 text-yellow-800"
                          : "bg-green-100/90 text-green-800"
                        }`}
                    >
                      {project.status.replace("-", " ").toUpperCase()}
                    </span>

                    <span className="px-2 py-1 text-xs bg-gray-100/90 text-gray-700 rounded-full backdrop-blur-sm">
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
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

                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-4 block w-full bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </Link>
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
          {/* {!isConnected && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-black mb-2">Ready to Start Investing?</h3>
            <p className="text-gray-600 mb-4">
              Connect your wallet to invest in verified farming projects and support sustainable agriculture.
            </p>
            <div className="text-sm text-gray-500">Connect your wallet using the button in the top right corner</div>
          </div>
        )} */}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProjectsPage;
