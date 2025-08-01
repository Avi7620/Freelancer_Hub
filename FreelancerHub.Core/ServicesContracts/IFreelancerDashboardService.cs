using FreelancerHub.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.ServicesContracts
{
    public interface IFreelancerDashboardService
    {
        #region Profile Operations
        Task<FreelancerProfile?> GetProfileAsync(Guid userId);
        Task CreateProfileAsync(FreelancerProfile profile);
        Task UpdateProfileAsync(FreelancerProfile profile);
        Task DeleteProfileAsync(Guid userId);
        Task<bool> ProfileExistsAsync(Guid userId);

        Task UpdateBasicInfoAsync(Guid userId, string title, string description, string experience);
        Task UpdateLocationAsync(Guid userId, string country, string city);
        Task UpdateRateAndAvailabilityAsync(Guid userId, decimal? hourlyRate, string availability);
        Task UpdatePortfolioAsync(Guid userId, List<string> portfolioFilePaths);
        #endregion

        #region Skill Operations
        Task AddSkillsAsync(Guid freelancerId, List<string> skillNames);
        Task<List<string>> GetSkillsAsync(Guid freelancerId);
        Task RemoveAllSkillsAsync(Guid freelancerId);
        Task RemoveSkillAsync(Guid skillId);
        Task UpdateSkillAsync(Guid skillId, string newSkillName);
        #endregion

        #region Category Operations
        Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames);
        Task<List<string>> GetCategoriesAsync(Guid freelancerId);
        Task RemoveAllCategoriesAsync(Guid freelancerId);
        Task RemoveCategoryAsync(Guid categoryId);
        Task UpdateCategoryAsync(Guid categoryId, string newCategoryName);
        #endregion

        #region Dashboard Operations
        Task<FreelancerFullProfile> GetFullProfileAsync(Guid userId);
        Task UpdateProfileWithSkillsAndCategoriesAsync(
            Guid userId,
            FreelancerProfile profile,
            List<string> skills,
            List<string> categories);
        #endregion
    }
}
