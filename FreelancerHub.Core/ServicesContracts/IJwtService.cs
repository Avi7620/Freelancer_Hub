using FreelancerHub.Core.DTO;
using FreelancerHub.Core.IdentityEntities;
using System.Security.Claims;


namespace FreelancerHub.Core.ServicesContracts
{
    public interface IJwtService
    {
        AuthenticationResponse CreateJwtToken(ApplicationUser user);
        ClaimsPrincipal? GetPrincipalFromJwtToken(string? token);
    }

}
