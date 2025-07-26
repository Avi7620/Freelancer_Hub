using FreelancerHub.Core.IdentityEntities;
using System.ComponentModel.DataAnnotations;


namespace FreelancerHub.Core.Domain.Entities
{
    public class ClientProfile
    {
        [Key]
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
