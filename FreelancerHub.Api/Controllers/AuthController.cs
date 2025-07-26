using FreelancerHub.Core.DTO;
using FreelancerHub.Core.IdentityEntities;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FreelancerHub.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtService _jwtService;
            
        public AuthController(UserManager<ApplicationUser> userManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray() ?? new[] { "Invalid value" }
                    );

                return Ok(new
                {
                    success = false,
                    message = "Validation failed",
                    errors
                });
            }

            var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email);
            if (existingUser != null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Email is already registered."
                });
            }

            var newUser = new ApplicationUser
            {
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                PersonName = registerDTO.PersonName
            };

            var result = await _userManager.CreateAsync(newUser, registerDTO.Password);

            if (!result.Succeeded)
            {
                var identityErrors = result.Errors.Select(e => e.Description).ToList();

                return Ok(new
                {
                    success = false,
                    message = "User creation failed",
                    errors = identityErrors
                });
            }

            var jwtResponse = _jwtService.CreateJwtToken(newUser);

          
            Response.Cookies.Append("jwt", jwtResponse.Token!, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, 
                SameSite = SameSiteMode.Strict,
                Expires = jwtResponse.Expiration
            });

            return Ok(new
            {
                success = true,
                message = "User registered successfully",
                user = new
                {
                    name = jwtResponse.PersonName,
                    email = jwtResponse.Email
                },
                expiration = jwtResponse.Expiration
            });
        }
    }
}
