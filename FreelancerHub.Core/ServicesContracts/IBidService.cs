using FreelancerHub.Core.Domain.Entities;

using FreelancerHub.Core.DTO;

namespace FreelancerHub.Core.Services
{
    public interface IBidService
    {
        Task<ProjectWithClientDto> GetProjectWithClientInfo(Guid projectId);
        Task<Bid> SubmitBidAsync(BidSubmissionDto bidDto, Guid freelancerId);

        Task<BidDetailsDto> GetBidDetailsAsync(Guid bidId, Guid freelancerId);
    }
}