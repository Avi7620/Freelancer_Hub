using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.IdentityEntities;
using FreelancerHub.Core.ServicesContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FreelancerHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FreelancerSignupController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
  
        private readonly ApplicationDbContext _dbContext;

        public FreelancerSignupController(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IJwtService jwtService,
            ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        
            _dbContext = dbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] FreelancerDTO freelancerDto)
        {
            // Check if email already exists
            var existingUser = await _userManager.FindByEmailAsync(freelancerDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { Error = "Email already exists" });
            }

            // Save portfolio files
            List<string> portfolioFilePaths = new List<string>();
            if (freelancerDto.Portfolio != null && freelancerDto.Portfolio.Count > 0)
            {
                foreach (var file in freelancerDto.Portfolio)
                {
                    if (file.Length > 0)
                    {
                        var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Portfolios", fileName);

                        Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        portfolioFilePaths.Add(fileName);
                    }
                }
            }

            // Create user
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                PersonName = $"{freelancerDto.FirstName} {freelancerDto.LastName}",
                Email = freelancerDto.Email,
                UserName = freelancerDto.Email,
                PhoneNumber = freelancerDto.Phone,
                CreatedAt = DateTime.UtcNow
            };

            // Create user with password
            var result = await _userManager.CreateAsync(user, freelancerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
            }

            var roleName = nameof(UserRole.Freelancer);
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new ApplicationRole(roleName));
            }

            // Assign role to user
            await _userManager.AddToRoleAsync(user, roleName);

            // Parse hourly rate (with default fallback)
            decimal.TryParse(freelancerDto.HourlyRate, out decimal hourlyRate);

            // Create freelancer profile
            var freelancerProfile = new FreelancerProfile
            {
                UserId = user.Id,
                Country = freelancerDto.Country,
                City = freelancerDto.City,
                Title = freelancerDto.Title,
                Description = freelancerDto.Description,
                Experience = freelancerDto.Experience,
                HourlyRate = hourlyRate,
                Availability = freelancerDto.Availability,
                Skills = freelancerDto.Skills ?? new List<string>(),
                Categories = freelancerDto.Categories ?? new List<string>(),
                PortfolioFilePaths = portfolioFilePaths
            };

            // Save profile
            _dbContext.FreelancerProfiles.Add(freelancerProfile);
            await _dbContext.SaveChangesAsync();

            var response = new FreelancerResponseDTO
            {
                Message = "Freelancer registered successfully.",
                UserId = user.Id,
                Email = user.Email,
                Role = roleName
            };

            return Ok(response);


        }
    }
}