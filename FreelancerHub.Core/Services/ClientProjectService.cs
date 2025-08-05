// ClientProjectService.cs
using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.DTO.FreelancerHub.Core.DTO;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Services
{
    public class ClientProjectService : IClientProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IClientRepository _clientRepository;

        public ClientProjectService(
            IProjectRepository projectRepository,
            IClientRepository clientRepository)
        {
            _projectRepository = projectRepository;
            _clientRepository = clientRepository;
        }

        public async Task<IEnumerable<ProjectWithStatusDto>> GetClientProjectsWithStatusAsync(Guid clientId)
        {
         
            var client = await _clientRepository.GetClientById(clientId);
            if (client == null)
            {
                throw new KeyNotFoundException("Client not found");
            }

            // Get all projects for this client
            var projects = await _projectRepository.GetProjectsByClient(clientId);

            // Convert to DTOs with status information
            return projects.Select(p => new ProjectWithStatusDto(p));
        }
    }
}