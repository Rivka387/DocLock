using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data
{
    public interface IDataContext
    {
        public Task<int> SaveChangesAsync();
        public DbSet<User> _Users { get; set; }
        public DbSet<UserFile> _Files { get; set; }
    }
}
