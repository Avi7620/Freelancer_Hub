import React, { useState } from "react";
import {
  PlusCircle,
  Users,
  Settings,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Calendar,
  FileText,
  Search,
  Filter,
  Edit3,
  User,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Mail,
  Phone,
  Award,
  TrendingUp,
} from "lucide-react";
import API from "../../services/api";
import CalendarDatePicker from "../client_dashboard/CalenderDatePicker";

// Mock data
const mockProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description:
      "Looking for a skilled developer to create a modern e-commerce platform with payment integration.",
    budget: "$2,500 - $5,000",
    deadline: "4 weeks",
    status: "open",
    bidsCount: 12,
    skills: ["React", "Node.js", "MongoDB", "Stripe"],
    postedDate: "2 days ago",
    category: "Web Development",
    priority: "high",
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    description:
      "Need a creative designer for a fitness tracking mobile application.",
    budget: "$1,000 - $2,000",
    deadline: "2 weeks",
    status: "assigned",
    bidsCount: 8,
    skills: ["Figma", "UI/UX", "Mobile Design"],
    postedDate: "1 week ago",
    assignedTo: "Sarah Chen",
  },
];

const mockBids = [
  {
    id: 1,
    projectId: 1,
    freelancer: {
      name: "Alex Rodriguez",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      location: "San Francisco, CA",
      completedProjects: 47,
      skills: ["React", "Node.js", "MongoDB"],
    },
    proposal:
      "I have 5+ years of experience in full-stack development with React and Node.js. I've built 15+ e-commerce platforms with secure payment integration.",
    bidAmount: "$3,200",
    deliveryTime: "3 weeks",
    submittedDate: "1 day ago",
  },
  {
    id: 2,
    projectId: 1,
    freelancer: {
      name: "Maria Santos",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      location: "New York, NY",
      completedProjects: 32,
      skills: ["React", "Node.js", "Express"],
    },
    proposal:
      "Experienced full-stack developer specializing in e-commerce solutions. I can deliver a scalable, secure platform within your timeline.",
    bidAmount: "$2,800",
    deliveryTime: "4 weeks",
    submittedDate: "2 days ago",
  },
  {
    id: 3,
    projectId: 1,
    freelancer: {
      name: "David Kim",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      location: "Austin, TX",
      completedProjects: 28,
      skills: ["React", "MongoDB", "Stripe"],
    },
    proposal:
      "I specialize in building modern e-commerce platforms with excellent user experience and robust payment systems.",
    bidAmount: "$3,500",
    deliveryTime: "3.5 weeks",
    submittedDate: "3 days ago",
  },
];

