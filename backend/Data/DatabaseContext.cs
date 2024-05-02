
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using backend.Models;

namespace backend.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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