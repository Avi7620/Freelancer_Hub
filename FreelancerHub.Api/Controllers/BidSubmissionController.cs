using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.Domain.Entities;
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
    [Route("api/freelancer/bids")]
    public class BidSubmissionController : ControllerBase
    {
        private readonly IBidService _bidService;

        public BidSubmissionController(IBidService bidService)
        {
            _bidService = bidService;
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