import React, { useState } from "react";
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
  MessageCircle,
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
} from "lucide-react";

import ProjectsSection from "./ProjectSection";
import ApplyProjectsSection from "./ApplyProjectSection";
import InvoicesSection from "./InvoicesSection";
import MessagesSection from "./MessagesSection";
import SettingsSection from "./SettingsSection";

const FreelancerDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [timeFilter, setTimeFilter] = useState("week");

  const navigationItems = [
    { icon: Home, label: "Dashboard", key: "dashboard", active: true },
    { icon: Briefcase, label: "Apply to the Projects", key: "applyprojects", badge: "5" },
    { icon: Briefcase, label: "Projects", key: "projects", badge: "12" },
    { icon: Users, label: "Clients", key: "clients" },
    { icon: DollarSign, label: "Invoices", key: "invoices", badge: "3" },
    { icon: MessageCircle, label: "Messages", key: "messages", badge: "5" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  const statsCards = [
    {
      title: "Total Revenue",
      value: "$24,580",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-600",
      description: "vs last month",
    },
    {
      title: "Active Projects",
      value: "12",
      icon: Folder,
      gradient: "from-blue-500 to-indigo-600",
      description: "in progress",
    },
    {
      title: "Hours Worked",
      value: "186h",
      icon: Clock,
      gradient: "from-purple-500 to-pink-600",
      description: "this month",
    },
    {
      title: "Client Rating",
      value: "4.95",
      icon: Star,
      gradient: "from-amber-500 to-orange-600",
      description: "average score",
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
    switch (activeSection) {
      case "applyprojects":
        return <ApplyProjectsSection />;
      case "projects":
        return <ProjectsSection />;
      case "invoices":
        return <InvoicesSection />;
      case "messages":
        return <MessagesSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return renderDashboard();
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
              Welcome back! Here's your freelance overview.
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

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
        {/* Sidebar */}
        <div className="w-72 bg-gray-800 border-r border-gray-700 min-h-screen">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">JD</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-gray-400 text-sm">Senior Designer</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">$24.5K</div>
                <div className="text-xs text-gray-400">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">4.95</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">12</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
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
