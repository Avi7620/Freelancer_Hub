using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FreelancerHub.Api.Client.Controllers
{
    [Authorize(Roles = nameof(UserRole.Client))]
    [ApiController]
    [Route("api/client/[controller]")]
    public class PostProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IClientRepository _clientRepository;

        public PostProjectController(
            IProjectRepository projectRepository,
            IClientRepository clientRepository)
        {
            _projectRepository = projectRepository;
            _clientRepository = clientRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromForm] CreateProjectDto projectDto)
        {
            try
            {
                var clientId = GetCurrentClientId();
                if (clientId == Guid.Empty)
                    return Unauthorized(new { Error = "Client not authenticated" });

                // Verify client exists
                var client = await _clientRepository.GetClientById(clientId);
                if (client == null)
                    return NotFound(new { Error = "Client profile not found" });

                var project = new Project
                {
                    Title = projectDto.Title,
                    Description = projectDto.Description,
                    Budget = projectDto.Budget,
                    Deadline = projectDto.Deadline,
                    RequiredSkills = string.Join(",", projectDto.RequiredSkills),
                    ClientId = clientId,
                    Status = ProjectStatus.Open,
                    CreatedAt = DateTime.UtcNow
                };

                var createdProject = await _projectRepository.CreateProject(project);

                return CreatedAtAction(
                    nameof(GetProject),
                    new { id = createdProject.Id },
                    new ProjectResponseDto(createdProject));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(Guid id)
        {
            try
            {
                var clientId = GetCurrentClientId();
                if (clientId == Guid.Empty)
                    return Unauthorized();

                var project = await _projectRepository.GetProjectById(id);
                if (project == null)
                    return NotFound();

                if (project.ClientId != clientId)
                    return Forbid();

                return Ok(new ProjectResponseDto(project));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("my-projects")]
        public async Task<IActionResult> GetClientProjects()
        {
            try
            {
                var clientId = GetCurrentClientId();
                if (clientId == Guid.Empty)
                    return Unauthorized();

                var projects = await _projectRepository.GetProjectsByClient(clientId);
                return Ok(projects.Select(p => new ProjectResponseDto(p)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = $"Internal server error: {ex.Message}" });
            }
        }

        private Guid GetCurrentClientId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out var clientId))
                return Guid.Empty;

            return clientId;
        }
    }

    // DTO Classes
    public class CreateProjectDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Budget is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Budget must be greater than 0")]
        public decimal Budget { get; set; }

        [Required(ErrorMessage = "Deadline is required")]
        public DateTime Deadline { get; set; }

        [Required(ErrorMessage = "At least one skill is required")]
        public string[] RequiredSkills { get; set; }
    }

    public class ProjectResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public DateTime Deadline { get; set; }
        public string[] RequiredSkills { get; set; }
        public ProjectStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CompanyName { get; set; }

        public ProjectResponseDto(Project project)
        {
            Id = project.Id;
            Title = project.Title;
            Description = project.Description;
            Budget = project.Budget;
            Deadline = project.Deadline;
            RequiredSkills = project.RequiredSkills?.Split(',') ?? Array.Empty<string>();
            Status = project.Status;
            CreatedAt = project.CreatedAt;
            CompanyName = project.Client?.CompanyName ?? string.Empty;
        }
    }
}