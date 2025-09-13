using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{

    public class ProjectBidsDto
    {
        public Guid ProjectId { get; set; }
        public string ProjectTitle { get; set; }
        public List<FreelancerBidDto> Bids { get; set; } = new();

        public bool HasBids => Bids != null && Bids.Count > 0;
    }
}
