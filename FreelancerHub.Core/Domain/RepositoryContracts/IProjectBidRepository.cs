using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IProjectBidRepository
    {
        Task<ProjectBidsDto> GetProjectBidsWithFreelancersAsync(Guid projectId, Guid clientId);
    }

}