function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostProject, setShowPostProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bids</p>
              <p className="text-3xl font-bold text-gray-900">47</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Spent</p>
              <p className="text-3xl font-bold text-gray-900">$12.5K</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">70% of monthly budget</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">18</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">98% success rate</span>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Projects
            </h2>
            <button
              onClick={() => setShowPostProject(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Post New Project
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "open"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.status === "open" ? "Open" : "Assigned"}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveTab("bids");
                      }}
                      className="px-3 py-1 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View Bids
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PostProject = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      budget: "",
      deadline: null,
      requiredSkills: [],
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

    const validateForm = () => {
      const newErrors = {};

      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";
      if (!formData.budget || isNaN(formData.budget))
        newErrors.budget = "Valid budget is required";
      if (!formData.deadline) newErrors.deadline = "Deadline is required";
      if (!formData.requiredSkills.length)
        newErrors.requiredSkills = "At least one skill is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const requestData = {
          title: formData.title,
          description: formData.description,
          budget: parseFloat(formData.budget),
          deadline: formData.deadline.toISOString(),
          requiredSkills: formData.requiredSkills,
        };

        const response = await API.post("/client/PostProject", requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: null,
          requiredSkills: [],
        });

        // For demonstration
        console.log("Project created:", response.data);
      } catch (error) {
        console.error("Error creating project:", error);
        setErrors({
          submit: error.response?.data?.message || "Failed to create project",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    if (submitSuccess) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Project Created Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Your project has been posted and is now visible to freelancers.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Another Project
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Post a New Project
          </h2>
          <p className="text-gray-600 mt-1">
            Describe your project to attract the best freelancers
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter a descriptive project title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your project in detail..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget ($) *
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                step="0.01"
                min="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.budget ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter project budget"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline *
              </label>
              <CalendarDatePicker
                selectedDate={formData.deadline}
                onChange={(date) => handleInputChange("deadline", date)}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
              )}
              {formData.deadline && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {formData.deadline.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *
            </label>
            <input
              type="text"
              value={formData.requiredSkills.join(", ")}
              onChange={(e) => {
                const skills = e.target.value
                  .split(",")
                  .map((skill) => skill.trim());
                handleInputChange(
                  "requiredSkills",
                  skills.filter((skill) => skill)
                );
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.requiredSkills ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., React, Node.js, MongoDB (separate with commas)"
            />
            {errors.requiredSkills && (
              <p className="text-red-500 text-sm mt-1">
                {errors.requiredSkills}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requiredSkills
                .filter((skill) => skill)
                .map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  description: "",
                  budget: "",
                  deadline: null,
                  requiredSkills: [],
                });
                setErrors({});
              }}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Posting...
                </>
              ) : (
                "Post Project"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const BidsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedProject
                ? `Bids for "${selectedProject.title}"`
                : "All Project Bids"}
            </h2>
            <p className="text-gray-600 mt-1">
              {mockBids.length} freelancers have submitted proposals
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bids..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockBids.map((bid) => (
            <div
              key={bid.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={bid.freelancer.avatar}
                    alt={bid.freelancer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {bid.freelancer.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {bid.freelancer.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {bid.freelancer.location}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {bid.freelancer.completedProjects} projects completed
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{bid.proposal}</p>
                    <div className="flex flex-wrap gap-2">
                      {bid.freelancer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {bid.bidAmount}
                    </p>
                    <p className="text-sm text-gray-500">
                      in {bid.deliveryTime}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedBid(bid);
                        setShowAssignModal(true);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Assign Project
                    </button>
                    <button className="w-full px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      Message
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted {bid.submittedDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Settings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Settings
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and security
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">John Anderson</h3>
                <p className="text-gray-600">Premium Client</p>
                <button className="mt-4 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Anderson"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="john.anderson@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  defaultValue="TechStart Inc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Notification Preferences
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            {
              label: "New bid notifications",
              description: "Get notified when freelancers submit bids",
            },
            {
              label: "Project updates",
              description: "Receive updates on your active projects",
            },
            {
              label: "Message notifications",
              description: "Get notified of new messages",
            },
            {
              label: "Weekly summary",
              description: "Receive a weekly summary of your activity",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Security & Privacy
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-3" />
              <span className="font-medium text-gray-900">Change Password</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
              <span className="font-medium text-gray-900">Payment Methods</span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-400 mr-3" />
              <span className="font-medium text-gray-900">
                Privacy Settings
              </span>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  const AssignmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            Assign Project
          </h3>
          <p className="text-gray-600 mt-1">
            Confirm project assignment to freelancer
          </p>
        </div>
        <div className="p-6">
          {selectedBid && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedBid.freelancer.avatar}
                  alt={selectedBid.freelancer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedBid.freelancer.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{selectedBid.freelancer.rating}</span>
                    <span>•</span>
                    <span>
                      {selectedBid.freelancer.completedProjects} projects
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">
                  Project Details
                </h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Bid Amount:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {selectedBid.bidAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-medium text-gray-900 ml-2">
                      {selectedBid.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Instructions
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional instructions or requirements..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the project terms and payment schedule
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-100 flex items-center justify-end space-x-4">
          <button
            onClick={() => setShowAssignModal(false)}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                FreelanceHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
            <nav className="p-6">
              <div className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: FileText },
                  {
                    id: "post-project",
                    label: "Post Project",
                    icon: PlusCircle,
                  },
                  { id: "bids", label: "View Bids", icon: Users },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "post-project" && <PostProject />}
            {activeTab === "bids" && <BidsView />}
            {activeTab === "settings" && <Settings />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAssignModal && <AssignmentModal />}
    </div>
  );
}

export default ClientDashboard;
