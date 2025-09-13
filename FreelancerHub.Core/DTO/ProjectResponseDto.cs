using FreelancerHub.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class ProjectResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public DateTime Deadline { get; set; }
        public string[] RequiredSkills { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CompanyName { get; set; }

        public ProjectStatus projectStatus { get; set; }
    }
}
