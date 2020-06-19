using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;

namespace Api.Services
{
    public interface IUserService
    {
        public Task<string> ValidateRegistrationRequest(RegisterRequest request);
        public string ValidateLoginRequest(LoginRequest request, User user);
        public Task<User> RegisterUser(RegisterRequest request);
        public ClaimsPrincipal CreateClaimsPrinciple(User user);
        public Task<User> GetUserIfEmailExists(string email);
        public string GenerateJwt(Claim[] claims);
        public bool Verify(int level);
    }
}
