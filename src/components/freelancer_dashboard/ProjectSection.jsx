import React, { useState } from 'react';
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

const ProjectsSection = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'SaaS Dashboard Redesign',
      client: 'TechFlow Inc.',
      clientAvatar: 'TF',
      status: 'In Progress',
      priority: 'High',
      progress: 85,
      budget: 4500,
      spent: 3825,
      startDate: '2024-12-01',
      dueDate: '2025-01-20',
      description: 'Complete redesign of the existing dashboard with modern UI/UX principles',
      tags: ['UI/UX', 'React', 'Dashboard'],
      team: ['John Doe', 'Jane Smith'],
      files: 12,
      tasks: { completed: 17, total: 20 },
      statusColor: 'bg-blue-500',
      priorityColor: 'text-red-400'
    },
    {
      id: 2,
      name: 'Mobile App UI Kit',
      client: 'StartupLab',
      clientAvatar: 'SL',
      status: 'Design Phase',
      priority: 'Medium',
      progress: 60,
      budget: 3200,
      spent: 1920,
      startDate: '2024-12-15',
      dueDate: '2025-01-25',
      description: 'Comprehensive UI kit for mobile applications with 50+ components',
      tags: ['Mobile', 'UI Kit', 'Figma'],
      team: ['John Doe'],
      files: 8,
      tasks: { completed: 12, total: 20 },
      statusColor: 'bg-yellow-500',
      priorityColor: 'text-yellow-400'
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      client: 'RetailPro',
      clientAvatar: 'RP',
      status: 'Review',
      priority: 'High',
      progress: 95,
      budget: 6800,
      spent: 6460,
      startDate: '2024-11-01',
      dueDate: '2025-01-15',
      description: 'Full-stack e-commerce solution with payment integration',
      tags: ['E-commerce', 'Full-stack', 'Payment'],
      team: ['John Doe', 'Mike Johnson', 'Sarah Wilson'],
      files: 24,
      tasks: { completed: 19, total: 20 },
      statusColor: 'bg-green-500',
      priorityColor: 'text-red-400'
    },
    {
      id: 4,
      name: 'Brand Identity Package',
      client: 'Creative Studio',
      clientAvatar: 'CS',
      status: 'Research',
      priority: 'Low',
      progress: 40,
      budget: 2100,
      spent: 840,
      startDate: '2025-01-01',
      dueDate: '2025-02-01',
      description: 'Complete brand identity including logo, guidelines, and marketing materials',
      tags: ['Branding', 'Logo', 'Guidelines'],
      team: ['John Doe'],
      files: 5,
      tasks: { completed: 8, total: 20 },
      statusColor: 'bg-purple-500',
      priorityColor: 'text-green-400'
    },
    {
      id: 5,
      name: 'Website Optimization',
      client: 'Digital Agency',
      clientAvatar: 'DA',
      status: 'Completed',
      priority: 'Medium',
      progress: 100,
      budget: 1800,
      spent: 1800,
      startDate: '2024-11-15',
      dueDate: '2024-12-30',
      description: 'Performance optimization and SEO improvements for existing website',
      tags: ['SEO', 'Performance', 'Analytics'],
      team: ['John Doe', 'Alex Brown'],
      files: 15,
      tasks: { completed: 15, total: 15 },
      statusColor: 'bg-emerald-500',
      priorityColor: 'text-yellow-400'
    },
    {
      id: 6,
      name: 'API Documentation',
      client: 'DevTools Co.',
      clientAvatar: 'DT',
      status: 'On Hold',
      priority: 'Low',
      progress: 25,
      budget: 1500,
      spent: 375,
      startDate: '2024-12-20',
      dueDate: '2025-02-15',
      description: 'Comprehensive API documentation with interactive examples',
      tags: ['Documentation', 'API', 'Technical Writing'],
      team: ['John Doe'],
      files: 3,
      tasks: { completed: 5, total: 20 },
      statusColor: 'bg-gray-500',
      priorityColor: 'text-green-400'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'design-phase', label: 'Design Phase' },
    { value: 'review', label: 'Review' },
    { value: 'research', label: 'Research' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

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
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${project.statusColor} bg-opacity-20 text-white`}>
              {project.status}
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`${project.statusColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Budget</div>
            <div className="font-semibold text-emerald-400">${project.budget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Spent</div>
            <div className="font-semibold text-white">${project.spent.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">{project.dueDate}</div>
          </div>
          <div>
            <div className="text-gray-400">Tasks</div>
            <div className="font-semibold text-white">{project.tasks.completed}/{project.tasks.total}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{project.team.length} members</span>
            <Paperclip className="w-4 h-4 text-gray-400 ml-2" />
            <span className="text-sm text-gray-400">{project.files} files</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-400 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
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
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage and track all your freelance projects</p>
        </div>
        <button 
          onClick={() => setShowNewProject(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Create New Project</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Project description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="UI/UX, React, Dashboard (comma separated)"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;