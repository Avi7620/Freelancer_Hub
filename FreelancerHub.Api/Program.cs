
    using FreelancerHub.Core.Domain.Entities;
    using FreelancerHub.Core.Domain.RepositoryContracts;
    using FreelancerHub.Core.IdentityEntities;
    using FreelancerHub.Core.Interfaces;
    using FreelancerHub.Core.Services;
    using FreelancerHub.Core.ServicesContracts;
    using FreelancerHub.Infrastructure.DbContext;
    using FreelancerHub.Infrastructure.Repositories;
    using FreelancerHub.Infrastructure.Repository;
    using FreelancerHub.Infrastructure.Services;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;
    using System.Text.Json;
    using System.Text.Json.Serialization;


    var builder = WebApplication.CreateBuilder(args);


    builder.Configuration.GetConnectionString("DefaultConnection"); 

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

    var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();


    builder.Services.Configure<EmailSettings>(
        builder.Configuration.GetSection("EmailSettings"));


    builder.Services.AddSingleton<IJwtService, JwtService>();
    builder.Services.AddScoped<IFreelancerProfileData ,FreelancerProfileData>();
    builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
    // Add this line where you register other services
    builder.Services.AddScoped<IClientRepository, ClientRepository>();

    builder.Services.AddScoped<IBidRepository, BidRepository>();
    builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
    builder.Services.AddScoped<IClientRepository, ClientRepository>();
// Add repositories
builder.Services.AddScoped<IClientProfileRepository, ClientProfileRepository>();

// Add services
builder.Services.AddScoped<IClientProfileService, ClientProfileService>();


// Register services
builder.Services.AddScoped<IProjectDetailsService, ProjectDetailsService>();

builder.Services.AddScoped<IProjectDetailsRepository, ProjectDetailsRepository>();

// Add this with your other service registrations
builder.Services.AddScoped<IClientProjectService, ClientProjectService>();
    builder.Services.AddScoped<IProjectBidRepository, ProjectBidRepository>();
    builder.Services.AddScoped<IClientBidService, ClientBidService>();

    builder.Services.AddScoped<IFreelancerBidRepository, FreelancerBidRepository>();

builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

// Register EmailService
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<IFreelancerBidStatusService, FreelancerBidStatusService>();

    builder.Services.AddScoped<IProjectAssignmentRepository, ProjectAssignmentRepository>();

    builder.Services.AddScoped<IProjectAssignmentService, ProjectAssignmentService>();

    // Register services
    builder.Services.AddScoped<IBidService, BidService>();

    builder.Services.AddAuthorization();


    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        options.Password.RequiredLength = 5;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = true;
        options.Password.RequireDigit = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddUserStore<UserStore<ApplicationUser, ApplicationRole, ApplicationDbContext, Guid>>()
    .AddRoleStore<RoleStore<ApplicationRole, ApplicationDbContext, Guid>>();

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
         
        };
    });






    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowLocalhost5173", policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });


    builder.Services.AddControllers()
        .AddJsonOptions(opts =>
        {
            opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });


    builder.Services.AddSwaggerGen();





    var app = builder.Build();

    // Seed database
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<ApplicationDbContext>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<ApplicationRole>>();

            // Apply migrations
            context.Database.Migrate();

            // Seed data
            await ApplicationDbContextSeed.SeedData(context, userManager, roleManager);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while seeding the database.");
        }
    }



    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseCors("AllowLocalhost5173");


    app.UseAuthentication();


    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
