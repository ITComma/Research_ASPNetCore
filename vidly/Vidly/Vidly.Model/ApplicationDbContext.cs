using System;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Vidly.Data.Models;
using Vidly.Data.Models.Auth;

namespace Vidly.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(string connectionString) : base(connectionString)
        {
        }

        public ApplicationDbContext() : base("Name=ApplicationDbContext_Logixtek")
        {

        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MembershipType> MembershipTypes { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Rental> Rentals { get; set; }
    }
}