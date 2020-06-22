using Api.Data;
using Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Billpop.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> GetUserIfEmailExists(string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));
        }

        public async Task<User> GetUserIfUsernameExists(string username)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));
        }

        public async Task<User> AddUser(User user)
        {
            var registeredUser = await _dataContext.Users.AddAsync(user);
            var registered = await _dataContext.SaveChangesAsync();
            if (registered > 0)
            {
                return registeredUser.Entity;
            }

            return null;
        }
    }
}
