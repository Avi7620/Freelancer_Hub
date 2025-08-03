using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Core.Services;
using FreelancerHub.Core.ServicesContracts;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Services
{
    public class ClientBidService : IClientBidService
    {
        private readonly IProjectBidRepository _bidRepository;
        private readonly IClientRepository _clientRepository;

        public ClientBidService(
            IProjectBidRepository bidRepository,
            IClientRepository clientRepository)
        {
            _bidRepository = bidRepository;
            _clientRepository = clientRepository;
        }

        public async Task<ProjectBidsDto> GetProjectBidsAsync(Guid projectId, Guid clientId)
        {
            // Verify client exists
            var client = await _clientRepository.GetClientById(clientId);
            if (client == null)
            {
                throw new UnauthorizedAccessException("Invalid client credentials");
            }

            return await _bidRepository.GetProjectBidsWithFreelancersAsync(projectId, clientId);
        }
    }
}