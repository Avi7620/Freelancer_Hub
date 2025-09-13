using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Core.Services;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [Authorize(Roles = nameof(UserRole.Freelancer))]
    [ApiController]
    [Route("api/freelancer/bids")]
    public class BidSubmissionController : ControllerBase
    {
        private readonly IBidService _bidService;
        private readonly IEmailService _emailService;
        private readonly IProjectRepository _projectRepository;

        public BidSubmissionController(
            IBidService bidService,
            IEmailService emailService,
            IProjectRepository projectRepository)
        {
            _bidService = bidService;
            _emailService = emailService;
            _projectRepository = projectRepository;
        }

        [HttpPost("submit")]
        public async Task<ActionResult<ApiResponse<Bid>>> SubmitBid([FromBody] BidSubmissionDto bidDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Status = "VALIDATION_ERROR",
                    Message = "Invalid request data",
                    Details = ModelState.GetValidationErrors()
                });
            }

            try
            {
                var freelancerId = User.GetUserId();
                var bid = await _bidService.SubmitBidAsync(bidDto, freelancerId);

                // Get project details for email notification
                var project = await _projectRepository.GetProjectById(bidDto.ProjectId);
                if (project != null && project.Client != null && project.Client.User != null)
                {
 
                    var emailSubject = $"New Bid Received on Your Project: {project.Title}";
                    var emailBody = $@"
                        <h2>New Bid Notification</h2>
                        <p>You have received a new bid on your project <strong>{project.Title}</strong>.</p>
                        <p><strong>Bid Amount:</strong> {bidDto.Amount:C}</p>
                        <p><strong>Proposed Delivery Time:</strong> {bidDto.DeliveryDays} days</p>
                        <p>Please log in to your account to view and manage all bids on your project.</p>
                        <p>Thank you for using our platform!</p>
                    ";

                    await _emailService.SendEmailAsync(
                        project.Client.User.Email,
                        emailSubject,
                        emailBody,
                        isHtml: true
                    );
                }

                return CreatedAtAction(
                    nameof(GetBidDetails),
                    new { bidId = bid.Id },
                    new ApiResponse<Bid>
                    {
                        Success = true,
                        Status = "CREATED",
                        Message = "Bid submitted successfully",
                        Data = bid
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
            catch (InvalidOperationException ex) when (ex.Message.Contains("already placed a bid"))
            {
                return Conflict(new ApiResponse
                {
                    Success = false,
                    Status = "DUPLICATE_BID",
                    Message = "You have already placed a bid on this project",
                    Details = "Freelancers can only submit one bid per project"
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Status = "INVALID_OPERATION",
                    Message = ex.Message
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
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to submit bid",
                    Details = ex.Message
                });
            }
        }

        [HttpGet("{bidId}")]
        public async Task<ActionResult<ApiResponse<BidDetailsDto>>> GetBidDetails(Guid bidId)
        {
            try
            {
                var freelancerId = User.GetUserId();
                var bidDetails = await _bidService.GetBidDetailsAsync(bidId, freelancerId);

                return Ok(new ApiResponse<BidDetailsDto>
                {
                    Success = true,
                    Status = "FOUND",
                    Message = "Bid details retrieved successfully",
                    Data = bidDetails
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
                return StatusCode(500, new ApiResponse
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to get bid details",
                    Details = ex.Message
                });
            }
        }
    }
}

