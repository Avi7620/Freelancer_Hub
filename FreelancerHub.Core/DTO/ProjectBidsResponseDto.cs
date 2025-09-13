using FreelancerHub.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class ProjectBidsResponseDto
    {
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public bool HasBids => Bids?.Count > 0;
        public List<FreelancerBidDto> Bids { get; set; } = new();
        public string Message => HasBids ? null : "No bids have been submitted yet";
        public DateTime ProjectDeadline { get; set; }
        public bool IsAcceptingBids => ProjectStatus == ProjectStatus.Open &&
                                     ProjectDeadline > DateTime.UtcNow;
        public int DaysActive => (DateTime.UtcNow - ProjectDeadline).Days;
    }
}
