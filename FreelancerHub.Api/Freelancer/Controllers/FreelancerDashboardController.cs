using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.ServicesContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FreelancerHub.Core.DTO;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [ApiController]
    [Route("api/freelancer/dashboard")]
    [Authorize(Roles = "Freelancer")]
    public class FreelancerDashboardController : ControllerBase
    {
        private readonly IFreelancerDashboardService _dashboardService;

        public FreelancerDashboardController(IFreelancerDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        #region Profile Endpoints
        [Authorize(Roles = "Freelancer")]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = GetCurrentUserId();
            var profile = await _dashboardService.GetProfileAsync(userId);
            return Ok(profile);
        }

        [HttpPost("profile")]
        public async Task<IActionResult> CreateProfile([FromBody] FreelancerProfile profile)
        {
            profile.UserId = GetCurrentUserId();
            await _dashboardService.CreateProfileAsync(profile);
            return CreatedAtAction(nameof(GetProfile), null);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] FreelancerProfile profile)
        {
            profile.UserId = GetCurrentUserId();
            await _dashboardService.UpdateProfileAsync(profile);
            return NoContent();
        }

        [HttpDelete("profile")]
        public async Task<IActionResult> DeleteProfile()
        {
            var userId = GetCurrentUserId();
            await _dashboardService.DeleteProfileAsync(userId);
            return NoContent();
        }

        [HttpPatch("profile/basic-info")]
        public async Task<IActionResult> UpdateBasicInfo(
            [FromBody] UpdateBasicInfoRequest request)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.UpdateBasicInfoAsync(
                userId, request.Title, request.Description, request.Experience);
            return NoContent();
        }

        [HttpPatch("profile/location")]
        public async Task<IActionResult> UpdateLocation(
            [FromBody] UpdateLocationRequest request)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.UpdateLocationAsync(
                userId, request.Country, request.City);
            return NoContent();
        }

        [HttpPatch("profile/rate-availability")]
        public async Task<IActionResult> UpdateRateAndAvailability(
            [FromBody] UpdateRateAvailabilityRequest request)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.UpdateRateAndAvailabilityAsync(
                userId, request.HourlyRate, request.Availability);
            return NoContent();
        }

        [HttpPut("profile/portfolio")]
        public async Task<IActionResult> UpdatePortfolio(
            [FromBody] UpdatePortfolioRequest request)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.UpdatePortfolioAsync(
                userId, request.PortfolioFilePaths);
            return NoContent();
        }
        #endregion

        #region Skill Endpoints
        [HttpGet("skills")]
        public async Task<IActionResult> GetSkills()
        {
            var userId = GetCurrentUserId();
            var skills = await _dashboardService.GetSkillsAsync(userId);
            return Ok(skills);
        }

        [HttpPost("skills")]
        public async Task<IActionResult> AddSkills([FromBody] List<string> skillNames)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.AddSkillsAsync(userId, skillNames);
            return NoContent();
        }

        [HttpDelete("skills")]
        public async Task<IActionResult> RemoveAllSkills()
        {
            var userId = GetCurrentUserId();
            await _dashboardService.RemoveAllSkillsAsync(userId);
            return NoContent();
        }

        [HttpDelete("skills/{skillId}")]
        public async Task<IActionResult> RemoveSkill(Guid skillId)
        {
            await _dashboardService.RemoveSkillAsync(skillId);
            return NoContent();
        }

        [HttpPatch("skills/{skillId}")]
        public async Task<IActionResult> UpdateSkill(
            Guid skillId, [FromBody] UpdateSkillRequest request)
        {
            await _dashboardService.UpdateSkillAsync(skillId, request.NewSkillName);
            return NoContent();
        }
        #endregion

        #region Category Endpoints
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var userId = GetCurrentUserId();
            var categories = await _dashboardService.GetCategoriesAsync(userId);
            return Ok(categories);
        }

        [HttpPost("categories")]
        public async Task<IActionResult> AddCategories([FromBody] List<string> categoryNames)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.AddCategoriesAsync(userId, categoryNames);
            return NoContent();
        }

        [HttpDelete("categories")]
        public async Task<IActionResult> RemoveAllCategories()
        {
            var userId = GetCurrentUserId();
            await _dashboardService.RemoveAllCategoriesAsync(userId);
            return NoContent();
        }

        [HttpDelete("categories/{categoryId}")]
        public async Task<IActionResult> RemoveCategory(Guid categoryId)
        {
            await _dashboardService.RemoveCategoryAsync(categoryId);
            return NoContent();
        }

        [HttpPatch("categories/{categoryId}")]
        public async Task<IActionResult> UpdateCategory(
            Guid categoryId, [FromBody] UpdateCategoryRequest request)
        {
            await _dashboardService.UpdateCategoryAsync(categoryId, request.NewCategoryName);
            return NoContent();
        }
        #endregion

        #region Dashboard Endpoints
        [HttpGet("full-profile")]
        public async Task<IActionResult> GetFullProfile()
        {
            var userId = GetCurrentUserId();
            var fullProfile = await _dashboardService.GetFullProfileAsync(userId);
            return Ok(fullProfile);
        }

        [HttpPut("full-profile")]
        public async Task<IActionResult> UpdateFullProfile(
            [FromBody] UpdateFullProfileRequest request)
        {
            var userId = GetCurrentUserId();
            await _dashboardService.UpdateProfileWithSkillsAndCategoriesAsync(
                userId, request.Profile, request.Skills, request.Categories);
            return NoContent();
        }
        #endregion

        #region Helper Methods
        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("sub")?.Value ??
                            User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (Guid.TryParse(userIdClaim, out var userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("Invalid user ID");
        }
        #endregion

    }
}