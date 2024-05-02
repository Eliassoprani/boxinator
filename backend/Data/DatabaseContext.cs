
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
        {/*
            Seeder seeder = new Seeder();

            modelBuilder.Entity<ScreeningTicket>().HasKey(k => new { k.TicketId, k.ScreeningId });
            modelBuilder.Entity<CustomerTicket>().HasKey(k => new { k.CustomerId, k.TicketId });
            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Screenings)
                .WithOne(s => s.Movie)
                .HasForeignKey(s => s.MovieId);

            modelBuilder.Entity<Movie>().HasData(seeder.Movies);
            modelBuilder.Entity<Screening>()
                .HasData(seeder.Screenings);
            modelBuilder.Entity<Customer>().HasData(seeder.Customers);

            modelBuilder.Entity<Ticket>().HasData(seeder.Tickets);

            modelBuilder.Entity<CustomerTicket>().HasData(seeder.CustomerTickets);

            modelBuilder.Entity<ScreeningTicket>().HasData(seeder.ScreeningTickets);
            */
        }

        public DbSet<User> Users {get; set;}

    }
}