using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;

using FreelancerHub.Core.Interfaces;
using FreelancerHub.Infrastructure.Services;
using Moq;

using Xunit;


namespace FreelancerHub.ServiceTests
{
    public class ClientBidServiceTests
    {
        private readonly Mock<IClientRepository> _clientRepoMock = new();
        private readonly Mock<IProjectBidRepository> _bidRepoMock = new();
        private readonly ClientBidService _service;

        public ClientBidServiceTests()
        {
            _service = new ClientBidService(_bidRepoMock.Object, _clientRepoMock.Object);
        }

        [Fact]
        public async Task GetProjectBidsAsync_ValidClient_ReturnsBids()
        {
            // Arrange
            var clientId = Guid.NewGuid();
            var projectId = Guid.NewGuid();
            var expectedBids = new ProjectBidsDto();

            _clientRepoMock.Setup(x => x.GetClientById(clientId))
                .ReturnsAsync(new ClientProfile { UserId = clientId });

            _bidRepoMock.Setup(x => x.GetProjectBidsWithFreelancersAsync(projectId, clientId))
                .ReturnsAsync(expectedBids);

            // Act
            var result = await _service.GetProjectBidsAsync(projectId, clientId);

            // Assert
            Assert.Same(expectedBids, result);
        }

        [Fact]
        public async Task GetProjectBidsAsync_InvalidClient_ThrowsUnauthorized()
        {
            // Arrange
            var clientId = Guid.NewGuid();
            var projectId = Guid.NewGuid();

            _clientRepoMock.Setup(x => x.GetClientById(clientId))
                .ReturnsAsync((ClientProfile)null);

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedAccessException>(
                () => _service.GetProjectBidsAsync(projectId, clientId));
        }

        [Fact]
        public async Task GetProjectBidsAsync_RepositoryThrows_PropagatesException()
        {
            // Arrange
            var clientId = Guid.NewGuid();
            var projectId = Guid.NewGuid();
            var expectedException = new Exception("Database error");

            _clientRepoMock.Setup(x => x.GetClientById(clientId))
                .ThrowsAsync(expectedException);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<Exception>(
                () => _service.GetProjectBidsAsync(projectId, clientId));

            Assert.Equal("Database error", exception.Message);
        }
    }
}
