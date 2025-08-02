using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ClientProfile> GetClientById(Guid clientId)
        {
            return await _context.ClientProfiles
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.UserId == clientId);
        }

        public async Task<ClientProfile> GetClientWithProjects(Guid clientId)
        {
            return await _context.ClientProfiles
                .Include(c => c.User)
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.UserId == clientId);
        }

        public async Task<bool> UpdateClientCompanyName(Guid clientId, string companyName)
        {
            var client = await _context.ClientProfiles.FindAsync(clientId);
            if (client == null) return false;

            client.CompanyName = companyName;
            _context.ClientProfiles.Update(client);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}