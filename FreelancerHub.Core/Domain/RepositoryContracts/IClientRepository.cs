using FreelancerHub.Core.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Interfaces
{
    public interface IClientRepository
    {
        Task<ClientProfile> GetClientById(Guid clientId);
        Task<ClientProfile> GetClientWithProjects(Guid clientId);
        Task<bool> UpdateClientCompanyName(Guid clientId, string companyName);
    }
}