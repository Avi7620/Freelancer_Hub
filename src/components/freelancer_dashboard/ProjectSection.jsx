import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Clock,
  User,
  Star,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Tag,
  Folder,
  Users,
  Target,
  TrendingUp,
  FileText,
  Image,
  Paperclip,
} from "lucide-react";

const ProjectsSection = ({ freelancerBidData = [] }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  // First ensure we're working with the data array from the response
  const bidData = freelancerBidData.data || freelancerBidData;

  const getPriorityFromStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Medium";
      case "Accepted":
        return "High";
      case "Rejected":
        return "Low";
      default:
        return "Medium";
    }
  };

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const getProgressFromStatus = (status) => {
    switch (status) {
      case "Accepted":
        return 50;
      case "Completed":
        return 100;
      case "Rejected":
        return 0;
      default:
        return 25; // Pending
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500"; // Pending
    }
  };

  const getPriorityColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-red-400";
      case "Completed":
        return "text-green-400";
      case "Rejected":
        return "text-gray-400";
      default:
        return "text-yellow-400"; // Pending
    }
  };

  // Map API bid data to project card format
  const mappedProjects = (bidData || []).map((bid) => ({
    id: bid.bidId,
    projectId: bid.projectId,
    name: bid.projectTitle,
    client: bid.companyName,
    clientAvatar: bid.companyName
      ? bid.companyName.substring(0, 2).toUpperCase()
      : bid.clientName
      ? bid.clientName.substring(0, 2).toUpperCase()
      : "CL",
    status: bid.status,
    budget: bid.projectBudget,
    spent: bid.amount,
    startDate: bid.createdAt ? formatDate(bid.createdAt) : "N/A",
    dueDate: bid.projectDeadline ? formatDate(bid.projectDeadline) : "N/A",
    description: bid.projectDescription,
    deliveryDays: bid.deliveryDays,
    statusColor: getStatusColor(bid.status),
    priorityColor: getPriorityColor(bid.status),
  }));

  // Filter projects based on search term and status
  const filteredProjects = mappedProjects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      project.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const statusOptions = [
    { value: "all", label: "All Projects" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
  ];

  const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold">
              {project.clientAvatar}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm">{project.client}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.statusColor} bg-opacity-20 text-white`}
            >
              {project.status}
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Budget</div>
            <div className="font-semibold text-emerald-400">
              ${project.budget.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Bid Amount</div>
            <div className="font-semibold text-white">
              ${project.spent.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">{project.dueDate}</div>
          </div>
          <div>
            <div className="text-gray-400">Days to Deliver</div>
            <div className="font-semibold text-white">
              {project.deliveryDays || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">
            Manage and track all your freelance projects
          </p>
        </div>
        <button
          onClick={() => setShowNewProject(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid - Now using filteredProjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="text-center py-12 col-span-full">
            <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                Create New Project
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Project description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="UI/UX, React, Dashboard (comma separated)"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
