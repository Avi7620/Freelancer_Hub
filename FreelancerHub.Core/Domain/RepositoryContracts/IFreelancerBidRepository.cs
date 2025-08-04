using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IFreelancerBidRepository
    {
        Task<IEnumerable<FreelancerBidStatusDto>> GetBidStatusesAsync(Guid freelancerId);
        Task<FreelancerBidStatusDto?> GetBidStatusDetailAsync(Guid bidId, Guid freelancerId);
    }
}
