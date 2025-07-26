using FreelancerHub.Core.IdentityEntities;
using System.ComponentModel.DataAnnotations;


namespace FreelancerHub.Core.Domain.Entities
{
    public class FreelancerProfile
    {
        [Key]
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }


}
