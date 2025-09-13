using FreelancerHub.Core.IdentityEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.Entities
{
    public class AdminProfile
    {
        [Key]
        public Guid UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }

}
