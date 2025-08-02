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
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'SaaS Dashboard Redesign',
      client: 'TechFlow Inc.',
      clientAvatar: 'TF',
      budget: 4500,
      startDate: '2024-12-01',
      dueDate: '2025-01-20',
      description: 'Complete redesign of the existing dashboard with modern UI/UX principles',
      tags: ['UI/UX', 'React', 'Dashboard'],
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
        </div>

        <p className="text-gray-400 text-sm mb-8 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Budget</div>
            <div className="font-semibold text-emerald-400">${project.budget.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">{project.dueDate}</div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <button type="button" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center transition-colors"
            > Apply </button>
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

    </div>
  );
};

export default ProjectsSection;