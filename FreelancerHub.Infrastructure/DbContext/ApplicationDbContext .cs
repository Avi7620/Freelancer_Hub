using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.IdentityEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace FreelancerHub.Infrastructure.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<AdminProfile> AdminProfiles { get; set; }
        public DbSet<ClientProfile> ClientProfiles { get; set; }
        public DbSet<FreelancerProfile> FreelancerProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // AdminProfile - one-to-one
            builder.Entity<AdminProfile>()
                .HasKey(ap => ap.UserId);

            builder.Entity<AdminProfile>()
                .HasOne(ap => ap.User)
                .WithOne(u => u.AdminProfile)
                .HasForeignKey<AdminProfile>(ap => ap.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ClientProfile - one-to-one
            builder.Entity<ClientProfile>()
                .HasKey(cp => cp.UserId);

            builder.Entity<ClientProfile>()
                .HasOne(cp => cp.User)
                .WithOne(u => u.ClientProfile)
                .HasForeignKey<ClientProfile>(cp => cp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // FreelancerProfile - one-to-one
            builder.Entity<FreelancerProfile>()
                .HasKey(fp => fp.UserId);

            builder.Entity<FreelancerProfile>()
                .HasOne(fp => fp.User)
                .WithOne(u => u.FreelancerProfile)
                .HasForeignKey<FreelancerProfile>(fp => fp.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            // ✅ Fix decimal precision warning for HourlyRate
            builder.Entity<FreelancerProfile>()
                .Property(fp => fp.HourlyRate)
                .HasPrecision(18, 2); 


        }

  

    }
}
