// BidDetailsDto.cs
using FreelancerHub.Core.Domain.Entities;


namespace FreelancerHub.Core.DTO
{
    public class BidDetailsDto
    {
        public Guid Id { get; set; }
        public string Proposal { get; set; }
        public decimal Amount { get; set; }
        public int DeliveryDays { get; set; }
        public DateTime CreatedAt { get; set; }
        public BidStatus Status { get; set; }

        // Project details
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; }

        // Client details
        public string ClientName { get; set; }
        public string CompanyName { get; set; }
    }
}