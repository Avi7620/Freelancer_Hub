using FreelancerHub.Core.DTO; // Make sure this using exists
using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using FreelancerHub.Core.DTO.FreelancerHub.Core.DTO;

namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = nameof(UserRole.Client))]
    [ApiController]
    [Route("api/client/projects")]
    public class ClientBidFreelancersController : ControllerBase
    {
        private readonly IClientBidService _bidService;

        public ClientBidFreelancersController(IClientBidService bidService)
        {
            _bidService = bidService;
        }

        [HttpGet("{projectId}/bids")]
        public async Task<ActionResult<ApiResponse<ProjectBidsResponseDto>>> GetProjectBids(Guid projectId)
        {
            try
            {
                var clientId = User.GetUserId();
                var projectBidsDto = await _bidService.GetProjectBidsAsync(projectId, clientId);

                // Convert ProjectBidsDto to ProjectBidsResponseDto
                var responseDto = new ProjectBidsResponseDto
                {
                    ProjectId = projectBidsDto.ProjectId,
                    ProjectTitle = projectBidsDto.ProjectTitle,
                    Bids = projectBidsDto.Bids,
          
                    ProjectStatus = ProjectStatus.Open, // Set actual status
                    ProjectDeadline = DateTime.UtcNow.AddDays(30) // Set actual deadline
                };

                return Ok(new ApiResponse<ProjectBidsResponseDto>
                {
                    Success = true,
                    Data = responseDto,
                    Status = responseDto.HasBids ? "HAS_BIDS" : "NO_BIDS",
                    Message = responseDto.Message
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
                    Message = "An error occurred while processing your request"
                });
            }
        }   
    }
}