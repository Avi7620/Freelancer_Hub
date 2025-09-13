using FreelancerHub.Core.DTO;
using FreelancerHub.Core.DTO.FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [Authorize(Roles = nameof(UserRole.Freelancer))]
    [ApiController]
    [Route("api/freelancer/projects")]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly IBidService _bidService;

        public ProjectDetailsController(IBidService bidService)
        {
            _bidService = bidService;
        }

        [HttpGet("{projectId}/details")]
        public async Task<ActionResult<ApiResponse<ProjectWithClientDto>>> GetProjectDetails(Guid projectId)
        {
            try
            {
                var projectDetails = await _bidService.GetProjectWithClientInfo(projectId);

                if (projectDetails == null)
                {   
                    return Ok(new ApiResponse 
                    {
                        Success = true,
                        Status = "NOT_FOUND",
                        Message = "No project found with the specified ID"
                       
                    });
                }

                return Ok(new ApiResponse<ProjectWithClientDto> // Generic version
                {
                    Success = true,
                    Status = "FOUND",
                    Message = "Project details retrieved successfully",
                    Data = projectDetails // Data property available here
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ApiResponse // Non-generic
                {
                    Success = false,
                    Status = "NOT_FOUND",
                    Message = ex.Message
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new ApiResponse // Non-generic
                {
                    Success = false,
                    Status = "UNAUTHORIZED",
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse // Non-generic
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to get project details",
                    Details = ex.Message // Details available in both versions
                });
            }
        }
    }

}