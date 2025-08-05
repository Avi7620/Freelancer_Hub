import React, { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Users,
  SettingsIcon,
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
  LogOut,
  HelpCircle,
  ChevronDown,
  X,
  Camera,
  Briefcase,
  Heart,
  MessageCircle,
} from "lucide-react";
import API from "../../services/api";
import CalendarDatePicker from "../client_dashboard/CalenderDatePicker";

function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSettingsSection, setActiveSettingsSection] = useState("profile");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects when component mounts or activeTab changes to dashboard
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchProjects();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await API.get("/client/projects/with-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  // Handle clicking outside of profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Dashboard = () => {
    if (loadingProjects) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-2 text-sm text-red-700 underline hover:text-red-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stats Overview - you might want to calculate these from the projects data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ... existing stats ... */}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Projects
              </h2>
              <button
                onClick={() => setActiveTab("post-project")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Post New Project
              </button>
            </div>
          </div>
          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No projects yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by posting a new project.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab("post-project")}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Post New Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
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
                            <DollarSign className="h-4 w-4 mr-1" />$
                            {project.budget.toFixed(2)}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {project.bidCount} bids
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {project.status}
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
            )}
          </div>
        </div>
      </div>
    );
  };

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
        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: null,
          requiredSkills: [],
        });

        // Refresh projects list
        fetchProjects();

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
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Another Project
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? "border-red-500" : "border-gray-300"
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.budget ? "border-red-500" : "border-gray-300"
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.requiredSkills ? "border-red-500" : "border-gray-300"
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
              onClick={() => setActiveTab("dashboard")}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
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

  const BidsView = () => {
    const [projectBids, setProjectBids] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [assignError, setAssignError] = useState(null);
    const [assignSuccess, setAssignSuccess] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);

    useEffect(() => {
      const fetchProjectBids = async () => {
        try {
          setLoading(true);
          setError(null);

          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Authentication required");
          }

          const response = await API.get(
            `/client/projects/${selectedProject.id}/bids`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setProjectBids(response.data);
          } else {
            setError(response.data.message || "Failed to fetch bids");
          }
        } catch (err) {
          console.error("Error fetching project bids:", err);
          setError(err.response?.data?.message || "Failed to fetch bids");
        } finally {
          setLoading(false);
        }
      };

      if (selectedProject) {
        fetchProjectBids();
      }
    }, [selectedProject]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const getCountryName = (countryCode) => {
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      try {
        return regionNames.of(countryCode) || countryCode;
      } catch {
        return countryCode;
      }
    };

    const handleAssignProject = async () => {
      if (!agreeTerms) {
        setAssignError("You must agree to the terms to assign the project");
        return;
      }

      setAssigning(true);
      setAssignError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await API.post(
          `/client/projects/${selectedProject.id}/assign`,
          {
            bidId: selectedBid.bidId,
            freelancerId: selectedBid.freelancerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setAssignSuccess(true);
          // Update the project status in the local state
          setProjects(projects.map(project =>
            project.id === selectedProject.id
              ? { ...project, status: "Assigned" }
              : project
          ));
          // Close modal after 2 seconds
          setTimeout(() => {
            setShowAssignModal(false);
            setAssignSuccess(false);
            setAgreeTerms(false);
            setSelectedBid(null);
          }, 2000);
        } else {
          setAssignError(response.data.message || "Failed to assign project");
        }
      } catch (err) {
        console.error("Error assigning project:", err);
        setAssignError(
          err.response?.data?.message ||
          "Failed to assign project. Please try again."
        );
      } finally {
        setAssigning(false);
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    if (!projectBids) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600">No project selected</p>
        </div>
      );
    }

    if (projectBids.status === "NO_BIDS") {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bids for "{projectBids.data.projectTitle}"
          </h2>
          <p className="text-gray-600">{projectBids.data.message}</p>
        </div>
      );
    }

    const filteredBids = projectBids.data.bids.filter(
      (bid) =>
        bid.freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.proposal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Bids for "{projectBids.data.projectTitle}"
              </h2>
              <p className="text-gray-600 mt-1">
                {projectBids.data.bids.length} freelancer
                {projectBids.data.bids.length !== 1 ? "s have" : " has"} submitted proposals
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bids..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredBids.map((bid) => (
              <div
                key={bid.bidId}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {bid.freelancerName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {bid.freelancerName}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {bid.city}, {getCountryName(bid.country)}
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          24 projects completed
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {bid.proposal}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {bid.skills.map((skill, index) => (
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
                        ${bid.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        in {bid.deliveryDays} day
                        {bid.deliveryDays !== 1 ? "s" : ""}
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
                      Submitted {formatDate(bid.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Modal */}
        <AssignmentModal
          selectedBid={selectedBid}
          selectedProject={selectedProject}
          showAssignModal={showAssignModal}
          setShowAssignModal={setShowAssignModal}
          agreeTerms={agreeTerms}
          setAgreeTerms={setAgreeTerms}
          assigning={assigning}
          setAssigning={setAssigning} 
          assignError={assignError}
          setAssignError={setAssignError}
          assignSuccess={assignSuccess}
          setAssignSuccess={setAssignSuccess}
        />
      </div>
    );
  };

  const Settings = () => {
    const [settingsData, setSettingsData] = useState({
      firstName: "John",
      lastName: "Anderson",
      email: "john.anderson@example.com",
      phone: "+1 (555) 123-4567",
      company: "TechStart Inc.",
      notifications: {
        newBids: true,
        projectUpdates: true,
      },
    });

    const [isLoading, setSaveLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleInputChange = (field, value) => {
      if (field.startsWith("notifications.")) {
        const notificationField = field.split(".")[1];
        setSettingsData((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [notificationField]: value,
          },
        }));
      } else {
        setSettingsData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    };

    const handleSaveSettings = async () => {
      setSaveLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        console.error("Error saving settings:", error);
      } finally {
        setSaveLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        {/* Settings Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <p className="text-gray-600 mt-1">
              Manage your account and preferences
            </p>
          </div>
          <div className="px-6 py-4">
            <nav className="flex space-x-8">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "security", label: "Security", icon: Shield },
                { id: "billing", label: "Billing", icon: CreditCard },
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSettingsSection(section.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSettingsSection === section.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Profile Settings */}
        {activeSettingsSection === "profile" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Settings
              </h3>
              <p className="text-gray-600 mt-1">
                Update your personal information and profile details
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-blue-600" />
                      </div>
                      <button className="absolute bottom-4 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {settingsData.firstName} {settingsData.lastName}
                    </h3>
                    <p className="text-gray-600">Premium Client</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Online</span>
                    </div>
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
                        value={settingsData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={settingsData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
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
                      value={settingsData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settingsData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={settingsData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeSettingsSection === "notifications" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
              <p className="text-gray-600 mt-1">
                Configure how and when you receive notifications
              </p>
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  key: "newBids",
                  label: "New bid notifications",
                  description:
                    "Get notified when freelancers submit bids on your projects",
                },
                {
                  key: "projectUpdates",
                  label: "Project updates",
                  description:
                    "Receive updates on your active projects and milestones",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settingsData.notifications[item.key]}
                      onChange={(e) =>
                        handleInputChange(
                          `notifications.${item.key}`,
                          e.target.checked
                        )
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeSettingsSection === "security" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <p className="text-gray-600 mt-1">
                Manage your account security and authentication settings
              </p>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <span className="font-medium text-gray-900">
                      Change Password
                    </span>
                    <p className="text-sm text-gray-600">
                      Update your account password
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>
        )}

        {/* Billing Settings */}
        {activeSettingsSection === "billing" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Billing</h3>
              <p className="text-gray-600 mt-1">
                Manage your payment methods and billing information
              </p>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <span className="font-medium text-gray-900">
                      Payment Methods
                    </span>
                    <p className="text-sm text-gray-600">
                      Manage your payment options
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <span className="font-medium text-gray-900">
                      Billing History
                    </span>
                    <p className="text-sm text-gray-600">
                      View your payment history
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>
        )}

        {/* Save Button */}
        {(activeSettingsSection === "profile" ||
          activeSettingsSection === "notifications") && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSettingsData({
                    firstName: "John",
                    lastName: "Anderson",
                    email: "john.anderson@example.com",
                    phone: "+1 (555) 123-4567",
                    company: "TechStart Inc.",
                    notifications: {
                      newBids: true,
                      projectUpdates: true,
                    },
                  });
                }}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isLoading && (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                )}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Settings saved successfully!
            </div>
          </div>
        )}
      </div>
    );
  };

  const AssignmentModal = ({
    selectedBid,
    selectedProject,
    showAssignModal,
    setShowAssignModal,
    agreeTerms,
    setAgreeTerms,
    assigning,
    setAssigning,
    assignError,
    setAssignError,
    assignSuccess,
    setAssignSuccess,
  }) => {

    const closeAssignModal = () => {
      setShowAssignModal(false);
      setAgreeTerms(false);
      setAssignError(null);
      setAssignSuccess(false);
    };

    const getCountryName = (countryCode) => {
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      try {
        return regionNames.of(countryCode) || countryCode;
      } catch {
        return countryCode;
      }
    };

    const handleAssignProject = async () => {
      if (!agreeTerms) {
        setAssignError("You must agree to the terms before assigning the project");
        return;
      }

      setAssigning(true);
      setAssignError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const requestBody = {
          projectId: selectedProject.id,
          freelancerId: selectedBid.freelancerId,
          clientId: selectedProject.clientId,
        };

        const response = await API.post('/client/projects/assign', requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setAssignSuccess(true);
        } else {
          throw new Error(response.data.message || "Failed to assign project");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message ||
          error.message ||
          "An error occurred while assigning the project";
        setAssignError(errorMessage);
      } finally {
        setAssigning(false);
      }
    };

    if (!showAssignModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Assign Project
              </h3>
              <button
                onClick={closeAssignModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Success Message */}
            {assignSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="text-lg font-semibold text-green-900 mb-1">
                  Project Assigned Successfully!
                </h4>
                <p className="text-green-700">
                  The freelancer has been notified and can now start working on your project.
                </p>
                <button
                  onClick={closeAssignModal}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {!assignSuccess && (
              <>
                {/* Project Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Project: {selectedProject?.title}
                  </h4>
                  <p className="text-blue-800 text-sm">
                    {selectedProject?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-blue-700">
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Budget: ${selectedProject?.budget?.toFixed(2)}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {selectedProject?.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Freelancer Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Selected Freelancer
                  </h4>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-medium text-lg">
                        {selectedBid.freelancerName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        {selectedBid.freelancerName}
                      </h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedBid.city}, {getCountryName(selectedBid.country)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-sm text-gray-600">Bid Amount</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${selectedBid.amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-sm text-gray-600">Delivery Time</p>
                          <p className="text-xl font-bold text-gray-900">
                            {selectedBid.deliveryDays} day{selectedBid.deliveryDays !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Proposal:</p>
                        <p className="text-gray-700 text-sm bg-white p-3 rounded border">
                          {selectedBid.proposal}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedBid.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to assign this project to the selected freelancer and understand that payment will be processed according to the agreed terms and project milestones.
                  </label>
                </div>

                {/* Error Message */}
                {assignError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{assignError}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer */}
          {!assignSuccess && (
            <div className="p-6 border-t border-gray-100 flex items-center justify-end space-x-4">
              <button
                onClick={closeAssignModal}
                disabled={assigning}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignProject}
                disabled={assigning || !agreeTerms}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {assigning ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Assigning...
                  </>
                ) : (
                  'Assign Project'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 transform opacity-100 scale-100 transition-all duration-200">
      {/* User Info Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">John Anderson</h3>
            <p className="text-sm text-gray-600">john.anderson@example.com</p>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-xs text-yellow-600">
                <Star className="h-3 w-3 fill-current mr-1" />
                <span>Premium Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {/* Account Section */}
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab("settings");
            setActiveSettingsSection("profile");
            setShowProfileDropdown(false);
          }}
          className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <User className="h-4 w-4 mr-3 text-gray-400" />
          Profile Settings
        </button>

        <button
          className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => {
            setActiveTab("dashboard");
          }}
        >
          <Briefcase className="h-4 w-4 mr-3 text-gray-400" />
          My Projects
        </button>

        {/* Billing Section */}
        <div className="border-t border-gray-100 mt-2">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Billing
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab("settings");
              setActiveSettingsSection("billing");
              setShowProfileDropdown(false);
            }}
            className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="h-4 w-4 mr-3 text-gray-400" />
            Payment Methods
          </button>

          <button className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <FileText className="h-4 w-4 mr-3 text-gray-400" />
            Billing History
          </button>
        </div>

        {/* Settings Section */}
        <div className="border-t border-gray-100 mt-2">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab("settings");
              setActiveSettingsSection("notifications");
              setShowProfileDropdown(false);
            }}
            className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Bell className="h-4 w-4 mr-3 text-gray-400" />
            Notifications
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setActiveSettingsSection("security");
              setShowProfileDropdown(false);
            }}
            className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Shield className="h-4 w-4 mr-3 text-gray-400" />
            Security
          </button>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-100 mt-2">
          <button className="w-full flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <HelpCircle className="h-4 w-4 mr-3 text-gray-400" />
            Help & Support
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 mt-2">
          <button className="w-full flex items-center px-6 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4 mr-3 text-red-400" />
            Sign Out
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
                Freelance Hub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${showProfileDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {showProfileDropdown && <ProfileDropdown />}
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
                  { id: "settings", label: "Settings", icon: SettingsIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === item.id
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