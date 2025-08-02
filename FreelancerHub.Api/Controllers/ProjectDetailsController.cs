using FreelancerHub.Core.DTO;
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
        public async Task<ActionResult<ProjectWithClientDto>> GetProjectDetails(Guid projectId)
        {
            try
            {
                var projectDetails = await _bidService.GetProjectWithClientInfo(projectId);
                return Ok(projectDetails);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Failed to get project details", Details = ex.Message });
            }
        }
    }
}