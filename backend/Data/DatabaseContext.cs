
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using backend.Models;
using backend.Enums;
using backend.Security;
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
                .HasOne(o => o.User)   // Define the navigation property
                .WithMany(u => u.Orders)   // Specify the inverse navigation property
                .HasForeignKey(o => o.UserId)   // Specify the foreign key property
                .IsRequired();   // Make the foreign key required

            modelBuilder.Entity<Country>().HasData(
                new Country { Id = 1, CountryName = "Sweden", Multiplier = 1 },
                new Country { Id = 2, CountryName = "Norway", Multiplier = 1.5f },
                new Country { Id = 3, CountryName = "Denmark", Multiplier = 2.5f }
            );
            User admin = new User
            {
                UserName = "admin",
                Email = "admin@admin.com",
                FirstName = "admin",
                LastName = "admin",
                DateOfBirth = "2000-01-01",
                Phone = 555123123,
                CountryOfResidence = "sweden",
                ZipCode = 123,
                Role = UserRoles.Admin,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            admin.PasswordHash = PasswordHasher.HashPassword("Admin123");

            modelBuilder.Entity<User>().HasData(admin);

            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    RecieverName = "Admin",
                    Weight = 10,
                    BoxColor = "#FFF",
                    CountryId = 1,
                    Cost = 10,
                    UserId = admin.Id,
                    DestinationCountry = "Italien",
                    Status = OrderStatus.CREATED
                });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Country> Countries { get; set; }

    }
}