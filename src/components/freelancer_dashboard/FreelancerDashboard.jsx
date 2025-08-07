import React, { useState, useEffect } from "react";
import API from "../../services/api";
import {
  Activity,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  Filter,
  Folder,
  Globe,
  Heart,
  Home,
  Layers,
  Mail,
  MoreHorizontal,
  PieChart,
  Plus,
  Search,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
  Target,
  Award,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Wallet,
  LogOut,
} from "lucide-react";

import ProjectsSection from "./ProjectSection";
import ApplyProjectsSection from "./ApplyProjectSection";
import SettingsSection from "./SettingsSection";

const FreelancerDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [timeFilter, setTimeFilter] = useState("week");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [freelancerData, setFreelancerData] = useState(null);
  const [freelancerBidData, setFreelancerBidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch freelancer data on component mount
  useEffect(() => {
    // In the fetchFreelancerData function:
    const fetchFreelancerData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch profile data
        const profileResponse = await API.get("/freelancer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Transform profile data
        const transformedData = {
          ...profileResponse.data,
          skills: Array.isArray(profileResponse.data.skills)
            ? profileResponse.data.skills
            : JSON.parse(profileResponse.data.skills || "[]"),
          categories: Array.isArray(profileResponse.data.categories)
            ? profileResponse.data.categories
            : JSON.parse(profileResponse.data.categories || "[]"),
        };

        setFreelancerData(transformedData);

        // Fetch bid data
        const bidResponse = await API.get("/freelancer/bid-status", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Bid Data:", bidResponse.data.data);
        // Check if bid data exists and has the expected structure
        if (
          bidResponse.data &&
          bidResponse.data.success &&
          bidResponse.data.data
        ) {
          setFreelancerBidData(bidResponse.data.data);
        } else {
          setFreelancerBidData([]); // Set empty array if no data
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setFreelancerBidData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancerData();
  }, []);

  // Function to update data from child component
  const handleProfileUpdate = (updatedData) => {
    setFreelancerData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navigationItems = [
    { icon: Home, label: "Dashboard", key: "dashboard", active: true },
    { icon: Briefcase, label: "Find Work", key: "applyprojects", badge: "5" },
    { icon: Briefcase, label: "My Projects", key: "projects", badge: "12" },
    { icon: Settings, label: "Account Settings", key: "settings" },
    {
      icon: LogOut,
      label: "Log Out",
      key: "logout",
      action: () => setShowLogoutModal(true),
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "SaaS Dashboard Redesign",
      client: "TechFlow Inc.",
      progress: 85,
      status: "In Progress",
      priority: "High",
      dueDate: "2025-01-20",
      budget: "$4,500",
      avatar: "TF",
      statusColor: "bg-blue-500",
      priorityColor: "text-red-400",
    },
    {
      id: 2,
      name: "Mobile App UI Kit",
      client: "StartupLab",
      progress: 60,
      status: "Design Phase",
      priority: "Medium",
      dueDate: "2025-01-25",
      budget: "$3,200",
      avatar: "SL",
      statusColor: "bg-yellow-500",
      priorityColor: "text-yellow-400",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "RetailPro",
      progress: 95,
      status: "Review",
      priority: "High",
      dueDate: "2025-01-15",
      budget: "$6,800",
      avatar: "RP",
      statusColor: "bg-green-500",
      priorityColor: "text-red-400",
    },
    {
      id: 4,
      name: "Brand Identity Package",
      client: "Creative Studio",
      progress: 40,
      status: "Research",
      priority: "Low",
      dueDate: "2025-02-01",
      budget: "$2,100",
      avatar: "CS",
      statusColor: "bg-purple-500",
      priorityColor: "text-green-400",
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "applyprojects":
        return <ApplyProjectsSection freelancerData={freelancerData} />;
      case "projects":
        return <ProjectsSection freelancerBidData={freelancerBidData} />;
      case "settings":
        return (
          <SettingsSection
            freelancerData={freelancerData}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      default:
        return renderDashboard(freelancerData);
    }
  };

  const renderDashboard = () => (
    <>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {freelancerData.data.personName.split(" ")[0]} !
              Here's your freelance overview.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, clients..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-8 overflow-y-auto max-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-12 bg-gray-800 rounded-2xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Active Projects</h2>
                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-700 rounded-xl p-4 hover:bg-gray-650 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                          {project.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {project.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {project.client}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.statusColor} bg-opacity-20`}
                        >
                          {project.status}
                        </div>
                        <p className={`text-xs mt-1 ${project.priorityColor}`}>
                          {project.priority} Priority
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className={`${project.statusColor} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        Due: {project.dueDate}
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {project.budget}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 min-h-screen">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">
                  {freelancerData?.data.personName.split(" ").map((data) => {
                    return data.charAt(0).toUpperCase();
                  }) || "John Doe"}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {freelancerData?.data.personName || "John Doe"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {freelancerData?.data.title || "loading"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveSection(item.key);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
