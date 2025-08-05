using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.ServicesContracts
{
    public interface IProjectDetailsService
    {
        Task<ApiResponse<ProjectWithFreelancerDto>> GetProjectDetailsAsync(Guid projectId, Guid clientId);
    }
}
