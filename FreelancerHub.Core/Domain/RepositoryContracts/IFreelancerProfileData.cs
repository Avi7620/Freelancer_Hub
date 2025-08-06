using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IFreelancerProfileData
    {
        Task<FreelancerProfile?> GetProfileAsync(Guid userId);

        Task<FreelancerProfile> UpdateProfileAsync(Guid userId, FreelancerProfile profile);

        Task<string> GetFreelancerEmailAsync(Guid freelancerId);


    }
}
