using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Core.Services;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Infrastructure.Services
{
    public class BidService : IBidService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IBidRepository _bidRepository;
        private readonly IClientRepository _clientRepository;

        public BidService(
            IProjectRepository projectRepository,
            IBidRepository bidRepository,
            IClientRepository clientRepository)
        {
            _projectRepository = projectRepository;
            _bidRepository = bidRepository;
            _clientRepository = clientRepository;
        }

        public async Task<ProjectWithClientDto> GetProjectWithClientInfo(Guid projectId)
        {
            var project = await _projectRepository.GetProjectById(projectId);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }

            var client = await _clientRepository.GetClientById(project.ClientId);
            if (client == null)
            {
                throw new KeyNotFoundException("Client not found");
            }

            return new ProjectWithClientDto
            {
                ProjectId = project.Id,
                ProjectTitle = project.Title,
                ProjectDescription = project.Description,
                ProjectBudget = project.Budget,
                ProjectDeadline = project.Deadline,
                ClientId = client.UserId,
                ClientName = project.Client?.User?.PersonName ?? "Unknown",
                CompanyName = client.CompanyName ?? "Not specified",
                BidCount = await _bidRepository.GetBidCountForProjectAsync(projectId)
            };
        }

        // Add to BidService.cs
        public async Task<BidDetailsDto> GetBidDetailsAsync(Guid bidId, Guid freelancerId)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidId);

            if (bid == null)
            {
                throw new KeyNotFoundException("Bid not found");
            }

            // Verify the bid belongs to the current freelancer
            if (bid.FreelancerId != freelancerId)
            {
                throw new UnauthorizedAccessException("You don't have permission to view this bid");
            }

            // Get project details
            var project = await _projectRepository.GetProjectById(bid.ProjectId);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }

            // Get client details
            var client = await _clientRepository.GetClientById(project.ClientId);
            if (client == null)
            {
                throw new KeyNotFoundException("Client not found");
            }

            return new BidDetailsDto
            {
                Id = bid.Id,
                Proposal = bid.Proposal,
                Amount = bid.Amount,
                DeliveryDays = bid.DeliveryDays,
                CreatedAt = bid.CreatedAt,
                Status = bid.Status,
                ProjectId = project.Id,
                ProjectTitle = project.Title,
                ClientName = project.Client?.User?.PersonName ?? "Unknown Client",
                CompanyName = client.CompanyName ?? "Unknown Company"
            };
        }

        public async Task<Bid> SubmitBidAsync(BidSubmissionDto bidDto, Guid freelancerId)
        {
            // Check if project exists
            var project = await _projectRepository.GetProjectById(bidDto.ProjectId);
            if (project == null)
            {
                throw new KeyNotFoundException("Project not found");
            }

            // Check if project is open for bids
            if (project.Status != ProjectStatus.Open)
            {
                throw new InvalidOperationException("Project is not open for bidding");
            }

            // Check if freelancer has already bid on this project
            if (await _bidRepository.BidExistsForProject(freelancerId, bidDto.ProjectId))
            {
                throw new InvalidOperationException("You have already placed a bid on this project");
            }

            // Create new bid
            var bid = new Bid
            {
                ProjectId = bidDto.ProjectId,
                FreelancerId = freelancerId,
                Proposal = bidDto.Proposal,
                Amount = bidDto.Amount,
                DeliveryDays = bidDto.DeliveryDays,
                Status = BidStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            // Save bid
            return await _bidRepository.AddBidAsync(bid);
        }
    }
}