using Api.Services;
using Billpop.Repositories;
using Billpop.Services;
using Billpop.Services.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Installers
{
    public class HttpInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient<GoogleHttpService>();
            services.AddHttpClient<FacebookHttpService>();
        }
    }
}