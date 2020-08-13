using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using Billpop.Models;
using Billpop.Models.ExternalProvider;
using Billpop.Services;
using Billpop.Services.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Api.Controllers
{
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAzureBlobService _azureBlobService;
        private readonly IConfiguration _configuration;
        private readonly GoogleHttpService _googleHttpService;
        private readonly FacebookHttpService _facebookHttpService;

        public UserController(IUserService userService, IConfiguration configuration, IAzureBlobService azureBlobService, GoogleHttpService googleHttpService, FacebookHttpService facebookHttpService)
        {
            _userService = userService;
            _configuration = configuration;
            _azureBlobService = azureBlobService;
            _googleHttpService = googleHttpService;
            _facebookHttpService = facebookHttpService;
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

        private async Task<IActionResult> HandleExternalProviderProfile(LoginProvider profile)
        {
            if (profile.Email == null)
            {
                return BadRequest(new { error = "Problem authenicating access token" });
            }
            User user = await _userService.GetUserIfEmailExists(profile.Email);
            if (user != null)
            {
                AssignCookie(user);
                return Ok(new { user.Id, username = user.Username, registered = true });
            }
            return Ok(profile);
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
            var test = User.Claims.FirstOrDefault(x => x.Type.Equals("UserId"));
            return Ok(new { test = test.Value });
        }

        [Authorize]
        [HttpPost("auth")]
        public IActionResult Auth()
        {
            var username = User.Claims.FirstOrDefault(x => x.Type == "Username")?.Value;
            return Ok(new { username });
        }

        [HttpPost("emailusernameexist")]
        public async Task<IActionResult> EmailUsernameExist(string email, string username)
        {
            if(await _userService.GetUserIfUsernameExists(username) != null)
            {
                return Ok(new { error = "username" });
            }
            if(email != null && await _userService.GetUserIfEmailExists(email) != null)
            {
                return Ok(new { error = "email" });
            }
            return Ok(new { error = "" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            string validationError = await _userService.ValidateRegistrationRequest(request);
            if(validationError != null)
            {
                return BadRequest(new { validationError });
            }
            User registeredUser = await _userService.RegisterUser(request);
            if (registeredUser != null)
            {
                AssignCookie(registeredUser);
                return Ok(new {registeredUser.Id, registeredUser.Username});
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            User user = await _userService.GetUserIfEmailExists(request.Email);
            string validationError = _userService.ValidateLoginRequest(request, user);
            if (validationError != null)
            {
                return BadRequest(new { validationError });
            }
            AssignCookie(user);
            return Ok(new {user.Id, user.Username});
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            return NoContent();
        }

        //https://accounts.google.com/o/oauth2/v2/auth?client_id=782331995857-acdjkm1gq4pqv46blcmi02b3is34spjd.apps.googleusercontent.com&redirect_uri=http://localhost:3000/accounts/googleauth&response_type=code&scope=openid email profile
        [HttpPost("googleauth")]
        public async Task<IActionResult> GoogleAuth(string code)
        {
            if (code == null)
            {
                return BadRequest(new { Error = "Authentication code required" });
            }
            GoogleProfile profile = await _googleHttpService.GetProfile(code);
            return await HandleExternalProviderProfile((LoginProvider)profile);
        }

        //https://www.facebook.com/v7.0/dialog/oauth?client_id={app-id}&redirect_uri=&state={testTokenPlsChangeNotSecure}
        [HttpPost("facebookauth")]
        public async Task<IActionResult> FacebookAuth(string code)
        {
            if (code == null)
            {
                return BadRequest(new { Error = "Authentication code required" });
            }
            
            FacebookProfile profile = await _facebookHttpService.GetProfile(code);
            return await HandleExternalProviderProfile((LoginProvider)profile);
        }

        [HttpPost("createregistrationsms")]
        public IActionResult CreateRegistrationSms(string phoneNumber)
        {
            if(phoneNumber == null)
            {
                return BadRequest(new { error = "User's phone number is required" });
            }
            string verificationCode = RandomStringService.GenerateNumericString(6, new Random());
            TwilioClient.Init(_configuration["twilio:accountSid"], _configuration["twilio:authToken"]);
            var message = MessageResource.Create(
                body: verificationCode + " - Billpop Verification code",
                from: new Twilio.Types.PhoneNumber(_configuration["twilio:phone1"]),
                to: new Twilio.Types.PhoneNumber(phoneNumber)
            );
            var claims = new[]
            {
                new Claim("verificationCode", verificationCode),
            };
            string token = _userService.GenerateJwt(claims);
            return Ok(new { token, verificationCode });
        }

        [HttpPost("createregistrationsmstest")]
        public IActionResult CreateRegistrationSmsTest(string phoneNumber)
        {
            if (phoneNumber == null)
            {
                return BadRequest(new { error = "User's phone number is required" });
            }
            string verificationCode = RandomStringService.GenerateNumericString(6, new Random());
            var claims = new[]
            {
                new Claim("verificationCode", verificationCode),
            };
            string token = _userService.GenerateJwt(claims);
            return Ok(new { token, verificationCode });
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("verifyregistrationsms")]
        public IActionResult VerifyRegistrationSms(string code)
        {
            string verificationCode = User.Claims.FirstOrDefault(x => x.Type == "verificationCode").Value;
            if(verificationCode == null)
            {
                return BadRequest(new { error = "Invalid bearer token" });
            }
            if (code != verificationCode)
            {
                return BadRequest(new { error = "Incorrect code" });
            }

            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User user = _userService.GetUserById(id);
            return Ok(new { Id = user.Id, username = user.Username });
        }

        [Authorize]
        [HttpPost("uploadimage")]
        public async Task<IActionResult> UploadImageAsync()
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            var request = await HttpContext.Request.ReadFormAsync();
            List<IFormFile> files = request.Files.Where(x => x.ContentType.StartsWith("image")).ToList();
            if(files == null || files.Count == 0)
            {
                return BadRequest();
            }
            await _azureBlobService.UploadAsync(files, $"u/{userId}/", "profile");
            return Ok();
        }
    }
}
