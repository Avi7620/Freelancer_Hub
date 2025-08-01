using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.Entities
{
    public class Skill
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid FreelancerId { get; set; }   // FK to FreelancerProfile

        public string SkillName { get; set; } = null!;

        [ForeignKey(nameof(FreelancerId))]
        public FreelancerProfile Freelancer { get; set; }
    }


}
