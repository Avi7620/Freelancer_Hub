using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FreelancerHub.Core.Domain.Entities
{
    public class Bid
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required] public string Proposal { get; set; }
        [Required] public decimal Amount { get; set; }
        public int DeliveryDays { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relationships
        public Guid ProjectId { get; set; }
        public Guid FreelancerId { get; set; }

        [JsonIgnore] public virtual Project Project { get; set; }
        [JsonIgnore] public virtual FreelancerProfile Freelancer { get; set; }

        public BidStatus Status { get; set; } = BidStatus.Pending;
    }

    public enum BidStatus { Pending, Accepted, Rejected }
}