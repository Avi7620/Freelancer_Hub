using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.IdentityEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
     public class ClientProfileResponseDto
    {
        public Guid UserId { get; set; }
        public string PersonName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? CompanyName { get; set; }

        public ClientProfileResponseDto(ApplicationUser user, ClientProfile profile)
        {
            UserId = user.Id;
            PersonName = user.PersonName;
            Email = user.Email ?? string.Empty;
            PhoneNumber = user.PhoneNumber;
            CompanyName = profile.CompanyName;
        }
    }
}
