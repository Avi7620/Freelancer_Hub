namespace FreelancerHub.Core.DTO
{
    public class ProjectWithClientDto
    {
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public decimal ProjectBudget { get; set; }
        public DateTime ProjectDeadline { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
        public string CompanyName { get; set; }
        public int BidCount { get; set; }
    }
}