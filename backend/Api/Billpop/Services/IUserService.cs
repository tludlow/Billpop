using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;

namespace Api.Services
{
    public interface IUserService
    {
        public Task<User> RegisterAsync(User user);
        public ClaimsPrincipal CreateClaimsPrinciple(User user);
        public Task<User> GetUserIfEmailExists(string email);
        public string GenerateJwt(Claim[] claims);
        public bool Verify(int level);
    }
}
