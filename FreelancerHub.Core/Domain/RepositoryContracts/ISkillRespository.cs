using FreelancerHub.Core.Domain.Entities;

namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface ISkillRepository
    {
        Task AddSkillsAsync(Guid freelancerId, List<string> skillNames);
        Task<List<string>> GetSkillsByFreelancerIdAsync(Guid freelancerId);
    }
}
