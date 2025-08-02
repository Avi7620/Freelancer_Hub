import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Save,
  Bell,
  Palette,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import API from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Profile Tab Component
const ProfileTab = ({
  formState,
  isLoading,
  error,
  success,
  handleChange,
  handleFileChange,
  handleSubmit,
}) => (
  <div className="space-y-8">
    {error && (
      <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
        {error}
      </div>
    )}
    {success && (
      <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
        {success}
      </div>
    )}
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Profile Information
      </h2>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                {formState.profileImage ? (
                  <img
                    src={formState.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {formState.firstName?.[0] || ""}
                    {formState.lastName?.[0] || ""}
                  </div>
                )}
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {formState.firstName} {formState.lastName}
                </h3>
                <p className="text-gray-400">
                  {formState.title || "Freelancer"}
                </p>
                <p className="text-sm text-blue-400 mt-1">
                  Member since {formState.joinDate || "January 2023"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formState.country}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {formState.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  <button
                    type="button"
                    className="px-3 py-1 border border-gray-600 text-gray-400 text-sm rounded-full hover:border-blue-500 hover:text-blue-400 transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  </div>
);

// Notifications Tab Component (unchanged)
const NotificationsTab = ({ notifications, setNotifications }) => (
  <div className="space-y-8">
    {/* ... existing notification tab code ... */}
  </div>
);

// Appearance Tab Component (unchanged)
const AppearanceTab = ({ theme, setTheme }) => (
  <div className="space-y-8">{/* ... existing appearance tab code ... */}</div>
);

// Main Settings Component
const SettingsSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
  });
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    title: "",
    description: "",
    experience: "",
    hourlyRate: "",
    availability: "",
    skills: [],
    categories: [],
    portfolioFiles: null,
    profileImage: "",
    joinDate: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/freelancer/profile");

        const skills = Array.isArray(response.data.skills)
          ? response.data.skills
          : JSON.parse(response.data.skills || "[]");

        const categories = Array.isArray(response.data.categories)
          ? response.data.categories
          : JSON.parse(response.data.categories || "[]");

        setFormState({
          firstName: response.data.personName?.split(" ")[0] || "",
          lastName: response.data.personName?.split(" ")[1] || "",
          email: response.data.email || "",
          phone: response.data.phoneNumber || "",
          country: response.data.country || "",
          city: response.data.city || "",
          title: response.data.title || "",
          description: response.data.description || "",
          experience: response.data.experience || "",
          hourlyRate: response.data.hourlyRate || "",
          availability: response.data.availability || "",
          skills: skills,
          categories: categories,
          portfolioFiles: null,
          profileImage: response.data.profileImage || "",
          joinDate: response.data.joinDate || "January 2023",
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        }
        setError("Failed to load profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancerData();
  }, [logout, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormState((prev) => ({ ...prev, portfolioFiles: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();

      // Append all fields
      formData.append("FirstName", formState.firstName);
      formData.append("LastName", formState.lastName);
      if (formState.phone) formData.append("Phone", formState.phone);
      if (formState.country) formData.append("Country", formState.country);
      if (formState.city) formData.append("City", formState.city);
      if (formState.title) formData.append("Title", formState.title);
      if (formState.description)
        formData.append("Description", formState.description);
      if (formState.experience)
        formData.append("Experience", formState.experience);
      if (formState.hourlyRate)
        formData.append("HourlyRate", formState.hourlyRate);
      if (formState.availability)
        formData.append("Availability", formState.availability);

      // Append arrays
      formState.skills.forEach((skill, i) => {
        formData.append(`Skills[${i}]`, skill);
      });

      formState.categories.forEach((category, i) => {
        formData.append(`Categories[${i}]`, category);
      });

      // Append files if any
      if (formState.portfolioFiles) {
        Array.from(formState.portfolioFiles).forEach((file, i) => {
          formData.append(`Portfolio[${i}]`, file);
        });
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await API.put("/freelancer/profile", formData, config);
      setSuccess("Profile updated successfully!");

      // Refresh data
      const response = await API.get("/freelancer/profile");
      const data = response.data;
      setFormState((prev) => ({
        ...prev,
        firstName: data.personName?.split(" ")[0] || prev.firstName,
        lastName: data.personName?.split(" ")[1] || prev.lastName,
        // Update other fields as needed
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 font-medium flex items-center space-x-2 transition-colors ${
              activeTab === tab.id
                ? "text-blue-400 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <ProfileTab
          formState={formState}
          isLoading={isLoading}
          error={error}
          success={success}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}
      {activeTab === "notifications" && (
        <NotificationsTab
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
      {activeTab === "appearance" && (
        <AppearanceTab theme={theme} setTheme={setTheme} />
      )}
    </div>
  );
};
export default SettingsSection;
