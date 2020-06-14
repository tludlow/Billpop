﻿using System;
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
using Billpop.Models.Requests;
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
        private readonly string _facebookClientId;
        private readonly string _facebookClientSecret;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _client = new HttpClient();
            _configuration = configuration;
            _googleClientId = _configuration["google:clientId"];
            _googleClientSecret = _configuration["google:clientSecret"];
            _facebookClientId = _configuration["facebook:clientId"];
            _facebookClientSecret = _configuration["facebook:clientSecret"];
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
            var username = User.Claims.FirstOrDefault(x => x.Type == "Username")?.Value;
            return Ok(new { username });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!Regex.IsMatch(request.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase))
            {
                return BadRequest(new { error = "Email does not have a valid format" });
            }
            //if (!Regex.IsMatch(request.Password, @"^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{7,50}$"))
            //{
            //    return BadRequest("Password is not strong enough");
            //}
            if(request.Password == null && request.ExternalId == null)
            {
                return BadRequest(new {error = "The user must have at least a password or external provider id"});
            }
            if (await _userService.GetUserIfEmailExists(request.Email) != null)
            {
                return BadRequest(new {error = "A user with that email already exists"});
            }
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
            User registeredUser = await _userService.RegisterAsync(user);
            if (registeredUser != null)
            {
                ClaimsPrincipal claimsPrincipal = _userService.CreateClaimsPrinciple(user);
                await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
                return Ok(new {test = "test"});
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            User user = await _userService.GetUserIfEmailExists(request.Email);
            if (user == null)
            {
                return BadRequest(new {error = "No user is registered with this email"});
            }
            if(user.Password == null)
            {
                return BadRequest(new { error = "User has only registered with an external provider"});
            }
            if (!PasswordHashService.ValidatePassword(request.Password, user.Password))
            {
                return BadRequest(new {error = "Incorrect password"});
            }
            AssignCookie(user);
            return Ok(new {username = user.Username});
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            return NoContent();
        }

        //https://accounts.google.com/o/oauth2/v2/auth?client_id=782331995857-acdjkm1gq4pqv46blcmi02b3is34spjd.apps.googleusercontent.com&redirect_uri=http://localhost:3000/accounts/googleauth&response_type=code&scope=openid email profile
        [HttpPost("googleauth")]
        public async Task<IActionResult> GoogleAuth([FromBody] ExternalProviderAuthRequest request)
        {
            string sessionId = RandomStringService.GenerateString(30, new Random());
            var tokenResponse = await _client.PostAsync($"https://oauth2.googleapis.com/token?code={request.Code}&client_id={_googleClientId}&client_secret={_googleClientSecret}&redirect_uri=http://localhost:3000/accounts/googleauth&grant_type=authorization_code&state={sessionId}", null);
            string tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            var tokenResult = JsonConvert.DeserializeObject<GoogleToken>(tokenJson);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenResult.Access_Token);
            var profileResponse = await _client.GetAsync("https://openidconnect.googleapis.com/v1/userinfo?state={state}&scope=email profile email");
            string profileJson = await profileResponse.Content.ReadAsStringAsync();
            var profileResult = JsonConvert.DeserializeObject<GoogleToken>(profileJson);
            if (profileResult.Email == null)
            {
                return BadRequest(new { error = "Problem authenicating access token" });
            }
            User user = await _userService.GetUserIfEmailExists(profileResult.Email);
            if (user != null)
            {
                AssignCookie(user);
                return Ok(new {username = user.Username, registered = true});
            }
            return Ok((LoginProvider)profileResult);
        }

        //https://www.facebook.com/v7.0/dialog/oauth?client_id={app-id}&redirect_uri=&state={testTokenPlsChangeNotSecure}
        [HttpPost("facebookauth")]
        public async Task<IActionResult> FacebookAuth([FromBody] ExternalProviderAuthRequest request)
        {
            string sessionId = RandomStringService.GenerateString(30, new Random());
            var tokenResponse = await _client.GetAsync($"https://graph.facebook.com/v7.0/oauth/access_token?client_id={_facebookClientId}&redirect_uri=http://localhost:3000/accounts/facebookauth&client_secret={_facebookClientSecret}&code={request.Code}");
            string tokenJson = await tokenResponse.Content.ReadAsStringAsync();
            var tokenResult = JsonConvert.DeserializeObject<FacebookToken>(tokenJson);
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenResult.Access_Token);
            var profileResponse = await _client.GetAsync($"https://graph.facebook.com/me?fields=email,name,picture&access_token={tokenResult.Access_Token}");
            string profileJson = await profileResponse.Content.ReadAsStringAsync();
            var profileResult = JsonConvert.DeserializeObject<FacebookToken>(profileJson);
            if (profileResult.Email == null)
            {
                return BadRequest(new { error = "Problem authenicating access token" });
            }
            User user = await _userService.GetUserIfEmailExists(profileResult.Email);
            if (user != null)
            {
                AssignCookie(user);
                return Ok(new { username = user.Username, registered = true });
            }
            return Ok((LoginProvider)profileResult);
        }
    }
}
