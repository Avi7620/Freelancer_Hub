// IClientProjectService.cs
using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.DTO.FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Services
{
    public interface IClientProjectService
    {
        Task<IEnumerable<ProjectWithStatusDto>> GetClientProjectsWithStatusAsync(Guid clientId);
    }
}