using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerResponseDTO
    {
        public string? Message { get; set; }
        public Guid? UserId { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
    }

}
