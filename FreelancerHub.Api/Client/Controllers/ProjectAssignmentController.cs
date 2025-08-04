using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Services;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = nameof(UserRole.Client))]
    [ApiController]
    [Route("api/client/projects/assign")]
    public class ProjectAssignmentController : ControllerBase
    {
        private readonly IProjectAssignmentService _assignmentService;

        public ProjectAssignmentController(IProjectAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<bool>>> AssignProjectToFreelancer(
            [FromBody] ProjectAssignmentDto assignmentDto)
        {
            
            var clientId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(clientId) || !Guid.TryParse(clientId, out var clientGuid))
            {
                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Status = "UNAUTHORIZED",
                    Message = "Invalid client credentials"
                });
            }

            assignmentDto.ClientId = clientGuid;

            var result = await _assignmentService.AssignProjectToFreelancerAsync(assignmentDto);

            if (!result.Success)
            {
                return StatusCode(
                    result.Status switch
                    {
                        "NOT_FOUND" => 404,
                        "INVALID_ASSIGNMENT" => 400,
                        _ => 500
                    },
                    result
                );
            }

            return Ok(result);
        }
    }
}