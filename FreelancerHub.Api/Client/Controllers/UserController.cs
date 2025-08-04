using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FreelancerHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires authentication
    public class UserController : ControllerBase
    {
        [HttpGet("client-id")]
        public IActionResult GetClientId()
        {
            try
            {
                // Get authenticated user from HttpContext
                var user = HttpContext.User;

                // Use your extension method to get user ID
                var clientId = user.GetUserId();

                // Return success response with client ID
                return Ok(new ApiResponse<Guid>
                {
                    Success = true,
                    Status = "success",
                    Message = "Client ID retrieved successfully",
                    Data = clientId
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                // Handle authentication errors
                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Status = "unauthorized",
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                // Handle other errors
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Status = "error",
                    Message = "An unexpected error occurred",
                    Details = ex.Message
                });
            }
        }
    }
}