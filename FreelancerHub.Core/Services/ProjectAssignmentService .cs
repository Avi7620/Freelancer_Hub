using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.Enums;
using FreelancerHub.Core.Interfaces;
using FreelancerHub.Core.ServicesContracts;
using System;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Services
{
    public class ProjectAssignmentService : IProjectAssignmentService
    {
        private readonly IProjectAssignmentRepository _assignmentRepository;
        private readonly IProjectRepository _projectRepository;

        public ProjectAssignmentService(
            IProjectAssignmentRepository assignmentRepository,
            IProjectRepository projectRepository)
        {
            _assignmentRepository = assignmentRepository;
            _projectRepository = projectRepository;
        }

        public async Task<ApiResponse<bool>> AssignProjectToFreelancerAsync(ProjectAssignmentDto assignmentDto)
        {
            try
            {
                // Verify project exists and belongs to client
                var project = await _projectRepository.GetProjectById(assignmentDto.ProjectId);
                if (project == null || project.ClientId != assignmentDto.ClientId)
                {
                    return new ApiResponse<bool>
                    {
                        Success = false,
                        Status = "NOT_FOUND",
                        Message = "Project not found or access denied"
                    };
                }

                // Validate assignment
                if (!await _assignmentRepository.IsValidAssignmentAsync(
                    assignmentDto.ProjectId,
                    assignmentDto.FreelancerId,
                    assignmentDto.ClientId))
                {
                    return new ApiResponse<bool>
                    {
                        Success = false,
                        Status = "INVALID_ASSIGNMENT",
                        Message = "Freelancer hasn't bid on this project"
                    };
                }

                // Execute assignment
                var result = await _assignmentRepository.AssignProjectToFreelancerAsync(
                    assignmentDto.ProjectId,
                    assignmentDto.FreelancerId,
                    assignmentDto.ClientId);

                return new ApiResponse<bool>
                {
                    Success = result,
                    Status = result ? "SUCCESS" : "FAILED",
                    Message = result ?
                        "Project assigned successfully" :
                        "Failed to assign project",
                    Data = result
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<bool>
                {
                    Success = false,
                    Status = "SERVER_ERROR",
                    Message = "Error assigning project",
                    Details = ex.Message
                };
            }
        }
    }
}