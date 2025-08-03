// IClientProjectService.cs
using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Enums;
using System.Text.Json.Serialization;

namespace FreelancerHub.Core.DTO
{
    // ProjectWithStatusDto.cs
    namespace FreelancerHub.Core.DTO
    {
        public class ProjectWithStatusDto
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public decimal Budget { get; set; }
            public DateTime Deadline { get; set; }
            public string[] RequiredSkills { get; set; }

            [JsonConverter(typeof(JsonStringEnumConverter))]
            public ProjectStatus Status { get; set; }
            public DateTime CreatedAt { get; set; }
            public string CompanyName { get; set; }
            public int BidCount { get; set; }
            public Guid? AcceptedFreelancerId { get; set; }

            public ProjectWithStatusDto(Project project)
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
                BidCount = project.Bids?.Count ?? 0;
                AcceptedFreelancerId = project.AcceptedFreelancerId;
            }
        }
    }
}