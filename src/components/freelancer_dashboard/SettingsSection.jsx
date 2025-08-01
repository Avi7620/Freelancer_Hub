import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Save,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Lock,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Building,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  Languages,
  HelpCircle
} from 'lucide-react';

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    projectUpdates: true,
    paymentAlerts: true,
    marketingEmails: false
  });
  const [theme, setTheme] = useState('dark');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Monitor }
  ];

  const ProfileTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
        
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">John Doe</h3>
              <p className="text-gray-400">Senior UI/UX Designer</p>
              <p className="text-sm text-blue-400 mt-1">Member since January 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                defaultValue="John"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                defaultValue="San Francisco, CA"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
              <input
                type="url"
                defaultValue="https://johndoe.design"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              rows={4}
              defaultValue="Passionate UI/UX designer with 8+ years of experience creating beautiful and functional digital experiences. Specialized in SaaS products, mobile apps, and e-commerce platforms."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {['UI/UX Design', 'Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Prototyping'].map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {skill}
                </span>
              ))}
              <button className="px-3 py-1 border border-gray-600 text-gray-400 text-sm rounded-full hover:border-blue-500 hover:text-blue-400 transition-colors">
                + Add Skill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
        
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Communication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-400">Receive push notifications in browser</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-400">Receive important updates via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Updates</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Project Updates</p>
                      <p className="text-sm text-gray-400">Get notified about project milestones and updates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.projectUpdates}
                      onChange={(e) => setNotifications({...notifications, projectUpdates: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Payment Alerts</p>
                      <p className="text-sm text-gray-400">Notifications about payments and invoices</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.paymentAlerts}
                      onChange={(e) => setNotifications({...notifications, paymentAlerts: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable 2FA</p>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Enable
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">MacBook Pro - Chrome</p>
                    <p className="text-sm text-gray-400">San Francisco, CA • Current session</p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">iPhone - Safari</p>
                    <p className="text-sm text-gray-400">San Francisco, CA • 2 hours ago</p>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppearanceTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Appearance Settings</h2>
        
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <Sun className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-center text-white font-medium">Light</p>
            </div>
            <div
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                theme === 'dark' ? 'border-blue-500 bg-gray-600' : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <Moon className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-center text-white font-medium">Dark</p>
            </div>
            <div
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                theme === 'system' ? 'border-blue-500 bg-gray-600' : 'border-gray-600 bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <Monitor className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-center text-white font-medium">System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'security':
        return <SecurityTab />;
      case 'appearance':
        return <AppearanceTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
          
          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;