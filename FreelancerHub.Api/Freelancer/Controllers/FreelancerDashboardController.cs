using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [Authorize(Roles = "Freelancer")]
    [ApiController]
    [Route("api/freelancer/profile")]
    public class FreelancerProfileController : ControllerBase
    {
        private readonly IFreelancerProfileData _freelancerProfileData;
        private readonly ILogger<FreelancerProfileController> _logger;

        public FreelancerProfileController(
            IFreelancerProfileData freelancerProfileData,
            ILogger<FreelancerProfileController> logger)
        {
            _freelancerProfileData = freelancerProfileData;
            _logger = logger;
        }

        private Guid GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var guid))
            {
                throw new UnauthorizedAccessException("Invalid user ID");
            }
            return guid;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<FreelancerProfileResponseDto>>> GetProfile()
        {
            try
            {
                var userId = GetCurrentUserId();
                var profile = await _freelancerProfileData.GetProfileAsync(userId);

                if (profile == null)
                {
                    return NotFound(new ApiResponse
                    {
                        Success = false,
                        Status = "NOT_FOUND",
                        Message = "Freelancer profile not found"
                    });
                }

                var responseDto = new FreelancerProfileResponseDto(profile);

                return Ok(new ApiResponse<FreelancerProfileResponseDto>
                {
                    Success = true,
                    Status = "SUCCESS",
                    Message = "Profile retrieved successfully",
                    Data = responseDto
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Status = "UNAUTHORIZED",
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting profile");
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Error retrieving profile",
                    Details = ex.Message
                });
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromForm] FreelancerProfile profileUpdate)
        {
            try
            {
                var userId = GetCurrentUserId();
                profileUpdate.UserId = userId; // Ensure the ID matches the authenticated user

                var updatedProfile = await _freelancerProfileData.UpdateProfileAsync(userId, profileUpdate);
                return Ok(updatedProfile);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile");
                return StatusCode(500, "Error updating profile");
            }
        }
    }
}