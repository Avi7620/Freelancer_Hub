using FreelancerHub.Core.IdentityEntities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FreelancerHub.Core.Domain.Entities
{
    public class ClientProfile
    {
        [Key]
        public Guid UserId { get; set; }

        public string? CompanyName { get; set; }

        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }

        [JsonIgnore]
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}