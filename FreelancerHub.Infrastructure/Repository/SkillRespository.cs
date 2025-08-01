using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FreelancerHub.Infrastructure.Repository
{
    public class SkillRepository : ISkillRepository
    {
        private readonly ApplicationDbContext _context;

        public SkillRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddSkillsAsync(Guid freelancerId, List<string> skillNames)
        {
            // Check that freelancer exists
            var exists = await _context.FreelancerProfiles.AnyAsync(f => f.UserId == freelancerId);
            if (!exists)
                throw new Exception("Freelancer not found");

            // Handle case where skills might come as JSON array string
            var skillsToAdd = new List<Skill>();

            foreach (var skillInput in skillNames)
            {
                // Check if the input is a JSON array
                if (skillInput.TrimStart().StartsWith("["))
                {
                    try
                    {
                        var skillArray = JsonSerializer.Deserialize<List<string>>(skillInput);
                        foreach (var skillName in skillArray)
                        {
                            skillsToAdd.Add(new Skill
                            {
                                FreelancerId = freelancerId,
                                SkillName = skillName.Trim()
                            });
                        }
                    }
                    catch (JsonException)
                    {
                        // If not valid JSON, treat as single skill
                        skillsToAdd.Add(new Skill
                        {
                            FreelancerId = freelancerId,
                            SkillName = skillInput.Trim()
                        });
                    }
                }
                else
                {
                    // Regular single skill
                    skillsToAdd.Add(new Skill
                    {
                        FreelancerId = freelancerId,
                        SkillName = skillInput.Trim()
                    });
                }
            }

            // Remove any existing skills for this freelancer
            var existingSkills = await _context.Skills
                .Where(s => s.FreelancerId == freelancerId)
                .ToListAsync();

            if (existingSkills.Any())
            {
                _context.Skills.RemoveRange(existingSkills);
                await _context.SaveChangesAsync();
            }

            // Add new skills
            _context.Skills.AddRange(skillsToAdd);
            await _context.SaveChangesAsync();
        }

        public async Task<List<string>> GetSkillsByFreelancerIdAsync(Guid freelancerId)
        {
            return await _context.Skills
                .Where(s => s.FreelancerId == freelancerId)
                .Select(s => s.SkillName)
                .ToListAsync();
        }
    }
}