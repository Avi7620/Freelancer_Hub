using FreelancerHub.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class ProjectWithFreelancerDto
    {
        public Guid ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public DateTime Deadline { get; set; }
        public ProjectStatus Status { get; set; }
        public FreelancerBasicInfoDto Freelancer { get; set; }
    }

}
