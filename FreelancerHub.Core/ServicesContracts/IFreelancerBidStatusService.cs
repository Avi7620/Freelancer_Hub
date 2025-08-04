using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.ServicesContracts
{
    public interface IFreelancerBidStatusService
    {
        Task<ApiResponse<IEnumerable<FreelancerBidStatusDto>>> GetBidStatusesAsync(Guid freelancerId);
        Task<ApiResponse<FreelancerBidStatusDto>> GetBidStatusDetailAsync(Guid bidId, Guid freelancerId);
    }
}
