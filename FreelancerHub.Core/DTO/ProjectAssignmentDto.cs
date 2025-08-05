using System.ComponentModel.DataAnnotations;


namespace FreelancerHub.Core.DTO
{
    public class ProjectAssignmentDto
    {
        [Required]
        public Guid ProjectId { get; set; }

        [Required]
        public Guid FreelancerId { get; set; }

        [Required]
        public Guid ClientId { get; set; } // To verify ownership
    }
}
