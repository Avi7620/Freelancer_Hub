using System;
using System.ComponentModel.DataAnnotations;

namespace FreelancerHub.Core.DTO
{
    public class BidSubmissionDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 50, ErrorMessage = "Proposal must be between 50 and 2000 characters")]
        public string Proposal { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = "Amount must be between 1 and 1,000,000")]
        public decimal Amount { get; set; }

        [Required]
        [Range(1, 365, ErrorMessage = "Delivery days must be between 1 and 365")]
        public int DeliveryDays { get; set; }
    }
}