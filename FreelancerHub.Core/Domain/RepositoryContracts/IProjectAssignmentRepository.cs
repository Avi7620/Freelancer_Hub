using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IProjectAssignmentRepository
    {
        Task<bool> AssignProjectToFreelancerAsync(Guid projectId, Guid freelancerId, Guid clientId);
        Task<bool> IsValidAssignmentAsync(Guid projectId, Guid freelancerId, Guid clientId);
    }
}
