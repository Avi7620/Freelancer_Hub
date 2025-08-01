using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Repository
{
    public class FreelancerDataRepository : IFreelancerData
    {
        private readonly ApplicationDbContext _context;
        private readonly ISkillRepository _skillRepository;
        private readonly ICategoryRepository _categoryRepository;

        public FreelancerDataRepository(
            ApplicationDbContext context,
            ISkillRepository skillRepository,
            ICategoryRepository categoryRepository)
        {
            _context = context;
            _skillRepository = skillRepository;
            _categoryRepository = categoryRepository;
        }

        #region Freelancer Profile Operations
        public async Task<FreelancerProfile?> GetFreelancerProfileByIdAsync(Guid userId)
        {
            return await _context.FreelancerProfiles
                .FirstOrDefaultAsync(fp => fp.UserId == userId);
        }

        public async Task CreateFreelancerProfileAsync(FreelancerProfile profile)
        {
            await _context.FreelancerProfiles.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFreelancerProfileAsync(FreelancerProfile profile)
        {
            _context.FreelancerProfiles.Update(profile);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFreelancerProfileAsync(Guid userId)
        {
            var profile = await GetFreelancerProfileByIdAsync(userId);
            if (profile != null)
            {
                _context.FreelancerProfiles.Remove(profile);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> FreelancerProfileExistsAsync(Guid userId)
        {
            return await _context.FreelancerProfiles
                .AnyAsync(fp => fp.UserId == userId);
        }

        public async Task UpdateFreelancerBasicInfoAsync(Guid userId, string title, string description, string experience)
        {
            var profile = await GetFreelancerProfileByIdAsync(userId);
            if (profile != null)
            {
                profile.Title = title;
                profile.Description = description;
                profile.Experience = experience;
                await UpdateFreelancerProfileAsync(profile);
            }
        }

        public async Task UpdateFreelancerLocationAsync(Guid userId, string country, string city)
        {
            var profile = await GetFreelancerProfileByIdAsync(userId);
            if (profile != null)
            {
                profile.Country = country;
                profile.City = city;
                await UpdateFreelancerProfileAsync(profile);
            }
        }

        public async Task UpdateFreelancerRateAvailabilityAsync(Guid userId, decimal? hourlyRate, string availability)
        {
            var profile = await GetFreelancerProfileByIdAsync(userId);
            if (profile != null)
            {
                profile.HourlyRate = hourlyRate;
                profile.Availability = availability;
                await UpdateFreelancerProfileAsync(profile);
            }
        }

        public async Task UpdateFreelancerPortfolioAsync(Guid userId, List<string> portfolioFilePaths)
        {
            var profile = await GetFreelancerProfileByIdAsync(userId);
            if (profile != null)
            {
                profile.PortfolioFilePaths = portfolioFilePaths;
                await UpdateFreelancerProfileAsync(profile);
            }
        }
        #endregion

        #region Skill Operations
        public async Task AddSkillsAsync(Guid freelancerId, List<string> skillNames)
        {
            await _skillRepository.AddSkillsAsync(freelancerId, skillNames);
        }

        public async Task<List<string>> GetSkillsByFreelancerIdAsync(Guid freelancerId)
        {
            return await _skillRepository.GetSkillsByFreelancerIdAsync(freelancerId);
        }

        public async Task RemoveAllSkillsAsync(Guid freelancerId)
        {
            var skills = await _context.Skills
                .Where(s => s.FreelancerId == freelancerId)
                .ToListAsync();

            if (skills.Any())
            {
                _context.Skills.RemoveRange(skills);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveSkillAsync(Guid skillId)
        {
            var skill = await _context.Skills.FindAsync(skillId);
            if (skill != null)
            {
                _context.Skills.Remove(skill);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateSkillAsync(Guid skillId, string newSkillName)
        {
            var skill = await _context.Skills.FindAsync(skillId);
            if (skill != null)
            {
                skill.SkillName = newSkillName;
                _context.Skills.Update(skill);
                await _context.SaveChangesAsync();
            }
        }
        #endregion

        #region Category Operations
        public async Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames)
        {
            await _categoryRepository.AddCategoriesAsync(freelancerId, categoryNames);
        }

        public async Task<List<string>> GetCategoriesByFreelancerIdAsync(Guid freelancerId)
        {
            return await _categoryRepository.GetCategoriesByFreelancerIdAsync(freelancerId);
        }

        public async Task RemoveAllCategoriesAsync(Guid freelancerId)
        {
            var categories = await _context.Categories
                .Where(c => c.FreelancerId == freelancerId)
                .ToListAsync();

            if (categories.Any())
            {
                _context.Categories.RemoveRange(categories);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveCategoryAsync(Guid categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateCategoryAsync(Guid categoryId, string newCategoryName)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category != null)
            {
                category.CategoryName = newCategoryName;
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();
            }
        }
        #endregion

        #region Combined Operations
        public async Task<FreelancerFullProfile> GetFullFreelancerProfileAsync(Guid userId)
        {
            var profile = await _context.FreelancerProfiles
                .Include(fp => fp.User)
                .FirstOrDefaultAsync(fp => fp.UserId == userId);

            if (profile == null) return null;

            var skills = await GetSkillsByFreelancerIdAsync(userId);
            var categories = await GetCategoriesByFreelancerIdAsync(userId);

            return new FreelancerFullProfile
            {
                Profile = profile,
                Skills = skills,
                Categories = categories,
                User = profile.User
            };
        }

        public async Task UpdateFreelancerProfileWithSkillsAndCategoriesAsync(
            Guid userId,
            FreelancerProfile profile,
            List<string> skills,
            List<string> categories)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Update profile
                await UpdateFreelancerProfileAsync(profile);

                // Update skills
                await RemoveAllSkillsAsync(userId);
                if (skills != null && skills.Any())
                {
                    await AddSkillsAsync(userId, skills);
                }

                // Update categories
                await RemoveAllCategoriesAsync(userId);
                if (categories != null && categories.Any())
                {
                    await AddCategoriesAsync(userId, categories);
                }

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        #endregion
    }
}