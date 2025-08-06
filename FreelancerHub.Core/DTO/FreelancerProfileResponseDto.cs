using FreelancerHub.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerProfileResponseDto
    {
        public Guid UserId { get; set; }
        public string? PersonName { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Experience { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Availability { get; set; }
        public List<string>? Skills { get; set; }
        public List<string>? Categories { get; set; }

        public FreelancerProfileResponseDto(FreelancerProfile profile)
        {
            UserId = profile.UserId;
            PersonName = profile.User?.PersonName;
            Email = profile.User?.Email;
            Country = profile.Country;
            City = profile.City;
            Title = profile.Title;
            Description = profile.Description;
            Experience = profile.Experience;
            HourlyRate = profile.HourlyRate;
            Availability = profile.Availability;
            Skills = profile.Skills;
            Categories = profile.Categories;
            // PortfolioFilePaths is intentionally excluded as per requirements
        }
    }
}
