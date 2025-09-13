using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.ServicesContracts;



// ProjectDetailsService.cs
namespace FreelancerHub.Infrastructure.Services
{
    public class ProjectDetailsService : IProjectDetailsService
    {
        private readonly IProjectDetailsRepository _projectDetailsRepository;

        public ProjectDetailsService(IProjectDetailsRepository projectDetailsRepository)
        {
            _projectDetailsRepository = projectDetailsRepository;
        }

        public async Task<ApiResponse<ProjectWithFreelancerDto>> GetProjectDetailsAsync(Guid projectId, Guid clientId)
        {
            try
            {
                var projectDetails = await _projectDetailsRepository.GetProjectWithFreelancerAsync(projectId, clientId);

                if (projectDetails == null)
                {
                    return new ApiResponse<ProjectWithFreelancerDto>
                    {
                        Success = false,
                        Status = "NOT_FOUND",
                        Message = "Project not found or you don't have permission to view it"
                    };
                }

                return new ApiResponse<ProjectWithFreelancerDto>
                {
                    Success = true,
                    Status = "SUCCESS",
                    Message = "Project details retrieved successfully",
                    Data = projectDetails
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<ProjectWithFreelancerDto>
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Failed to retrieve project details",
                    Details = ex.Message
                };
            }
        }
    }
}
