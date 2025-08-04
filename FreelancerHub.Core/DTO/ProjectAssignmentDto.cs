using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
