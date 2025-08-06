using FreelancerHub.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.ServicesContracts
{
    public interface IClientProfileService
    {
        Task<ApiResponse<ClientProfileResponseDto>> GetClientProfile(Guid userId);
        Task<ApiResponse<bool>> UpdateClientProfile(Guid userId, string companyName, string? phoneNumber);
    }
}
