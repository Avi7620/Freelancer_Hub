using FreelancerHub.Core.Enums;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerBidDto
    {
        public Guid BidId { get; set; }
        public string Proposal { get; set; }
        public decimal Amount { get; set; }
        public int DeliveryDays { get; set; }
        public DateTime CreatedAt { get; set; }
        public BidStatus Status { get; set; }

        // Freelancer Info
        public Guid FreelancerId { get; set; }
        public string FreelancerName { get; set; }
        public string Title { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public decimal? HourlyRate { get; set; }
        public List<string> Skills { get; set; }
    }


}