﻿using Api.Data;
using Api.Services;
using Billpop.Repositories;
using Billpop.Services;
using Billpop.Services.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options => { options.UseSqlServer(configuration.GetConnectionString("Database")); });
        }
    }
}
