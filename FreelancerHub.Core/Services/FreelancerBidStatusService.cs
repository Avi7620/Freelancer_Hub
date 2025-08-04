using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.ServicesContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Services
{
    public class FreelancerBidStatusService : IFreelancerBidStatusService
    {
        private readonly IFreelancerBidRepository _bidRepository;

        public FreelancerBidStatusService(IFreelancerBidRepository bidRepository)
        {
            _bidRepository = bidRepository;
        }

        public async Task<ApiResponse<IEnumerable<FreelancerBidStatusDto>>> GetBidStatusesAsync(Guid freelancerId)
        {
            try
            {
                var bids = await _bidRepository.GetBidStatusesAsync(freelancerId);

                return new ApiResponse<IEnumerable<FreelancerBidStatusDto>>
                {
                    Success = true,
                    Status = "SUCCESS",
                    Message = bids.Any() ?
                        "Bid statuses retrieved successfully" :
                        "No bids found for this freelancer",
                    Data = bids
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<FreelancerBidStatusDto>>
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to retrieve bid statuses",
                    Details = ex.Message
                };
            }
        }

        public async Task<ApiResponse<FreelancerBidStatusDto>> GetBidStatusDetailAsync(Guid bidId, Guid freelancerId)
        {
            try
            {
                var bid = await _bidRepository.GetBidStatusDetailAsync(bidId, freelancerId);

                if (bid == null)
                {
                    return new ApiResponse<FreelancerBidStatusDto>
                    {
                        Success = false,
                        Status = "NOT_FOUND",
                        Message = "Bid not found or access denied"
                    };
                }

                return new ApiResponse<FreelancerBidStatusDto>
                {
                    Success = true,
                    Status = "SUCCESS",
                    Message = "Bid details retrieved successfully",
                    Data = bid
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<FreelancerBidStatusDto>
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to retrieve bid details",
                    Details = ex.Message
                };
            }
        }
    }
}
