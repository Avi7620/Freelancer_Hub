using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Project> CreateProject(Project project)
        {
            project.CreatedAt = DateTime.UtcNow;
            project.Status = ProjectStatus.Open;

            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> GetProjectById(Guid projectId)
        {
            return await _context.Projects
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .Include(p => p.AcceptedFreelancer)
                    .ThenInclude(f => f.User)
                .Include(p => p.Bids)
                    .ThenInclude(b => b.Freelancer)
                        .ThenInclude(f => f.User)
                .FirstOrDefaultAsync(p => p.Id == projectId);
        }

        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _context.Projects
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .Include(p => p.AcceptedFreelancer)
                    .ThenInclude(f => f.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Project> UpdateProject(Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<bool> DeleteProject(Guid projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null) return false;

            _context.Projects.Remove(project);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Project>> GetProjectsByClient(Guid clientId)
        {
            return await _context.Projects
                .Where(p => p.ClientId == clientId)
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .Include(p => p.Bids)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectsByStatus(ProjectStatus status)
        {
            return await _context.Projects
                .Where(p => p.Status == status)
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .Include(p => p.AcceptedFreelancer)
                    .ThenInclude(f => f.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetProjectsWithBids()
        {
            return await _context.Projects
                .Include(p => p.Bids)
                    .ThenInclude(b => b.Freelancer)
                        .ThenInclude(f => f.User)
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .Where(p => p.Bids.Any())
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Project> GetProjectWithBids(Guid projectId)
        {
            return await _context.Projects
                .Include(p => p.Bids)
                    .ThenInclude(b => b.Freelancer)
                        .ThenInclude(f => f.User)
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(p => p.Id == projectId);
        }

        public async Task<bool> AssignFreelancerToProject(Guid projectId, Guid freelancerId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null) return false;

            project.AcceptedFreelancerId = freelancerId;
            project.Status = ProjectStatus.InProgress;

            // Update all bids for this project
            var bids = await _context.Bids
                .Where(b => b.ProjectId == projectId)
                .ToListAsync();

            foreach (var bid in bids)
            {
                bid.Status = bid.FreelancerId == freelancerId ?
                    BidStatus.Accepted :
                    BidStatus.Rejected;
            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ChangeProjectStatus(Guid projectId, ProjectStatus newStatus)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null) return false;

            project.Status = newStatus;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Project>> GetProjectsByFreelancer(Guid freelancerId)
        {
            return await _context.Projects
                .Where(p => p.AcceptedFreelancerId == freelancerId)
                .Include(p => p.Client)
                    .ThenInclude(c => c.User)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<int> GetProjectCountByClient(Guid clientId)
        {
            return await _context.Projects
                .CountAsync(p => p.ClientId == clientId);
        }

        public async Task<decimal> GetTotalBudgetByClient(Guid clientId)
        {
            return await _context.Projects
                .Where(p => p.ClientId == clientId)
                .SumAsync(p => p.Budget);
        }
    }
}