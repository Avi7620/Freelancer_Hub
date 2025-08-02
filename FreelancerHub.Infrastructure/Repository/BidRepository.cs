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
    public class BidRepository : IBidRepository
    {
        private readonly ApplicationDbContext _context;

        public BidRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Bid> GetBidByIdAsync(Guid bidId)
        {
            return await _context.Bids
                .Include(b => b.Project)
                    .ThenInclude(p => p.Client)
                        .ThenInclude(c => c.User)
                .Include(b => b.Freelancer)
                .FirstOrDefaultAsync(b => b.Id == bidId);
        }

        public async Task<IEnumerable<Bid>> GetBidsByProjectAsync(Guid projectId)
        {
            return await _context.Bids
                .Where(b => b.ProjectId == projectId)
                .Include(b => b.Freelancer)
                .ToListAsync();
        }

        public async Task<IEnumerable<Bid>> GetBidsByFreelancerAsync(Guid freelancerId)
        {
            return await _context.Bids
                .Where(b => b.FreelancerId == freelancerId)
                .Include(b => b.Project)
                .ToListAsync();
        }

        public async Task<Bid> AddBidAsync(Bid bid)
        {
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();
            return bid;
        }

        public async Task UpdateBidAsync(Bid bid)
        {
            _context.Bids.Update(bid);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBidAsync(Guid bidId)
        {
            var bid = await _context.Bids.FindAsync(bidId);
            if (bid != null)
            {
                _context.Bids.Remove(bid);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> BidExistsForProject(Guid freelancerId, Guid projectId)
        {
            return await _context.Bids
                .AnyAsync(b => b.FreelancerId == freelancerId && b.ProjectId == projectId);
        }

        public async Task<int> GetBidCountForProjectAsync(Guid projectId)
        {
            return await _context.Bids
                .CountAsync(b => b.ProjectId == projectId);
        }


    }
}