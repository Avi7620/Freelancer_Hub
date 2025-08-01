using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace FreelancerHub.Infrastructure.Repository
{
    public class FreelancerProfileData : IFreelancerProfileData
    {
        private readonly ApplicationDbContext _dbContext;

        public FreelancerProfileData(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<FreelancerProfile?> GetProfileAsync(Guid userId)
        {
            return await _dbContext.FreelancerProfiles
                .Include(fp => fp.User)
                .FirstOrDefaultAsync(fp => fp.UserId == userId);
        }

        public async Task<FreelancerProfile> UpdateProfileAsync(Guid userId, FreelancerProfile profile)
        {
            var existingProfile = await _dbContext.FreelancerProfiles
                .FirstOrDefaultAsync(fp => fp.UserId == userId);

            if (existingProfile == null)
            {
                throw new ArgumentException("Freelancer profile not found", nameof(userId));
            }

            // Update only the fields that should be updatable
            existingProfile.Country = profile.Country ?? existingProfile.Country;
            existingProfile.City = profile.City ?? existingProfile.City;
            existingProfile.Title = profile.Title ?? existingProfile.Title;
            existingProfile.Description = profile.Description ?? existingProfile.Description;
            existingProfile.Experience = profile.Experience ?? existingProfile.Experience;
            existingProfile.HourlyRate = profile.HourlyRate ?? existingProfile.HourlyRate;
            existingProfile.Availability = profile.Availability ?? existingProfile.Availability;
            existingProfile.Skills = profile.Skills ?? existingProfile.Skills;
            existingProfile.Categories = profile.Categories ?? existingProfile.Categories;

            await _dbContext.SaveChangesAsync();
            return existingProfile;
        }

    }
}