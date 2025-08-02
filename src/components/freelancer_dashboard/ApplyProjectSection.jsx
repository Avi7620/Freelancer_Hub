import React, { useState } from 'react';
import { useEffect } from 'react';
import BiddingModal from './BiddingModal';
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
  Paperclip
} from 'lucide-react';

const ApplyProjectsSection = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBiddingModal, setShowBiddingModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === filterStatus;
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
              {project.clientAvatar}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{project.name}</h3>
              <p className="text-gray-400 text-sm">{project.client}</p>
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

        <p className="text-gray-400 text-sm mb-8 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Budget</div>
            <div className="font-semibold text-emerald-400">${project.budget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">{project.dueDate}</div>
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
              onClick={() => handleApplyClick(project)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center transition-colors"
            >
              Apply Now
            </button>
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
          <h1 className="text-3xl font-bold text-white">Available Projects</h1>
          <p className="text-gray-400 mt-1">Apply to freelance projects, manage them seamlessly, and track your progress — all in one place.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8 w-220 ms-15">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-134"
              />
            </div>
          </div>
        </div>
      </div>

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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
    </div>
  );
};

export default ApplyProjectsSection;