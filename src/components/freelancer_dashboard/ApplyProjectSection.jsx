<<<<<<< HEAD
import React, { useState } from 'react';
import { useEffect } from 'react';
import BiddingModal from './BiddingModal';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
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
  Loader2,
  RefreshCw
} from 'lucide-react';

const ApplyProjectsSection = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBiddingModal, setShowBiddingModal] = useState(false);
=======
  const [showNewProject, setShowNewProject] = useState(false);
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('jwt_token') || localStorage.getItem('token') || localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }
        
        // Configure axios request with JWT token
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        // Replace with your actual API endpoint
        const response = await fetch.get('https://localhost:7039/api/freelancer/FreelancerAvailableProjects', config);
        
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        
        // Handle different types of errors
        if (err.response) {
          // Server responded with error status
          if (err.response.status === 401) {
            setError('Authentication failed. Please log in again.');
            // Optionally redirect to login page
            // window.location.href = '/login';
          } else if (err.response.status === 403) {
            setError('Access denied. You don\'t have permission to view projects.');
          } else {
            setError(`Server error: ${err.response.data?.message || err.response.statusText}`);
          }
        } else if (err.request) {
          // Network error
          setError('Network error. Please check your connection and try again.');
        } else {
          // Other errors (including token not found)
          setError(err.message);
        }
        
        // Fallback to mock data for development
        setProjects([
          {
            id: 1,
            name: 'E-commerce Website Development',
            client: 'RetailCorp Ltd.',
            clientAvatar: 'RC',
            budget: 8500,
            startDate: '2024-12-15',
            dueDate: '2025-02-28',
            description: 'Build a modern e-commerce platform with React, Node.js, and payment integration. Need responsive design and admin dashboard.',
            tags: ['React', 'Node.js', 'E-commerce', 'Payment Integration'],
            status: 'open',
            applicants: 12,
            postedDate: '2024-11-20',
            clientRating: 4.8,
            urgency: 'medium'
          },
          {
            id: 2,
            name: 'Mobile App UI/UX Design',
            client: 'StartupXYZ',
            clientAvatar: 'SX',
            budget: 3200,
            startDate: '2024-12-10',
            dueDate: '2025-01-15',
            description: 'Design a complete mobile app interface for a fitness tracking application. Need wireframes, prototypes, and final designs.',
            tags: ['UI/UX', 'Mobile Design', 'Figma', 'Prototyping'],
            status: 'open',
            applicants: 8,
            postedDate: '2024-11-18',
            clientRating: 4.6,
            urgency: 'high'
          },
          {
            id: 3,
            name: 'SaaS Dashboard Redesign',
            client: 'TechFlow Inc.',
            clientAvatar: 'TF',
            budget: 4500,
            startDate: '2024-12-01',
            dueDate: '2025-01-20',
            description: 'Complete redesign of existing dashboard with modern UI/UX principles. Focus on data visualization and user experience.',
            tags: ['UI/UX', 'React', 'Dashboard', 'Data Visualization'],
            status: 'open',
            applicants: 15,
            postedDate: '2024-11-15',
            clientRating: 4.9,
            urgency: 'medium'
          },
          {
            id: 4,
            name: 'WordPress Plugin Development',
            client: 'WebSolutions Pro',
            clientAvatar: 'WS',
            budget: 2800,
            startDate: '2024-12-05',
            dueDate: '2025-01-10',
            description: 'Develop a custom WordPress plugin for inventory management. Need admin interface and frontend display components.',
            tags: ['WordPress', 'PHP', 'Plugin Development', 'MySQL'],
            status: 'open',
            applicants: 6,
            postedDate: '2024-11-22',
            clientRating: 4.7,
            urgency: 'low'
          },
          {
            id: 5,
            name: 'Brand Identity & Logo Design',
            client: 'Creative Agency Co.',
            clientAvatar: 'CA',
            budget: 1500,
            startDate: '2024-12-08',
            dueDate: '2024-12-30',
            description: 'Create complete brand identity including logo, color palette, typography, and brand guidelines for a new tech startup.',
            tags: ['Logo Design', 'Brand Identity', 'Illustrator', 'Brand Guidelines'],
            status: 'open',
            applicants: 20,
            postedDate: '2024-11-25',
            clientRating: 4.5,
            urgency: 'high'
          },
          {
            id: 6,
            name: 'Python Data Analysis Script',
            client: 'DataTech Solutions',
            clientAvatar: 'DT',
            budget: 1200,
            startDate: '2024-12-12',
            dueDate: '2025-01-05',
            description: 'Develop Python scripts for automated data analysis and reporting. Need pandas, matplotlib integration and CSV export functionality.',
            tags: ['Python', 'Data Analysis', 'Pandas', 'Automation'],
            status: 'open',
            applicants: 9,
            postedDate: '2024-11-28',
            clientRating: 4.8,
            urgency: 'medium'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

=======
  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get token from localStorage - check multiple possible keys
      const token = localStorage.getItem('token') || 
                   localStorage.getItem('authToken') || 
                   localStorage.getItem('accessToken') ||
                   localStorage.getItem('jwt') ||
                   localStorage.getItem('bearerToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login first.');
      }
      
      // Prepare headers with token
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      };
      
      console.log('Making API request with token:', token ? 'Token present' : 'No token');
      
      const response = await fetch('https://localhost:7039/api/freelancer/FreelancerAvailableProjects', {
        method: 'GET',
        headers,
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        // Handle unauthorized access
        if (response.status === 401) {
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('authToken');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('jwt');
          localStorage.removeItem('bearerToken');
          throw new Error('Session expired. Please login again.');
        }
        if (response.status === 403) {
          throw new Error('Access forbidden. You do not have permission to view projects.');
        }
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      // Assuming the API returns an array of projects
      // If the API returns data in a different structure (e.g., { projects: [...] }), adjust accordingly
      setProjects(Array.isArray(data) ? data : data.projects || []);
      
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to fetch projects. Please try again.');
      
      // If it's an auth error, you might want to redirect to login
      if (err.message.includes('login') || err.message.includes('Session expired')) {
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // If the API includes status field, use it for filtering
    const matchesFilter = filterStatus === 'all' || 
                         (project.status && project.status.toLowerCase().replace(' ', '-') === filterStatus);
    
    return matchesSearch && matchesFilter;
  });

  const handleApplyClick = (project) => {
    setSelectedProject(project);
    setShowBiddingModal(true);
  };

  const handleCloseBiddingModal = () => {
    setShowBiddingModal(false);
    setSelectedProject(null);
  };

  const ProjectCard = ({ project }) => (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold">
              {`${project.companyName?.charAt(0)}${project.companyName?.charAt(1)}` || 'P'}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{project.title || 'Untitled Project'}</h3>
              <p className="text-gray-400 text-sm">{project.companyName || 'Unknown Client'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {project.urgency === 'high' && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg border border-red-500/30">
                Urgent
              </span>
            )}
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Users className="w-3 h-3" />
              <span>{project.applicants}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-8 line-clamp-2">
          {project.description || 'No description available'}
        </p>

{project.requiredSkills &&  
  JSON.parse(project.requiredSkills)
    .filter(skill => skill && skill.trim() !== '').length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {JSON.parse(project.requiredSkills)
        .filter(skill => skill && skill.trim() !== '')
        .map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg">
            {skill.trim()}
          </span>
        ))
      }
    </div>
)}

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Budget</div>
            <div className="font-semibold text-emerald-400">
              ${project.budget ? project.budget.toLocaleString() : 'TBD'}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">
              {project.deadline || project.endDate || 'TBD'}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Client Rating</div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="font-semibold text-white">{project.clientRating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
<<<<<<< HEAD
              onClick={() => handleApplyClick(project)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center transition-colors"
            >
              Apply Now
=======
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center transition-colors"
              onClick={() => {
                // Handle project application logic here
                console.log('Applying to project:', project.id);
              }}
            > 
              Apply 
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
      <h3 className="text-xl font-semibold text-gray-400 mb-2">Failed to load projects</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <div className="flex flex-col items-center space-y-3">
        {error.includes('login') || error.includes('Session expired') ? (
          <button
            onClick={() => {
              // Redirect to login or show login modal
              alert('Please login to continue');
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
      <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
      <p className="text-gray-500">
        {searchTerm || filterStatus !== 'all' 
          ? 'Try adjusting your search or filter criteria' 
          : 'No projects available at the moment'}
      </p>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Available Projects</h1>
          <p className="text-gray-400 mt-1">Apply to freelance projects, manage them seamlessly, and track your progress — all in one place.</p>
        </div>
        <button
          onClick={fetchProjects}
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-160"
              />
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-400">Loading projects...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Projects</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            Retry
          </button>
        </div>
=======
      {/* Content */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState />
      ) : filteredProjects.length === 0 ? (
        <EmptyState />
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
<<<<<<< HEAD
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Bidding Modal */}
      <BiddingModal
        project={selectedProject}
        isOpen={showBiddingModal}
        onClose={handleCloseBiddingModal}
      />
=======
        </div>
      )}
>>>>>>> 76c1fb46aab177111a15db3fead74a6ec03e0d8d
    </div>
  );
};

export default ApplyProjectsSection;