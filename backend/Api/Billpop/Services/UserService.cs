using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Data;
using Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public UserService(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
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

        public string GenerateJwt(Claim[] claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
            issuer: "https://localhost:5001",
            audience: "https://localhost:5001",
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
