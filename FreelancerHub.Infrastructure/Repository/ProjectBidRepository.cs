using FreelancerHub.Core.DTO;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

using FreelancerHub.Core.Domain.RepositoryContracts;

namespace FreelancerHub.Infrastructure.Repositories
{
    public class ProjectBidRepository : IProjectBidRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectBidRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectBidsDto> GetProjectBidsWithFreelancersAsync(Guid projectId, Guid clientId)
        {
            var project = await _context.Projects
                .AsNoTracking()
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == projectId && p.ClientId == clientId);

            if (project == null)
            {
                throw new KeyNotFoundException("Project not found or you don't have permission to view it");
            }

            var bids = await _context.Bids
                .AsNoTracking()
                .Where(b => b.ProjectId == projectId)
                .Include(b => b.Freelancer)
                    .ThenInclude(f => f.User)
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new FreelancerBidDto
                {
                    BidId = b.Id,
                    Proposal = b.Proposal,
                    Amount = b.Amount,
                    DeliveryDays = b.DeliveryDays,
                    CreatedAt = b.CreatedAt,
                    Status = b.Status,
                    FreelancerId = b.FreelancerId,
                    FreelancerName = b.Freelancer.User!.PersonName,
                    Title = b.Freelancer.Title ?? "Not specified",
                    Country = b.Freelancer.Country ?? "Not specified",
                    City = b.Freelancer.City ?? "Not specified",
                    HourlyRate = b.Freelancer.HourlyRate,
                    Skills = b.Freelancer.Skills ?? new List<string>()
                })
                .ToListAsync();

            return new ProjectBidsDto
            {
                ProjectId = project.Id,
                ProjectTitle = project.Title,
                Bids = bids
            };
        }
    }
}