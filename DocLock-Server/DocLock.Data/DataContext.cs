using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace DocLock.Data
{
    public class DataContext : DbContext, IDataContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<User> _Users { get; set; }
        public DbSet<UserFile> _Files { get; set; }
        public DbSet<Role> _Roles { get; set; }
        public DbSet<Permission> _Permissions { get; set; }
        public DbSet<UserActivityLog> _UserActivityLogs { get; set; }


        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration["DB_CONNECTION_STRING"];
                optionsBuilder.UseNpgsql(connectionString);
            }
            optionsBuilder.LogTo(m => Console.WriteLine(m));
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserFile>()
                .HasOne(uf => uf.User)
                .WithMany(u => u.Files)
                .HasForeignKey(uf => uf.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
         .HasIndex(u => u.Email)
         .IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }
}
