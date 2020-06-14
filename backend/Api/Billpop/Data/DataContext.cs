using Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class DataContext : DbContext
    {
        public DbContextOptions _contextOptions;
        public DataContext(DbContextOptions options)
            : base(options) {
        }
        public DbSet<User> Users { get; set; }
    }
}
