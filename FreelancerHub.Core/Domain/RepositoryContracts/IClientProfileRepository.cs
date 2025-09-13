using FreelancerHub.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IClientProfileRepository
    {
        Task<ClientProfile?> GetClientProfileAsync(Guid userId);
        Task<bool> UpdateClientProfileAsync(ClientProfile profile);
    }

}
