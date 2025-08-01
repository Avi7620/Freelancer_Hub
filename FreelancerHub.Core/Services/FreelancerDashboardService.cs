using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.ServicesContracts;
using FreelancerHub.Core.Domain.Entities;

namespace FreelancerHub.Core.Services
{
    public class FreelancerDashboardService :  IFreelancerDashboardService
    {
        private readonly IFreelancerData _freelancerData;

        public FreelancerDashboardService(IFreelancerData freelancerData)
        {
            _freelancerData = freelancerData;
        }

        #region Profile Operations
        public async Task<FreelancerProfile?> GetProfileAsync(Guid userId)
        {
            return await _freelancerData.GetFreelancerProfileByIdAsync(userId);
        }

        public async Task CreateProfileAsync(FreelancerProfile profile)
        {
            await _freelancerData.CreateFreelancerProfileAsync(profile);
        }

        public async Task UpdateProfileAsync(FreelancerProfile profile)
        {
            await _freelancerData.UpdateFreelancerProfileAsync(profile);
        }

        public async Task DeleteProfileAsync(Guid userId)
        {
            await _freelancerData.DeleteFreelancerProfileAsync(userId);
        }

        public async Task<bool> ProfileExistsAsync(Guid userId)
        {
            return await _freelancerData.FreelancerProfileExistsAsync(userId);
        }

        public async Task UpdateBasicInfoAsync(Guid userId, string title, string description, string experience)
        {
            await _freelancerData.UpdateFreelancerBasicInfoAsync(userId, title, description, experience);
        }

        public async Task UpdateLocationAsync(Guid userId, string country, string city)
        {
            await _freelancerData.UpdateFreelancerLocationAsync(userId, country, city);
        }

        public async Task UpdateRateAndAvailabilityAsync(Guid userId, decimal? hourlyRate, string availability)
        {
            await _freelancerData.UpdateFreelancerRateAvailabilityAsync(userId, hourlyRate, availability);
        }

        public async Task UpdatePortfolioAsync(Guid userId, List<string> portfolioFilePaths)
        {
            await _freelancerData.UpdateFreelancerPortfolioAsync(userId, portfolioFilePaths);
        }
        #endregion

        #region Skill Operations
        public async Task AddSkillsAsync(Guid freelancerId, List<string> skillNames)
        {
            await _freelancerData.AddSkillsAsync(freelancerId, skillNames);
        }

        public async Task<List<string>> GetSkillsAsync(Guid freelancerId)
        {
            return await _freelancerData.GetSkillsByFreelancerIdAsync(freelancerId);
        }

        public async Task RemoveAllSkillsAsync(Guid freelancerId)
        {
            await _freelancerData.RemoveAllSkillsAsync(freelancerId);
        }

        public async Task RemoveSkillAsync(Guid skillId)
        {
            await _freelancerData.RemoveSkillAsync(skillId);
        }

        public async Task UpdateSkillAsync(Guid skillId, string newSkillName)
        {
            await _freelancerData.UpdateSkillAsync(skillId, newSkillName);
        }
        #endregion

        #region Category Operations
        public async Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames)
        {
            await _freelancerData.AddCategoriesAsync(freelancerId, categoryNames);
        }

        public async Task<List<string>> GetCategoriesAsync(Guid freelancerId)
        {
            return await _freelancerData.GetCategoriesByFreelancerIdAsync(freelancerId);
        }

        public async Task RemoveAllCategoriesAsync(Guid freelancerId)
        {
            await _freelancerData.RemoveAllCategoriesAsync(freelancerId);
        }

        public async Task RemoveCategoryAsync(Guid categoryId)
        {
            await _freelancerData.RemoveCategoryAsync(categoryId);
        }

        public async Task UpdateCategoryAsync(Guid categoryId, string newCategoryName)
        {
            await _freelancerData.UpdateCategoryAsync(categoryId, newCategoryName);
        }
        #endregion



        #region Dashboard Operations
        public async Task<FreelancerFullProfile> GetFullProfileAsync(Guid userId)
        {
            return await _freelancerData.GetFullFreelancerProfileAsync(userId);
        }

        public async Task UpdateProfileWithSkillsAndCategoriesAsync(
            Guid userId,
            FreelancerProfile profile,
            List<string> skills,
            List<string> categories)
        {
            await _freelancerData.UpdateFreelancerProfileWithSkillsAndCategoriesAsync(
                userId, profile, skills, categories);
        }
        #endregion
    }
}