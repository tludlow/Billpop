using Api.Services;
using Billpop.Models;
using Billpop.Models.Responses;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Billpop.Services.Http
{
    public class GoogleHttpService : BaseHttpService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        public GoogleHttpService(HttpClient client, IConfiguration config) : base(client, config)
        {
            _clientId = _config["google:clientId"];
            _clientSecret = _config["google:clientSecret"];
        }

        public async Task<GoogleProfile> GetProfile(string code)
        {
            string sessionId = RandomStringService.GenerateAlphaNumeric(30, new Random());
            AccessTokenResponse token = await Post<AccessTokenResponse>($"https://oauth2.googleapis.com/token?code={code}&client_id={_clientId}&client_secret={_clientSecret}&redirect_uri={_config["url:ui"]}/accounts/google-auth&grant_type=authorization_code&state={sessionId}");
            AddBearerToken(token.Access_Token);
            GoogleProfile profile = await Get<GoogleProfile>($"https://openidconnect.googleapis.com/v1/userinfo?state={sessionId}&scope=email profile email");
            return profile;
        }
    }
}
