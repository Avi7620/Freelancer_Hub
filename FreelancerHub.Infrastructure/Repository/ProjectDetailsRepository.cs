using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;





// ProjectDetailsRepository.cs
namespace FreelancerHub.Infrastructure.Repositories
{
    public class ProjectDetailsRepository : IProjectDetailsRepository
    {
        private readonly ApplicationDbContext _context;

        public ProjectDetailsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectWithFreelancerDto> GetProjectWithFreelancerAsync(Guid projectId, Guid clientId)
        {
            var project = await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.AcceptedFreelancer)
                    .ThenInclude(f => f.User)
                .FirstOrDefaultAsync(p => p.Id == projectId && p.ClientId == clientId);

            if (project == null)
                return null;

            return new ProjectWithFreelancerDto
            {
                ProjectId = project.Id,
                Title = project.Title,
                Description = project.Description,
                Budget = project.Budget,
                Deadline = project.Deadline,
                Status = project.Status,
                Freelancer = project.AcceptedFreelancer != null ? new FreelancerBasicInfoDto
                {
                    FreelancerId = project.AcceptedFreelancer.UserId,
                    Name = project.AcceptedFreelancer.User.PersonName,
                    Email = project.AcceptedFreelancer.User.Email,
                    Phone = project.AcceptedFreelancer.User.PhoneNumber,
                    Title = project.AcceptedFreelancer.Title
                } : null
            };
        }
    }
}
