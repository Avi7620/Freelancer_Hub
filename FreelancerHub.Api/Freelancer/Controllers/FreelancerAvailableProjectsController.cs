using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [Authorize(Roles = nameof(UserRole.Freelancer))]
    [ApiController]
    [Route("api/freelancer/[controller]")]
    public class FreelancerAvailableProjectsController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public FreelancerAvailableProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResponseDto>>> GetAvailableProjects()
        {
            try
            {
                var projects = await _projectRepository.GetProjectsByStatus(ProjectStatus.Open);

                var result = projects
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new ProjectResponseDto
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Description = p.Description,
                        Budget = p.Budget,
                        Deadline = p.Deadline,
                        RequiredSkills = p.RequiredSkills != null
                            ? p.RequiredSkills.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            : Array.Empty<string>(),
                        CreatedAt = p.CreatedAt,
                        CompanyName = p.Client != null ? p.Client.CompanyName : "Unknown Company"
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "Failed to fetch available projects",
                    Details = ex.Message
                });
            }
        }

        [HttpGet("filtered")]
        public async Task<ActionResult<IEnumerable<ProjectResponseDto>>> GetFilteredProjects(
            [FromQuery] string[]? skills = null,
            [FromQuery] decimal? minBudget = null,
            [FromQuery] decimal? maxBudget = null)
        {
            try
            {
                var projects = await _projectRepository.GetProjectsByStatus(ProjectStatus.Open);
                var query = projects.AsQueryable();

                if (skills != null && skills.Length > 0)
                {
                    query = query.Where(p =>
                        p.RequiredSkills != null &&
                        skills.Any(s => p.RequiredSkills.Contains(s)));
                }

                if (minBudget.HasValue)
                {
                    query = query.Where(p => p.Budget >= minBudget.Value);
                }

                if (maxBudget.HasValue)
                {
                    query = query.Where(p => p.Budget <= maxBudget.Value);
                }

                var result = query
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new ProjectResponseDto
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Description = p.Description,
                        Budget = p.Budget,
                        Deadline = p.Deadline,
                        RequiredSkills = p.RequiredSkills != null
                            ? p.RequiredSkills.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            : Array.Empty<string>(),
                        CreatedAt = p.CreatedAt,
                        CompanyName = p.Client != null ? p.Client.CompanyName : "Unknown Company"
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "Failed to filter projects",
                    Details = ex.Message
                });
            }
        }

        public class ProjectResponseDto
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public decimal Budget { get; set; }
            public DateTime Deadline { get; set; }
            public string[] RequiredSkills { get; set; }
            public DateTime CreatedAt { get; set; }
            public string CompanyName { get; set; }
        }
    }

}