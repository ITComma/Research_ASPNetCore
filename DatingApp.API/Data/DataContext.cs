using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class DataContext : DbContext
  {

    // ================================================
    // =              ATTRIBUTES SECTION              =
    // ================================================
    
    public DbSet<Value> Values { get; set; }
    public DbSet<User> Users { get; set; }


    // ================================================
    // =             CONSTRUCTOR SECTION              =
    // ================================================

    public DataContext(
      DbContextOptions<DataContext> options) : base(options) {}
  }
}