using FreelancerHub.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class UpdateFullProfileRequest
    {
        public FreelancerProfile Profile { get; set; }
        public List<string> Skills { get; set; }
        public List<string> Categories { get; set; }
    }
}
