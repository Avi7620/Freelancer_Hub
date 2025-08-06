using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Core.DTO;
using FreelancerHub.Core.ServicesContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.Services
{
    public class ClientProfileService : IClientProfileService
    {
        private readonly IClientProfileRepository _clientProfileRepository;

        public ClientProfileService(IClientProfileRepository clientProfileRepository)
        {
            _clientProfileRepository = clientProfileRepository;
        }

        public async Task<ApiResponse<ClientProfileResponseDto>> GetClientProfile(Guid userId)
        {
            var profile = await _clientProfileRepository.GetClientProfileAsync(userId);

            if (profile == null || profile.User == null)
            {
                return new ApiResponse<ClientProfileResponseDto>
                {
                    Success = false,
                    Status = "NOT_FOUND",
                    Message = "Client profile not found"
                };
            }

            return new ApiResponse<ClientProfileResponseDto>
            {
                Success = true,
                Status = "SUCCESS",
                Message = "Client profile retrieved successfully",
                Data = new ClientProfileResponseDto(profile.User, profile)
            };
        }

        public async Task<ApiResponse<bool>> UpdateClientProfile(Guid userId, string companyName, string? phoneNumber)
        {
            var profile = await _clientProfileRepository.GetClientProfileAsync(userId);

            if (profile == null || profile.User == null)
            {
                return new ApiResponse<bool>
                {
                    Success = false,
                    Status = "NOT_FOUND",
                    Message = "Client profile not found"
                };
            }

            // Update company name
            profile.CompanyName = companyName;

            // Update phone number if provided
            if (!string.IsNullOrWhiteSpace(phoneNumber))
            {
                profile.User.PhoneNumber = phoneNumber;
            }

            var updated = await _clientProfileRepository.UpdateClientProfileAsync(profile);

            return new ApiResponse<bool>
            {
                Success = updated,
                Status = updated ? "SUCCESS" : "UPDATE_FAILED",
                Message = updated ? "Profile updated successfully" : "Failed to update profile",
                Data = updated
            };
        }
    }
}
