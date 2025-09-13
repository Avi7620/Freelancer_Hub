using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.IdentityEntities;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Azure;
using FreelancerHub.Core.Enums;
using System.Data;

namespace FreelancerHub.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );
                return BadRequest(new { Errors = errors });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized(new
                {
                    Error = "Invalid credentials",
                    Details = "The email address is not registered"
                });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new
                {
                    Error = "Invalid credentials",
                    Details = "The password is incorrect"
                });
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            var authResponse = _jwtService.CreateJwtToken(user, userRoles);

            // Add the single role to the response
            if (userRoles.Count > 0 && Enum.TryParse<UserRole>(userRoles[0], out var role))
            {
                authResponse.Role = role;
            }
        

            return Ok(authResponse);

        }

     

    }
}
