using Api.Services;
using Billpop.Repositories;
using Billpop.Services;
using Billpop.Services.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Installers
{
    public class ServiceInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IListingService, ListingService>();
            services.AddScoped<IAzureBlobService, AzureBlobService>();
            services.AddScoped<IAzureBlobConnectionFactory, AzureBlobConnectionFactory>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IListingRepository, ListingRepository>();
        }
    }
}