
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = "Client")]
    [ApiController]
    [Route("api/client/profile")]
    public class ClientProfileController : ControllerBase
    {
        private readonly IClientProfileService _clientProfileService;

        public ClientProfileController(IClientProfileService clientProfileService)
        {
            _clientProfileService = clientProfileService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetCurrentUserId();
            var response = await _clientProfileService.GetClientProfile(userId);

            if (!response.Success)
            {
                return StatusCode(response.Status == "NOT_FOUND" ? 404 : 500, response);
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] ClientProfileUpdateDto updateDto)
        {
            var userId = GetCurrentUserId();

            if (string.IsNullOrWhiteSpace(updateDto.CompanyName))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Status = "VALIDATION_ERROR",
                    Message = "Company name is required"
                });
            }

            var response = await _clientProfileService.UpdateClientProfile(
                userId,
                updateDto.CompanyName,
                updateDto.PhoneNumber);

            if (!response.Success)
            {
                return StatusCode(response.Status == "NOT_FOUND" ? 404 : 500, response);
            }

            return Ok(response);
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
    }


}