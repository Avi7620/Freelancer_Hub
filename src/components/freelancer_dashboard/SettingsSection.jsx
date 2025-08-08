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
  Plus,
  X,
  Upload,
} from "lucide-react";
import API from "../../services/api";

// Mock Auth Context
const useAuth = () => ({
  logout: () => {
    console.log("Logging out...");
  },
});

// Mock Navigate
const useNavigate = () => (path) => {
  console.log("Navigating to:", path);
};

// Profile Tab Component
const ProfileTab = ({
  formState,
  isLoading,
  error,
  success,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleAddSkill,
  handleRemoveSkill,
  newSkill,
  setNewSkill,
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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {formState.firstName?.[0] || ""}
                    {formState.lastName?.[0] || ""}
                  </div>
                )}
                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    name="profileImage"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {formState.firstName} {formState.lastName}
                </h3>
                <p className="text-gray-400">
                  {formState.title || "Freelancer"}
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                    required
                    disabled
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., Full Stack Developer"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="Tell us about yourself and your experience..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Experience
                  </label>
                  <div>
                    <select
                      name="experience"
                      value={formState.experience}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="intermediate">
                        Intermediate (2-5 years)
                      </option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formState.hourlyRate}
                    onChange={handleChange}
                    placeholder="50"
                    min="0"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={formState.availability}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select availability</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formState.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
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

// Notifications Tab Component
const NotificationsTab = ({ notifications, setNotifications }) => {
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Notification Preferences
        </h2>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Email Notifications
                </h3>
                <p className="text-gray-400 text-sm">
                  Receive notifications via email
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange("email")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Project Updates
                </h3>
                <p className="text-gray-400 text-sm">
                  Get notified about project status changes
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange("projectUpdates")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.projectUpdates ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.projectUpdates
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Payment Alerts
                </h3>
                <p className="text-gray-400 text-sm">
                  Get notified about payments and invoices
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange("paymentAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.paymentAlerts ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.paymentAlerts
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Appearance Tab Component
const AppearanceTab = ({ theme, setTheme }) => {
  const themes = [
    {
      id: "dark",
      name: "Dark",
      icon: Moon,
      description: "Dark theme for better focus",
    },
    {
      id: "light",
      name: "Light",
      icon: Sun,
      description: "Light theme for daytime use",
    },
    {
      id: "system",
      name: "System",
      icon: Monitor,
      description: "Follow system preference",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Appearance Settings
        </h2>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
            {themes.map((themeOption) => (
              <div
                key={themeOption.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  theme === themeOption.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <div className="flex items-center space-x-3">
                  <themeOption.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-white">
                      {themeOption.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {themeOption.description}
                    </p>
                  </div>
                  {theme === themeOption.id && (
                    <div className="ml-auto w-4 h-4 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Settings Component
const SettingsSection = ({ freelancerData, onProfileUpdate }) => {
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
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  // Initialize form state with default values
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
  });

  // Update form state when freelancerData changes
  useEffect(() => {
    if (freelancerData) {
      setFormState({
        firstName: freelancerData?.data.personName?.split(" ")[0] || "",
        lastName:
          freelancerData?.data.personName?.split(" ").slice(1).join(" ") || "",
        email: freelancerData?.data.email || "",
        phone: freelancerData?.data.phoneNumber || "",
        country: freelancerData?.data.country || "",
        city: freelancerData?.data.city || "",
        title: freelancerData?.data.title || "",
        description: freelancerData?.data.description || "",
        experience: freelancerData?.data.experience || "",
        hourlyRate: freelancerData?.data.hourlyRate || "",
        availability: freelancerData?.data.availability || "",
        skills: Array.isArray(freelancerData?.data.skills)
          ? freelancerData?.data.skills
          : JSON.parse(freelancerData?.data.skills || "[]"),
        categories: Array.isArray(freelancerData?.data.categories)
          ? freelancerData?.data.categories
          : JSON.parse(freelancerData?.data.categories || "[]"),
      });
    }
  }, [freelancerData.data]);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profileImage" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormState((prev) => ({
        ...prev,
        profileImage: imageUrl,
        profileImageFile: files[0],
      }));
    } else {
      setFormState((prev) => ({ ...prev, portfolioFiles: files }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formState.skills.includes(newSkill.trim())) {
      setFormState((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
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
      formData.append("Email", formState.email);
      formData.append("Phone", formState.phone);
      formData.append("Country", formState.country);
      formData.append("City", formState.city);
      formData.append("Title", formState.title);
      formData.append("Description", formState.description);
      formData.append("Experience", formState.experience);
      formData.append("HourlyRate", formState.hourlyRate);
      formData.append("Availability", formState.availability);

      // Append arrays as JSON strings
      formData.append("Skills", JSON.stringify(formState.skills));
      formData.append("Categories", JSON.stringify(formState.categories));

      // Append profile image if it exists
      if (formState.profileImageFile) {
        formData.append("ProfileImage", formState.profileImageFile);
      }

      console.log("Submitting form data:"); // Debug log
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Make the actual API call
      const response = await API.put("/freelancer/profile", formData, {});

      console.log("API response:", response.data); // Debug log

      // Call parent with updated data
      onProfileUpdate({
        personName: `${formState.firstName} ${formState.lastName}`,
        email: formState.email,
        phoneNumber: formState.phone,
        country: formState.country,
        city: formState.city,
        title: formState.title,
        description: formState.description,
        experience: formState.experience,
        hourlyRate: formState.hourlyRate,
        availability: formState.availability,
        skills: formState.skills,
        categories: formState.categories,
        profileImage: formState.profileImage,
      });

      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
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

        {/* Show loading state only when submitting form */}
        {isLoading && activeTab === "profile" ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "profile" && (
              <ProfileTab
                formState={formState}
                isLoading={isLoading}
                error={error}
                success={success}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                handleAddSkill={handleAddSkill}
                handleRemoveSkill={handleRemoveSkill}
                newSkill={newSkill}
                setNewSkill={setNewSkill}
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
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsSection;
