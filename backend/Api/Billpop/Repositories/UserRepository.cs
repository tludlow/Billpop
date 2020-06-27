using Api.Data;
using Api.Models.Domain;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace Billpop.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public UserRepository(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }

        public async Task<User> GetUserIfEmailExists(string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));
        }

        public async Task<User> GetUserIfUsernameExists(string username)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));
        }

        public User GetUserById(int id)
        {
            string sql = "SELECT * FROM LISTINGS WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return connection.QuerySingleOrDefault<User>(sql, new { id });
            }
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
