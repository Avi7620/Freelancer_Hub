import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  Plus,
  ArrowUpDown,
  FileText,
  Star,
  MapPin,
} from "lucide-react";

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Extended mock data for all projects
  const allProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      description:
        "Looking for a skilled developer to create a modern e-commerce platform with payment integration and inventory management.",
      budget: "$2,500 - $5,000",
      budgetType: "fixed",
      deadline: "4 weeks",
      status: "open",
      bidsCount: 12,
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      postedDate: "2024-01-15",
      category: "Web Development",
      priority: "high",
      clientRating: 4.8,
      estimatedHours: 120,
      proposals: [
        {
          freelancer: "Alex Rodriguez",
          amount: "$3,200",
          rating: 4.9,
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
        },
      ],
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description:
        "Need a creative designer for a fitness tracking mobile application with modern interface.",
      budget: "$1,000 - $2,000",
      budgetType: "fixed",
      deadline: "2 weeks",
      status: "in_progress",
      bidsCount: 8,
      skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
      postedDate: "2024-01-10",
      category: "Design",
      priority: "medium",
      clientRating: 4.6,
      estimatedHours: 60,
      assignedTo: "Sarah Chen",
      progress: 65,
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      description:
        "Create an interactive dashboard for business analytics with real-time data visualization.",
      budget: "$3,000 - $6,000",
      budgetType: "fixed",
      deadline: "6 weeks",
      status: "completed",
      bidsCount: 15,
      skills: ["Python", "React", "D3.js", "PostgreSQL"],
      postedDate: "2023-12-20",
      category: "Data Science",
      priority: "high",
      clientRating: 4.9,
      estimatedHours: 180,
      assignedTo: "Michael Zhang",
      completedDate: "2024-01-08",
    },
    {
      id: 4,
      title: "WordPress Blog Setup",
      description:
        "Set up a professional WordPress blog with custom theme and SEO optimization.",
      budget: "$500 - $1,000",
      budgetType: "fixed",
      deadline: "1 week",
      status: "open",
      bidsCount: 6,
      skills: ["WordPress", "PHP", "CSS", "SEO"],
      postedDate: "2024-01-12",
      category: "Web Development",
      priority: "low",
      clientRating: 4.3,
      estimatedHours: 25,
    },
    {
      id: 5,
      title: "Social Media Marketing Campaign",
      description:
        "Develop and execute a comprehensive social media marketing strategy for product launch.",
      budget: "$2,000 - $4,000",
      budgetType: "hourly",
      deadline: "8 weeks",
      status: "paused",
      bidsCount: 9,
      skills: ["Social Media", "Content Creation", "Analytics", "Advertising"],
      postedDate: "2024-01-05",
      category: "Marketing",
      priority: "medium",
      clientRating: 4.5,
      estimatedHours: 100,
    },
    {
      id: 6,
      title: "iOS App Development",
      description:
        "Build a native iOS application for task management with cloud synchronization.",
      budget: "$5,000 - $10,000",
      budgetType: "fixed",
      deadline: "12 weeks",
      status: "in_progress",
      bidsCount: 18,
      skills: ["Swift", "iOS", "Core Data", "CloudKit"],
      postedDate: "2023-12-15",
      category: "Mobile Development",
      priority: "high",
      clientRating: 4.7,
      estimatedHours: 300,
      assignedTo: "Emma Wilson",
      progress: 40,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />;
      case "in_progress":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "paused":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedDate) - new Date(a.postedDate);
      case "oldest":
        return new Date(a.postedDate) - new Date(b.postedDate);
      case "budget_high":
        return (
          parseInt(b.budget.split(" - $")[1].replace(",", "")) -
          parseInt(a.budget.split(" - $")[1].replace(",", ""))
        );
      case "budget_low":
        return (
          parseInt(a.budget.split(" - $")[1].replace(",", "")) -
          parseInt(b.budget.split(" - $")[1].replace(",", ""))
        );
      case "bids":
        return b.bidsCount - a.bidsCount;
      default:
        return 0;
    }
  });

  const ProjectCard = ({ project }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor(
        project.priority
      )} border-r border-t border-b border-gray-100 hover:shadow-md transition-all duration-200`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">
                {project.title}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {getStatusIcon(project.status)}
                <span className="ml-1 capitalize">
                  {project.status.replace("_", " ")}
                </span>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {project.budget}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {project.deadline}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.bidsCount} bids
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Edit3 className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {project.status === "in_progress" && project.progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {project.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                +{project.skills.length - 3} more
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              Posted {new Date(project.postedDate).toLocaleDateString()}
            </p>
            {project.assignedTo && (
              <p className="text-xs text-blue-600 font-medium">
                Assigned to {project.assignedTo}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectRow = ({ project }) => (
    <div
      className={`bg-white border-l-4 ${getPriorityColor(
        project.priority
      )} border-r border-t border-b border-gray-100 hover:bg-gray-50 transition-colors`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={selectedProjects.includes(project.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedProjects([...selectedProjects, project.id]);
                } else {
                  setSelectedProjects(
                    selectedProjects.filter((id) => id !== project.id)
                  );
                }
              }}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusIcon(project.status)}
                  <span className="ml-1 capitalize">
                    {project.status.replace("_", " ")}
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{project.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-8 text-sm">
            <div className="text-center">
              <p className="font-medium text-gray-900">{project.budget}</p>
              <p className="text-gray-500">Budget</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900">{project.bidsCount}</p>
              <p className="text-gray-500">Bids</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900">{project.deadline}</p>
              <p className="text-gray-500">Deadline</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900">
                {new Date(project.postedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500">Posted</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your freelance projects
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {allProjects.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {allProjects.filter((p) => p.status === "in_progress").length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {allProjects.filter((p) => p.status === "completed").length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bids</p>
              <p className="text-3xl font-bold text-gray-900">
                {allProjects.reduce((sum, p) => sum + p.bidsCount, 0)}
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Design">Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="budget_high">Highest Budget</option>
              <option value="budget_low">Lowest Budget</option>
              <option value="bids">Most Bids</option>
            </select>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                } transition-colors`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                } transition-colors`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                  <div className="bg-current h-1 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProjects.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-blue-800">
              {selectedProjects.length} project
              {selectedProjects.length > 1 ? "s" : ""} selected
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export
              </button>
              <button className="px-3 py-1 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Display */}
      <div className="space-y-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="space-y-0">
              {sortedProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Post Your First Project
          </button>
        </div>
      )}

      {/* Pagination */}
      {sortedProjects.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-600">
            Showing {sortedProjects.length} of {allProjects.length} projects
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
