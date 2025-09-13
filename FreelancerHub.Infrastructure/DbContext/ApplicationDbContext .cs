using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.IdentityEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FreelancerHub.Infrastructure.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Profile Tables
        public DbSet<AdminProfile> AdminProfiles { get; set; }
        public DbSet<ClientProfile> ClientProfiles { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }

        // Project Tables
        public DbSet<Project> Projects { get; set; }
        public DbSet<Bid> Bids { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure decimal precision for all monetary fields
            ConfigureDecimalPrecision(builder);

            // 1:1 User Profile Relationships
            ConfigureUserProfiles(builder);

            // Project Relationships
            ConfigureProjectRelationships(builder);
        }

        private void ConfigureDecimalPrecision(ModelBuilder builder)
        {
            builder.Entity<FreelancerProfile>()
                .Property(fp => fp.HourlyRate)
                .HasPrecision(18, 2);

            builder.Entity<Project>()
                .Property(p => p.Budget)
                .HasPrecision(18, 2);

            builder.Entity<Bid>()
                .Property(b => b.Amount)
                .HasPrecision(18, 2);
        }

        private void ConfigureUserProfiles(ModelBuilder builder)
        {
            builder.Entity<AdminProfile>(entity =>
            {
                entity.HasKey(ap => ap.UserId);
                entity.HasOne(ap => ap.User)
                    .WithOne(u => u.AdminProfile)
                    .HasForeignKey<AdminProfile>(ap => ap.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<ClientProfile>(entity =>
            {
                entity.HasKey(cp => cp.UserId);
                entity.HasOne(cp => cp.User)
                    .WithOne(u => u.ClientProfile)
                    .HasForeignKey<ClientProfile>(cp => cp.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<FreelancerProfile>(entity =>
            {
                entity.HasKey(fp => fp.UserId);
                entity.HasOne(fp => fp.User)
                    .WithOne(u => u.FreelancerProfile)
                    .HasForeignKey<FreelancerProfile>(fp => fp.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private void ConfigureProjectRelationships(ModelBuilder builder)
        {
            // Client → Projects (1:N)
            builder.Entity<Project>(entity =>
            {
                entity.HasOne(p => p.Client)
                    .WithMany(c => c.Projects)
                    .HasForeignKey(p => p.ClientId)
                    .OnDelete(DeleteBehavior.NoAction); // Changed from Cascade

                // Project → Freelancer (Optional N:1)
                entity.HasOne(p => p.AcceptedFreelancer)
                    .WithMany()
                    .HasForeignKey(p => p.AcceptedFreelancerId)
                    .OnDelete(DeleteBehavior.NoAction); // Changed from SetNull
            });

            // Project ↔ Bids (1:N)
            builder.Entity<Bid>(entity =>
            {
                entity.HasOne(b => b.Project)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(b => b.ProjectId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Freelancer → Bids (1:N)
                entity.HasOne(b => b.Freelancer)
                    .WithMany(f => f.Bids)
                    .HasForeignKey(b => b.FreelancerId)
                    .OnDelete(DeleteBehavior.NoAction); // Changed from Restrict
            });
        }
    }
}