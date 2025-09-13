// FreelancerBidStatusDto.cs
using FreelancerHub.Core.Enums;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerBidStatusDto
    {
        public Guid BidId { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public decimal ProjectBudget { get; set; }
        public DateTime ProjectDeadline { get; set; }
        public string ClientName { get; set; }
        public string CompanyName { get; set; }
        public string Proposal { get; set; }
        public decimal Amount { get; set; }
        public int DeliveryDays { get; set; }
        public DateTime CreatedAt { get; set; }
        public BidStatus Status { get; set; }
    }
}