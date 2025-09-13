using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Enums;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Interfaces
{
    public interface IProjectRepository
    {
        // CRUD Operations
        Task<Project> CreateProject(Project project);
        Task<Project> GetProjectById(Guid projectId);
        Task<IEnumerable<Project>> GetAllProjects();
        Task<Project> UpdateProject(Project project);
        Task<bool> DeleteProject(Guid projectId);

        // Project-Specific Operations
        Task<IEnumerable<Project>> GetProjectsByClient(Guid clientId);
        Task<IEnumerable<Project>> GetProjectsByStatus(ProjectStatus status);
        Task<IEnumerable<Project>> GetProjectsWithBids();
        Task<Project> GetProjectWithBids(Guid projectId);
        Task<bool> AssignFreelancerToProject(Guid projectId, Guid freelancerId);
        Task<bool> ChangeProjectStatus(Guid projectId, ProjectStatus newStatus);
        Task<IEnumerable<Project>> GetProjectsByFreelancer(Guid freelancerId);
        Task<int> GetProjectCountByClient(Guid clientId);
        Task<decimal> GetTotalBudgetByClient(Guid clientId);
    }
}