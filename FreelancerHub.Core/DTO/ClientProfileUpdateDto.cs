using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class ClientProfileUpdateDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
    }
}
