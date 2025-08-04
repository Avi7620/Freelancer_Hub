// ClientProjectsController.cs
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.DTO.FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = nameof(UserRole.Client))]
    [ApiController]
    [Route("api/client/projects")]
    public class ClientProjectsController : ControllerBase
    {
        private readonly IClientProjectService _clientProjectService;

        public ClientProjectsController(IClientProjectService clientProjectService)
        {
            _clientProjectService = clientProjectService;
        }

        [HttpGet("with-status")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ProjectWithStatusDto>>>> GetClientProjectsWithStatus()
        {
            try
            {
                var clientId = GetCurrentClientId();
                if (clientId == Guid.Empty)
                {
                    return Unauthorized(new ApiResponse
                    {
                        Success = false,
                        Status = "UNAUTHORIZED",
                        Message = "Invalid client credentials"
                    });
                }

                var projects = await _clientProjectService.GetClientProjectsWithStatusAsync(clientId);

                if (!projects.Any())
                {
                    return Ok(new ApiResponse<IEnumerable<ProjectWithStatusDto>>
                    {
                        Success = true,
                        Status = "SUCCESS",
                        Message = "Client has no projects yet",
                        Data = projects // Empty list
                    });
                }

                return Ok(new ApiResponse<IEnumerable<ProjectWithStatusDto>>
                {
                    Success = true,
                    Status = "SUCCESS",
                    Message = "Projects retrieved successfully",
                    Data = projects
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ApiResponse
                {
                    Success = false,
                    Status = "NOT_FOUND",
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to retrieve projects",
                    Details = ex.Message
                });
            }
        }


        private Guid GetCurrentClientId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var clientId))
            {
                return Guid.Empty;
            }
            return clientId;
        }
    }
}