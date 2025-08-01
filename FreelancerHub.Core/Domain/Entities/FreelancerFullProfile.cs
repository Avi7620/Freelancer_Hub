using FreelancerHub.Core.IdentityEntities;

namespace FreelancerHub.Core.Domain.Entities
{
    public class FreelancerFullProfile
    {
        public FreelancerProfile Profile { get; set; }
        public List<string> Skills { get; set; }
        public List<string> Categories { get; set; }
        public ApplicationUser User { get; set; }
    }



}
