using Api.Services;
using Billpop.Models;
using Billpop.Models.ExternalProvider;
using Billpop.Models.Responses;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Billpop.Services.Http
{
    public class FacebookHttpService : BaseHttpService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;

        public FacebookHttpService(HttpClient client, IConfiguration config) : base(client, config)
        {
            _clientId = _config["facebook:clientId"];
            _clientSecret = _config["facebook:clientSecret"];
        }

        public async Task<FacebookProfile> GetProfile(string code)
        {
            AccessTokenResponse token = await Get<AccessTokenResponse>($"https://graph.facebook.com/v7.0/oauth/access_token?client_id={_clientId}&redirect_uri={_config["url:ui"]}/accounts/facebook-auth&client_secret={_clientSecret}&code={code}");
            FacebookProfile profile = await Get<FacebookProfile>($"https://graph.facebook.com/me?fields=email,name,picture&access_token={token.Access_Token}");
            return profile;
        }
    }
}