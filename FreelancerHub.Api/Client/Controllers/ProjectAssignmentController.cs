using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Services;
using FreelancerHub.Core.ServicesContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IEmailService _emailService;
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<ProjectAssignmentController> _logger;
        private readonly IFreelancerProfileData _freelancerProfileData;

        public ProjectAssignmentController(
            IProjectAssignmentService assignmentService,
            IEmailService emailService,
            ApplicationDbContext dbContext,
            ILogger<ProjectAssignmentController> logger,
            IFreelancerProfileData freelancerProfileData)
        {
            _assignmentService = assignmentService;
            _emailService = emailService;
            _dbContext = dbContext;
            _logger = logger;
            _freelancerProfileData = freelancerProfileData;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<bool>>> AssignProjectToFreelancer(
            [FromBody] ProjectAssignmentDto assignmentDto)
        {
            // Existing validation (unchanged)
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

            // Original business logic (unchanged)
            var result = await _assignmentService.AssignProjectToFreelancerAsync(assignmentDto);

            // NEW: Silent email notification (doesn't affect response)
            if (result.Success)
            {
                _ = SendAssignmentNotificationAsync(assignmentDto.FreelancerId, clientGuid); // Fire-and-forget
            }

            // Original response handling (unchanged)
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

            return Ok(result); // Same response as before
        }

        // New private method (doesn't affect controller response)
        private async Task SendAssignmentNotificationAsync(Guid freelancerId, Guid clientId)
        {
            try
            {
                var client = await _dbContext.ClientProfiles
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(c => c.UserId == clientId);

                var freelancerEmail = await _freelancerProfileData.GetFreelancerEmailAsync(freelancerId);

                await _emailService.SendEmailAsync(
                    freelancerEmail,
                    "Project Assignment Notification",
                    $"You have been assigned to a new project by {client?.User?.PersonName}",
                    isHtml: true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Notification email failed");
            }
        }
    }
}