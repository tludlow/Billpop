using System.Security.Claims;
using System.Threading.Tasks;
using Api.Data;
using Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> RegisterAsync(User user)
        {
            var registeredUser = await _dataContext.Users.AddAsync(user);
            var registered = await _dataContext.SaveChangesAsync();
            if (registered > 0)
            {
                return registeredUser.Entity;
            }

            return null;
        }

        public ClaimsPrincipal CreateClaimsPrinciple(User user)
        {
            var claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("Role", user.Role.ToString())
            }, "Cookies");

            return new ClaimsPrincipal(claimsIdentity);
        }
        public async Task<User> GetUserIfEmailExists(string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));

        }

        public bool Verify(int level)
        {
            throw new System.NotImplementedException();
        }
    }
}
