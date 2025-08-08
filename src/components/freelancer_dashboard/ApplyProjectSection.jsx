import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  Star,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Folder,
  Users,
} from "lucide-react";
import BiddingModal from "./BiddingModal";

const ApplyProjectsSection = ({ setTotalProject }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBiddingModal, setShowBiddingModal] = useState(false);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from localStorage - check multiple possible keys
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found. Please login first.");
      }

      // Prepare headers with token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const response = await fetch(
        "https://localhost:7039/api/freelancer/FreelancerAvailableProjects",
        {
          method: "GET",
          headers,
        }
      );

      console.log("API Response status:", response.status);

      if (!response.ok) {
        // Handle unauthorized access
        if (response.status === 401) {
          // Clear invalid token
          localStorage.removeItem("token");

          throw new Error("Session expired. Please login again.");
        }
        if (response.status === 403) {
          throw new Error(
            "Access forbidden. You do not have permission to view projects."
          );
        }
        throw new Error(
          `Failed to fetch projects: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API Response data:", data);
      data.filter((project) => project.projectStatus != "Open");
      setTotalProject(data.length);

      // Assuming the API returns an array of projects
      // If the API returns data in a different structure (e.g., { projects: [...] }), adjust accordingly
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message || "Failed to fetch projects. Please try again.");

      // If it's an auth error, you might want to redirect to login
      if (
        err.message.includes("login") ||
        err.message.includes("Session expired")
      ) {
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Safe JSON parse function
  const safeJsonParse = (str) => {
    try {
      return Array.isArray(JSON.parse(str)) ? JSON.parse(str) : [];
    } catch {
      return [];
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // If the API includes status field, use it for filtering
    const matchesFilter =
      filterStatus === "all" ||
      (project.status &&
        project.status.toLowerCase().replace(" ", "-") === filterStatus);

    return matchesSearch && matchesFilter;
  });

  const handleApplyClick = (project) => {
    setSelectedProject(project);
    setShowBiddingModal(true);
    console.log("Opening bidding modal for project:", project.id);
  };

  const handleCloseBiddingModal = () => {
    setShowBiddingModal(false);
    setSelectedProject(null);
  };

  const ProjectCard = ({ project }) => {
    const skills = project.requiredSkills
      ? safeJsonParse(project.requiredSkills)
      : [];
    const validSkills = skills.filter((skill) => skill && skill.trim() !== "");

    return (
      <div className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold text-white">
                {project.companyName
                  ? `${project.companyName.charAt(0)}${
                      project.companyName.charAt(1) || ""
                    }`
                  : "P"}
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">
                  {project.title || project.name || "Untitled Project"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {project.companyName || project.client || "Unknown Client"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {project.urgency === "high" && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg border border-red-500/30">
                  Urgent
                </span>
              )}
              {project.applicants && (
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{project.applicants}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description || "No description available"}
          </p>

          {validSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {validSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <div className="text-gray-400">Budget</div>
              <div className="font-semibold text-emerald-400">
                ${project.budget ? project.budget.toLocaleString() : "TBD"}
              </div>
            </div>
            <div className="ms-9">
              <div className="text-gray-400">Due Date</div>
              <div className="font-semibold text-white w-120">
                {project.deadline || project.endDate || "TBD"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4 border-t border-gray-700">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
              onClick={() => handleApplyClick(project)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-gray-400">Loading projects...</p>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12">
      <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        Failed to load projects
      </h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <div className="flex flex-col items-center space-y-3">
        {error &&
        (error.includes("login") || error.includes("Session expired")) ? (
          <button
            onClick={() => {
              // Redirect to login or show login modal
              alert("Please login to continue");
              // window.location.href = '/login';
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </button>
        ) : (
          <button
            onClick={fetchProjects}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        No projects found
      </h3>
      <p className="text-gray-500">
        {searchTerm || filterStatus !== "all"
          ? "Try adjusting your search or filter criteria"
          : "No projects available at the moment"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Available Projects
            </h1>
            <p className="text-gray-400 mt-1">
              Apply to freelance projects, manage them seamlessly, and track
              your progress — all in one place.
            </p>
          </div>
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-64 md:w-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState />
        ) : filteredProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Bidding Modal */}
      <BiddingModal
        project={selectedProject}
        isOpen={showBiddingModal}
        onClose={handleCloseBiddingModal}
      />
    </div>
  );
};

export default ApplyProjectsSection;
