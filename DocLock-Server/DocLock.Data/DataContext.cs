using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data
{
    public class DataContext: DbContext, IDataContext
    {
     
        public DbSet<User> _Users { get; set; }
        public DbSet<UserFile> _Files { get; set; }

        public DataContext(DbContextOptions<DataContext> options) :base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(m => Console.WriteLine(m));
            base.OnConfiguring(optionsBuilder);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }
    }

}
