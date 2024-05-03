
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using backend.Models;

namespace backend.Data
{
    public class DatabaseContext : DbContext
    {
        private readonly string _dbConnectionString;

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _dbConnectionString = configuration.GetValue<string>("ConnectionStrings:DefaultConnectionString")!;
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Order>()
              .HasOne(t => t.User)
              .WithMany()
              .HasForeignKey(t => t.UserId)
              .IsRequired();
        }
        public DbSet<User> Users {get; set;}
        public DbSet<Order> Orders {get; set;}
        public DbSet<Country> Countries {get; set;}

    }
}