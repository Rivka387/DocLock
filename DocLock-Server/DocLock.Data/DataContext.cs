using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data
{
    public class DataContext : DbContext, IDataContext
    {
     
        public DbSet<User> _Users { get; set; }
        public DbSet<UserFile> _Files { get; set; }
        public DbSet<Role> _Roles { get; set; }
        public DbSet<Permission> _Permissions { get; set; }
        public DbSet<UserActivityLog> _UserActivityLogs { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=DocLock;Username=postgres;Password=postgresql123");
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
