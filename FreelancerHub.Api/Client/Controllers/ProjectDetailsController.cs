// ProjectDetailsController.cs
using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = nameof(UserRole.Client))]
    [ApiController]
    [Route("api/client/project-details")]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly IProjectDetailsService _projectDetailsService;

        public ProjectDetailsController(IProjectDetailsService projectDetailsService)
        {
            _projectDetailsService = projectDetailsService;
        }


        /// <summary>
        /// Get project details by project ID for the authenticated client.
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet("{projectId}")]
        public async Task<ActionResult<ApiResponse<ProjectWithFreelancerDto>>> GetProjectDetails(Guid projectId)
        {
            var clientId = User.GetUserId();
            var response = await _projectDetailsService.GetProjectDetailsAsync(projectId, clientId);

            if (!response.Success && response.Status == "NOT_FOUND")
                return NotFound(response);

            return response.Success ? Ok(response) : BadRequest(response);
        }
    }
}