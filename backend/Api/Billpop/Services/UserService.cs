using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Billpop.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
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
            return await _userRepository.GetUserIfEmailExists(email);
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

        public async Task<User> RegisterUser(RegisterRequest request)
        {
            string hashedPassword = request.Password == null
                ? null
                : PasswordHashService.HashPassword(request.Password);
            var user = new User
            {
                Email = request.Email,
                Username = request.Username,
                Password = hashedPassword,
                ExternalId = request.ExternalId
            };
            return await _userRepository.AddUser(user);
        }

        public async Task<string> ValidateRegistrationRequest(RegisterRequest request)
        {
            if (!Regex.IsMatch(request.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase))
            {
                return "Email does not have a valid format";
            }
            //if (!Regex.IsMatch(request.Password, @"^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$"))
            //{
            //    return BadRequest("Password is not strong enough");
            //}
            if (request.Password == null && request.ExternalId == null)
            {
                return "The user must have at least a password or external provider id";
            }
            if (await GetUserIfEmailExists(request.Email) != null)
            {
                return "A user with that email already exists";
            }

            return null;
        }

        public string ValidateLoginRequest(LoginRequest request, User user)
        {
            if (user == null)
            {
                return "No user is registered with this email";
            }
            if (user.Password == null)
            {
                return "User has only registered with an external provider" ;
            }
            if (!PasswordHashService.ValidatePassword(request.Password, user.Password))
            {
                return "Incorrect password";
            }
            return null;
        }
    }
}
