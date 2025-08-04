using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Repositories
{
    public class ProjectAssignmentRepository : IProjectAssignmentRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectAssignmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AssignProjectToFreelancerAsync(Guid projectId, Guid freelancerId, Guid clientId)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Get project with bids
                var project = await _context.Projects
                    .Include(p => p.Bids)
                    .FirstOrDefaultAsync(p => p.Id == projectId && p.ClientId == clientId);

                if (project == null) return false;

                // Update project status
                project.AcceptedFreelancerId = freelancerId;
                project.Status = ProjectStatus.InProgress;

                // Update all bids
                foreach (var bid in project.Bids)
                {
                    bid.Status = bid.FreelancerId == freelancerId
                        ? BidStatus.Accepted
                        : BidStatus.Rejected;
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> IsValidAssignmentAsync(Guid projectId, Guid freelancerId, Guid clientId)
        {
            return await _context.Projects.AnyAsync(p =>
                p.Id == projectId &&
                p.ClientId == clientId &&
                p.Bids.Any(b => b.FreelancerId == freelancerId));
        }
    }
}