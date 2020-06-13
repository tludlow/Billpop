using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using Billpop.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Api.Controllers
{
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly HttpClient _client;
        private readonly IConfiguration _configuration;
        private readonly string _googleClientId;
        private readonly string _googleClientSecret;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _client = new HttpClient();
            _configuration = configuration;
            _googleClientId = _configuration["google:clientId"];
            _googleClientSecret = _configuration["google:clientSecret"];
    }

    private async void AssignCookie(User user)
        {
            ClaimsPrincipal claimsPrincipal = _userService.CreateClaimsPrinciple(user);
            await Request.HttpContext.SignInAsync(
                "Cookies",
                claimsPrincipal,
                new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow.AddDays(90),
                    IsPersistent = true
                });
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return new JsonResult(new {test = "test"});
        }

        [Authorize]
        [HttpGet("test1")]
        public IActionResult Test1()
        {
            var test = User.Claims.FirstOrDefault(x => x.Type.Equals("UserID"));
            return Ok(new { test = test.Value });
        }

        [Authorize]
        [HttpPost("auth")]
        public IActionResult Auth()
        {
            var userName = User.Claims.FirstOrDefault(x => x.Type == "UserName")?.Value;
            return Ok(new { userName });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!Regex.IsMatch(request.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase))
            {
                return BadRequest("Email does not have a valid format");
            }
            //if (!Regex.IsMatch(request.Password, @"^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$"))
            //{
            //    return BadRequest("Password is not strong enough");
            //}
            if(request.Password == null && request.ExternalId == null)
            {
                return BadRequest("The user must have at least a password or external provider id");
            }
            if (await _userService.GetUserIfEmailExists(request.Email) != null)
            {
                return BadRequest("A user with that email already exists");
            }
            string hashedPassword = request.Password == null
                ? null
                : PasswordHashService.HashPassword(request.Password);
            var user = new User
            {
                Email = request.Email,
                UserName = request.UserName,
                Password = hashedPassword,
                ExternalId = request.ExternalId
            };
            User registeredUser = await _userService.RegisterAsync(user);
            if (registeredUser != null)
            {
                ClaimsPrincipal claimsPrincipal = _userService.CreateClaimsPrinciple(user);
                await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
                return Ok(new { test = "test" });
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            User user = await _userService.GetUserIfEmailExists(request.Email);
            if(user == null)
            {
                return BadRequest("No user is registered with this email");
            }
            if (!PasswordHashService.ValidatePassword(request.Password, user.Password))
            {
                return BadRequest("Incorrect password");
            }
            AssignCookie(user);
            return Ok(new {userName = user.UserName});
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            return NoContent();
        }

        //https://accounts.google.com/o/oauth2/v2/auth?client_id=782331995857-acdjkm1gq4pqv46blcmi02b3is34spjd.apps.googleusercontent.com&redirect_uri=https://localhost:5001/api/user/googleauth&response_type=code&scope=openid email profile
        [HttpGet("googleauth")]
        public async Task<IActionResult> GoogleAuth(string code)
        {
            string sessionId = RandomStringService.GenerateString(30, new Random());
            var tokenResponse = await _client.PostAsync($"https://oauth2.googleapis.com/token?code={code}&client_id={_googleClientId}&client_secret={_googleClientSecret}&redirect_uri=https://localhost:5001/api/user/googleauth&grant_type=authorization_code&state={sessionId}", null);
            string tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            var tokenResult = JsonConvert.DeserializeObject<GoogleToken>(tokenJson);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenResult.Access_Token);
            var profileResponse = await _client.GetAsync("https://openidconnect.googleapis.com/v1/userinfo?state={state}&scope=email profile email");
            string profileJson = await profileResponse.Content.ReadAsStringAsync();
            var profileResult = JsonConvert.DeserializeObject<GoogleToken>(profileJson);
            if (profileResult.Email == null)
            {
                return BadRequest();
            }
            User user = await _userService.GetUserIfEmailExists(profileResult.Email);
            if (user != null)
            {
                AssignCookie(user);
                return Ok(new {userName = user.UserName, registered = true});
            }
            return Ok((LoginProvider)profileResult);
        }
    }
}
