using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Experience { get; set; }
        public string? HourlyRate { get; set; }
        public string? Availability { get; set; }
        public List<string>? Skills { get; set; }
        public List<string>? Categories { get; set; }
        public List<IFormFile>? Portfolio { get; set; }
        public bool AgreeToTerms { get; set; }
    }
}