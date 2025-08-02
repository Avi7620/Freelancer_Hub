using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
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
        public async Task<ActionResult> SubmitBid([FromBody] BidSubmissionDto bidDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var freelancerId = GetCurrentFreelancerId();
                var bid = await _bidService.SubmitBidAsync(bidDto, freelancerId);

                return CreatedAtAction(
                    nameof(GetBidDetails),
                    new { bidId = bid.Id },
                    new
                    {
                        bid.Id,
                        bid.Proposal,
                        bid.Amount,
                        bid.DeliveryDays,
                        bid.Status
                    });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Failed to submit bid", Details = ex.Message });
            }
        }

        [HttpGet("{bidId}")]
        public async Task<ActionResult<BidDetailsDto>> GetBidDetails(Guid bidId)
        {
            try
            {
                var freelancerId = GetCurrentFreelancerId();
                var bidDetails = await _bidService.GetBidDetailsAsync(bidId, freelancerId);
                return Ok(bidDetails);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Failed to get bid details", Details = ex.Message });
            }
        }

        private Guid GetCurrentFreelancerId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid freelancerId))
            {
                throw new UnauthorizedAccessException("Invalid user ID");
            }
            return freelancerId;
        }
    }
}