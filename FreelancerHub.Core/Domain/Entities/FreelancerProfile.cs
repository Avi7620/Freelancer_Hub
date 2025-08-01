    using FreelancerHub.Core.IdentityEntities;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    namespace FreelancerHub.Core.Domain.Entities
    {
        public class FreelancerProfile
        {
            [Key]
            public Guid UserId { get; set; }

            public string? Country { get; set; }
            public string? City { get; set; }

            public string? Title { get; set; }
            public string? Description { get; set; }

            public string? Experience { get; set; }

            public decimal? HourlyRate { get; set; }

            public string ? Availability { get; set; }

            public List<string>? Skills { get; set; }
            public List<string>? Categories { get; set; }

            public List<string>? PortfolioFilePaths { get; set; }

            public virtual ApplicationUser? User { get; set; }
        }
    }
