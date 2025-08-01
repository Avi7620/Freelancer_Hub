using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.IdentityEntities;


namespace FreelancerHub.Core.Domain.RepositoryContracts
{
    public interface IFreelancerData
    {
        #region Freelancer Profile Operations
        Task<FreelancerProfile?> GetFreelancerProfileByIdAsync(Guid userId);
        Task CreateFreelancerProfileAsync(FreelancerProfile profile);
        Task UpdateFreelancerProfileAsync(FreelancerProfile profile);
        Task DeleteFreelancerProfileAsync(Guid userId);
        Task<bool> FreelancerProfileExistsAsync(Guid userId);

        // Additional profile-related methods
        Task UpdateFreelancerBasicInfoAsync(Guid userId, string title, string description, string experience);
        Task UpdateFreelancerLocationAsync(Guid userId, string country, string city);
        Task UpdateFreelancerRateAvailabilityAsync(Guid userId, decimal? hourlyRate, string availability);
        Task UpdateFreelancerPortfolioAsync(Guid userId, List<string> portfolioFilePaths);
        #endregion

        #region Skill Operations
        Task AddSkillsAsync(Guid freelancerId, List<string> skillNames);
        Task<List<string>> GetSkillsByFreelancerIdAsync(Guid freelancerId);
        Task RemoveAllSkillsAsync(Guid freelancerId);
        Task RemoveSkillAsync(Guid skillId);
        Task UpdateSkillAsync(Guid skillId, string newSkillName);
        #endregion

        #region Category Operations
        Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames);
        Task<List<string>> GetCategoriesByFreelancerIdAsync(Guid freelancerId);
        Task RemoveAllCategoriesAsync(Guid freelancerId);
        Task RemoveCategoryAsync(Guid categoryId);
        Task UpdateCategoryAsync(Guid categoryId, string newCategoryName);
        #endregion

        #region Combined Operations
        Task<FreelancerFullProfile> GetFullFreelancerProfileAsync(Guid userId);
        Task UpdateFreelancerProfileWithSkillsAndCategoriesAsync(
            Guid userId,
            FreelancerProfile profile,
            List<string> skills,
            List<string> categories);
        #endregion
    }

    // Optional: A view model that combines all freelancer data

}