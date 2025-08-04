using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Repository
{
    public class FreelancerBidRepository : IFreelancerBidRepository
    {
        private readonly ApplicationDbContext _context;

        public FreelancerBidRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FreelancerBidStatusDto>> GetBidStatusesAsync(Guid freelancerId)
        {
            return await _context.Bids
                .Where(b => b.FreelancerId == freelancerId)
                .Include(b => b.Project)
                    .ThenInclude(p => p.Client)
                        .ThenInclude(c => c.User)
                .Select(b => new FreelancerBidStatusDto
                {
                    BidId = b.Id,
                    ProjectId = b.ProjectId,
                    ProjectTitle = b.Project.Title,
                    ProjectDescription = b.Project.Description,
                    ProjectBudget = b.Project.Budget,
                    ProjectDeadline = b.Project.Deadline,
                    ClientName = b.Project.Client.User.PersonName,
                    CompanyName = b.Project.Client.CompanyName ?? "Not specified",
                    Proposal = b.Proposal,
                    Amount = b.Amount,
                    DeliveryDays = b.DeliveryDays,
                    CreatedAt = b.CreatedAt,
                    Status = b.Status
                })
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        public async Task<FreelancerBidStatusDto?> GetBidStatusDetailAsync(Guid bidId, Guid freelancerId)
        {
            return await _context.Bids
                .Where(b => b.Id == bidId && b.FreelancerId == freelancerId)
                .Include(b => b.Project)
                    .ThenInclude(p => p.Client)
                        .ThenInclude(c => c.User)
                .Select(b => new FreelancerBidStatusDto
                {
                    BidId = b.Id,
                    ProjectId = b.ProjectId,
                    ProjectTitle = b.Project.Title,
                    ProjectDescription = b.Project.Description,
                    ProjectBudget = b.Project.Budget,
                    ProjectDeadline = b.Project.Deadline,
                    ClientName = b.Project.Client.User.PersonName,
                    CompanyName = b.Project.Client.CompanyName ?? "Not specified",
                    Proposal = b.Proposal,
                    Amount = b.Amount,
                    DeliveryDays = b.DeliveryDays,
                    CreatedAt = b.CreatedAt,
                    Status = b.Status
                })
                .FirstOrDefaultAsync();
        }
    }
}
