using FreelancerHub.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Interfaces
{
    public interface IBidRepository
    {
        Task<Bid> GetBidByIdAsync(Guid bidId);
        Task<IEnumerable<Bid>> GetBidsByProjectAsync(Guid projectId);
        Task<IEnumerable<Bid>> GetBidsByFreelancerAsync(Guid freelancerId);
        Task<Bid> AddBidAsync(Bid bid);
        Task UpdateBidAsync(Bid bid);
        Task DeleteBidAsync(Guid bidId);
        Task<bool> BidExistsForProject(Guid freelancerId, Guid projectId);
        Task<int> GetBidCountForProjectAsync(Guid projectId);


    }
}