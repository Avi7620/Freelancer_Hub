    using FreelancerHub.Core.Domain.Entities;

    using Microsoft.AspNetCore.Identity;
    using System;
using System.Text.Json.Serialization;

    namespace FreelancerHub.Core.IdentityEntities
    {
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string PersonName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual AdminProfile? AdminProfile { get; set; }
        public virtual ClientProfile? ClientProfile { get; set; }

        [JsonIgnore]
        public virtual FreelancerProfile? FreelancerProfile { get; set; }

     
    }

}
