using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace FreelancerHub.Core.Domain.Entities
{
    public class Project
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required] public string Title { get; set; }
        [Required] public string Description { get; set; }
        public decimal Budget { get; set; }
        public DateTime Deadline { get; set; }
        public string? RequiredSkills { get; set; }

        // Relationships
        public Guid ClientId { get; set; }
        public Guid? AcceptedFreelancerId { get; set; }

        [JsonIgnore] public virtual ClientProfile Client { get; set; }
        [JsonIgnore] public virtual FreelancerProfile? AcceptedFreelancer { get; set; }
        [JsonIgnore] public virtual ICollection<Bid> Bids { get; set; } = new List<Bid>();

        public ProjectStatus Status { get; set; } = ProjectStatus.Open;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum ProjectStatus { Open, InProgress, Completed, Cancelled }
}