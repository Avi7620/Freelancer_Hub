// FreelancerBidStatusController.cs
using FreelancerHub.Api.Extensions;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FreelancerHub.Api.Freelancer.Controllers
{




    [Authorize(Roles = nameof(UserRole.Freelancer))]
    [ApiController]
    [Route("api/freelancer/bid-status")]
    public class FreelancerBidStatusController : ControllerBase
    {
        private readonly IFreelancerBidStatusService _bidStatusService;

        public FreelancerBidStatusController(IFreelancerBidStatusService bidStatusService)
        {
            _bidStatusService = bidStatusService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<FreelancerBidStatusDto>>>> GetBidStatuses()
        {
            var freelancerId = User.GetUserId();
            var response = await _bidStatusService.GetBidStatusesAsync(freelancerId);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        [HttpGet("{bidId}")]
        public async Task<ActionResult<ApiResponse<FreelancerBidStatusDto>>> GetBidStatusDetail(Guid bidId)
        {
            var freelancerId = User.GetUserId();
            var response = await _bidStatusService.GetBidStatusDetailAsync(bidId, freelancerId);

            if (!response.Success && response.Status == "NOT_FOUND")
            {
                return NotFound(response);
            }

            return response.Success ? Ok(response) : BadRequest(response);
        }
    }
}