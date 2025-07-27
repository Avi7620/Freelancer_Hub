using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FreelancerHub.Core.DTO
{
    public class FreelancerDTO
    {
        [Required(ErrorMessage = "First Name is required")]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [MaxLength(50)]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string? Password { get; set; } 

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string? ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Country is required")]
        public string? Country { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string? City { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(100)]
        public string? Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MinLength(50, ErrorMessage = "Description must be at least 50 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Experience is required")]
        public string? Experience { get; set; }

        [Required(ErrorMessage = "Hourly Rate is required")]
        public string? HourlyRate { get; set; }

        [Required(ErrorMessage = "Availability is required")]
        public string? Availability { get; set; }

        [Required(ErrorMessage = "Skills are required")]
        [MinLength(1, ErrorMessage = "At least one skill is required")]
        public List<string>? Skills { get; set; }

        [Required(ErrorMessage = "At least one category is required")]
        [MinLength(1, ErrorMessage = "Select at least one category")]
        public List<string>? Categories { get; set; }

        [Required(ErrorMessage = "Please upload at least one portfolio file")]
        public List<IFormFile>? Portfolio { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the terms")]
        public bool AgreeToTerms { get; set; }
    }
}
