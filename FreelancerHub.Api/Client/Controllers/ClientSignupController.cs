using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.IdentityEntities;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FreelancerHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientSignupController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;

        public ClientSignupController(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ClientSignupDTO clientDto)
        {
            // Check if email already exists
            var existingUser = await _userManager.FindByEmailAsync(clientDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { Error = "Email already exists" });
            }

            // Create user
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                PersonName = clientDto.ContactPersonName,
                Email = clientDto.Email,
                UserName = clientDto.Email,
                PhoneNumber = clientDto.Phone,
                CreatedAt = DateTime.UtcNow
            };

            // Create user with password
            var result = await _userManager.CreateAsync(user, clientDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
            }

            // Ensure Client role exists
            var roleName = nameof(UserRole.Client);
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new ApplicationRole(roleName));
            }

            // Assign role to user
            await _userManager.AddToRoleAsync(user, roleName);

            // Create client profile
            var clientProfile = new ClientProfile
            {
                UserId = user.Id,
                CompanyName = clientDto.CompanyName
            };

            // Save profile
            _dbContext.ClientProfiles.Add(clientProfile);
            await _dbContext.SaveChangesAsync();

            var response = new ClientSignupResponseDTO
            {
                Message = "Client registered successfully",
                UserId = user.Id,
                Email = user.Email,
                Role = roleName,
                CompanyName = clientProfile.CompanyName
            };

            return Ok(response);
        }
    }
}   