using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace FreelancerHub.Infrastructure.Repository
{
    public class ClientProfileRepository : IClientProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ClientProfile?> GetClientProfileAsync(Guid userId)
        {
            return await _context.ClientProfiles
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task<bool> UpdateClientProfileAsync(ClientProfile profile)
        {
            _context.ClientProfiles.Update(profile);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
