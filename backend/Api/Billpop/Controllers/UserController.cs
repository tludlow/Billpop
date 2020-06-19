using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using Billpop.Models;
using Billpop.Models.ExternalProvider;
using Billpop.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IHttpService _httpService;
        private readonly IConfiguration _configuration;
        private readonly string _googleClientId;
        private readonly string _googleClientSecret;
        private readonly string _facebookClientId;
        private readonly string _facebookClientSecret;

        public UserController(IUserService userService, IHttpService httpService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
            _httpService = httpService;
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

        private async Task<IActionResult> HandleExternalProviderProfile(IExternalProviderToken profile)
        {
            if (profile.Email == null)
            {
                return BadRequest(new { error = "Problem authenicating access token" });
            }
            User user = await _userService.GetUserIfEmailExists(profile.Email);
            if (user != null)
            {
                AssignCookie(user);
                return Ok(new { username = user.Username, registered = true });
            }
            return Ok((LoginProvider)profile);
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
            string validationError = await _userService.ValidateRegistrationRequest(request);
            if(validationError != null)
            {
                return BadRequest(new { validationError });
            }
            User registeredUser = await _userService.RegisterUser(request);
            if (registeredUser != null)
            {
                AssignCookie(registeredUser);
                return Ok(new {request.Username});
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
            return Ok(new {user.Username});
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
            string sessionId = RandomStringService.GenerateAlphaNumeric(30, new Random());
            GoogleToken token = await _httpService.Post<GoogleToken>($"https://oauth2.googleapis.com/token?code={code}&client_id={_googleClientId}&client_secret={_googleClientSecret}&redirect_uri=http://localhost:3000/accounts/googleauth&grant_type=authorization_code&state={sessionId}");
            _httpService.AddBearerToken(token.Access_Token);
            GoogleToken profile = await _httpService.Get<GoogleToken>($"https://openidconnect.googleapis.com/v1/userinfo?state={sessionId}&scope=email profile email");
            return await HandleExternalProviderProfile(profile);
        }

        //https://www.facebook.com/v7.0/dialog/oauth?client_id={app-id}&redirect_uri=&state={testTokenPlsChangeNotSecure}
        [HttpPost("facebookauth")]
        public async Task<IActionResult> FacebookAuth(string code)
        {
            if (code == null)
            {
                return BadRequest(new { Error = "Authentication code required" });
            }
            FacebookToken token = await _httpService.Get<FacebookToken>($"https://graph.facebook.com/v7.0/oauth/access_token?client_id={_facebookClientId}&redirect_uri=http://localhost:3000/accounts/facebookauth&client_secret={_facebookClientSecret}&code={code}");
            FacebookToken profile = await _httpService.Get<FacebookToken>($"https://graph.facebook.com/me?fields=email,name,picture&access_token={token.Access_Token}");
            return await HandleExternalProviderProfile(profile);
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
            return Ok(new { token });
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
    }
}
