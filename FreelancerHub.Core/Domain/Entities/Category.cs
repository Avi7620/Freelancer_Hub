using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Domain.Entities
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; } 

        public Guid FreelancerId { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        [ForeignKey(nameof(FreelancerId))]
        public FreelancerProfile Freelancer { get; set; } = null!;
    }
}
