using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.DbContext
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            // Create roles if they don't exist
            await SeedRoles(roleManager);

            // Create admin users
            var adminUsers = await SeedAdminUsers(userManager, context);

            // Create clients
            var clients = await SeedClients(userManager, context);

            // Create freelancers
            var freelancers = await SeedFreelancers(userManager, context);

            // Create projects
            var projects = await SeedProjects(context, clients);

            // Create bids
            await SeedBids(context, projects, freelancers);
        }

        private static async Task SeedRoles(RoleManager<ApplicationRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new ApplicationRole() { Name = "Admin" });

            if (!await roleManager.RoleExistsAsync("Client"))
                await roleManager.CreateAsync(new ApplicationRole() { Name = "Client" });

            if (!await roleManager.RoleExistsAsync("Freelancer"))
                await roleManager.CreateAsync(new ApplicationRole() { Name = "Freelancer" });
        }

        private static async Task<List<ApplicationUser>> SeedAdminUsers(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            var adminUsers = new List<ApplicationUser>();

            var admin1 = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "admin1@freelancerhub.com",
                Email = "admin1@freelancerhub.com",
                PersonName = "Admin One",
                EmailConfirmed = true
            };

            var result1 = await userManager.CreateAsync(admin1, "Admin@123");
            if (result1.Succeeded)
            {
                await userManager.AddToRoleAsync(admin1, "Admin");
                context.AdminProfiles.Add(new AdminProfile { UserId = admin1.Id });
                adminUsers.Add(admin1);
            }

            var admin2 = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                UserName = "admin2@freelancerhub.com",
                Email = "admin2@freelancerhub.com",
                PersonName = "Admin Two",
                EmailConfirmed = true
            };

            var result2 = await userManager.CreateAsync(admin2, "Admin@123");
            if (result2.Succeeded)
            {
                await userManager.AddToRoleAsync(admin2, "Admin");
                context.AdminProfiles.Add(new AdminProfile { UserId = admin2.Id });
                adminUsers.Add(admin2);
            }

            await context.SaveChangesAsync();
            return adminUsers;
        }

        private static async Task<List<ApplicationUser>> SeedClients(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            var clients = new List<ApplicationUser>();

            for (int i = 1; i <= 10; i++)
            {
                var client = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    UserName = $"client{i}@example.com",
                    Email = $"client{i}@example.com",
                    PersonName = $"Client {i}",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(client, $"Client@{i}23");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(client, "Client");
                    context.ClientProfiles.Add(new ClientProfile
                    {
                        UserId = client.Id,
                        CompanyName = i % 2 == 0 ? $"Tech Solutions {i}" : $"Global Enterprises {i}"
                    });
                    clients.Add(client);
                }
            }

            await context.SaveChangesAsync();
            return clients;
        }

        private static async Task<List<ApplicationUser>> SeedFreelancers(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            var freelancers = new List<ApplicationUser>();
            var skills = new List<List<string>>
            {
                new List<string> { "C#", ".NET", "ASP.NET Core" },
                new List<string> { "JavaScript", "React", "Node.js" },
                new List<string> { "Python", "Django", "Flask" },
                new List<string> { "Java", "Spring Boot" },
                new List<string> { "PHP", "Laravel" },
                new List<string> { "Ruby", "Ruby on Rails" },
                new List<string> { "Swift", "iOS Development" },
                new List<string> { "Kotlin", "Android Development" },
                new List<string> { "Go", "Golang" },
                new List<string> { "TypeScript", "Angular" }
            };

            var categories = new List<List<string>>
            {
                new List<string> { "Web Development" },
                new List<string> { "Mobile Development" },
                new List<string> { "Desktop Development" },
                new List<string> { "Game Development" },
                new List<string> { "Data Science" },
                new List<string> { "Machine Learning" },
                new List<string> { "DevOps" },
                new List<string> { "Cloud Computing" },
                new List<string> { "Blockchain" },
                new List<string> { "UI/UX Design" }
            };

            for (int i = 1; i <= 10; i++)
            {
                var freelancer = new ApplicationUser
                {
                    Id = Guid.NewGuid(),
                    UserName = $"freelancer{i}@example.com",
                    Email = $"freelancer{i}@example.com",
                    PersonName = $"Freelancer {i}",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(freelancer, $"Freelancer@{i}23");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(freelancer, "Freelancer");

                    context.FreelancerProfiles.Add(new FreelancerProfile
                    {
                        UserId = freelancer.Id,
                        Country = i % 2 == 0 ? "United States" : "United Kingdom",
                        City = i % 2 == 0 ? $"New York" : $"London",
                        Title = $"Senior {skills[i - 1][0]} Developer",
                        Description = $"Experienced {skills[i - 1][0]} developer with {i + 2} years of experience",
                        Experience = $"{i + 2} years",
                        HourlyRate = 30 + (i * 5),
                        Availability = i % 3 == 0 ? "Full-time" : "Part-time",
                        Skills = skills[i - 1],
                        Categories = categories[i - 1],
                        PortfolioFilePaths = new List<string> { $"/portfolios/freelancer{i}/project1.pdf" }
                    });

                    freelancers.Add(freelancer);
                }
            }

            await context.SaveChangesAsync();
            return freelancers;
        }

        private static async Task<List<Project>> SeedProjects(ApplicationDbContext context, List<ApplicationUser> clients)
        {
            var projects = new List<Project>();
            var random = new Random();

            var projectTitles = new List<string>
            {
                "E-commerce Website Development",
                "Mobile App for Fitness Tracking",
                "CRM System Implementation",
                "Data Analysis Dashboard",
                "Blockchain Wallet Application",
                "AI Chatbot Integration",
                "Cloud Migration Project",
                "UI/UX Redesign for Existing App",
                "IoT Home Automation System",
                "Social Media Marketing Tool"
            };

            var projectDescriptions = new List<string>
            {
                "Develop a full-featured e-commerce platform with payment integration",
                "Create a cross-platform mobile app for tracking fitness activities",
                "Implement a customer relationship management system for sales team",
                "Build a dashboard for visualizing complex data analytics",
                "Develop a secure cryptocurrency wallet with multi-chain support",
                "Integrate an AI-powered chatbot for customer support",
                "Migrate existing infrastructure to cloud with zero downtime",
                "Redesign user interface and improve user experience for existing application",
                "Develop a smart home automation system using IoT technologies",
                "Build a tool for managing and automating social media marketing campaigns"
            };

            for (int i = 0; i < 10; i++)
            {
                var project = new Project
                {
                    Id = Guid.NewGuid(),
                    Title = projectTitles[i],
                    Description = projectDescriptions[i],
                    Budget = 1000 + (i * 500),
                    Deadline = DateTime.UtcNow.AddDays(30 + (i * 10)),
                    RequiredSkills = string.Join(", ", new List<string> { "Skill1", "Skill2", $"Skill{i + 1}" }),
                    ClientId = clients[i].Id,
                    Status = i % 4 == 0 ? ProjectStatus.InProgress : ProjectStatus.Open,
                    CreatedAt = DateTime.UtcNow.AddDays(-(i * 2))
                };

                if (i % 3 == 0)
                {
                    project.AcceptedFreelancerId = Guid.NewGuid(); // This would be set to actual freelancer ID in real scenario
                    project.Status = ProjectStatus.InProgress;
                }

                context.Projects.Add(project);
                projects.Add(project);
            }

            await context.SaveChangesAsync();
            return projects;
        }

        private static async Task SeedBids(ApplicationDbContext context, List<Project> projects, List<ApplicationUser> freelancers)
        {
            var random = new Random();
            var bidProposals = new List<string>
            {
                "I can deliver this project within the timeframe with high quality standards",
                "My team has extensive experience in similar projects",
                "I offer competitive pricing with guaranteed satisfaction",
                "Specialized in this type of work with portfolio examples available",
                "Can start immediately and dedicate full attention to this project",
                "Proven track record with similar clients in this industry",
                "Offer additional maintenance package post-delivery",
                "Unique approach that will add value beyond requirements",
                "Comprehensive solution covering all aspects mentioned",
                "Flexible engagement models available based on your needs"
            };

            foreach (var project in projects)
            {
                // Create 2-4 bids per project
                int bidsCount = random.Next(2, 5);
                for (int i = 0; i < bidsCount; i++)
                {
                    var freelancerIndex = random.Next(0, freelancers.Count);
                    var bid = new Bid
                    {
                        Id = Guid.NewGuid(),
                        Proposal = bidProposals[random.Next(0, bidProposals.Count)],
                        Amount = project.Budget * (decimal)(0.7 + (random.NextDouble() * 0.6)), // 70-130% of project budget
                        DeliveryDays = random.Next(14, 60),
                        CreatedAt = project.CreatedAt.AddDays(random.Next(1, 7)),
                        ProjectId = project.Id,
                        FreelancerId = freelancers[freelancerIndex].Id,
                        Status = i == 0 && project.Status == ProjectStatus.InProgress ? BidStatus.Accepted : BidStatus.Pending
                    };

                    context.Bids.Add(bid);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}