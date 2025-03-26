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
        public DbSet<User> _Users { get; set; }
        public DbSet<UserFile> _Files { get; set; }
        public DbSet<Role> _Roles { get; set; }
        public DbSet<Permission> _Permissions { get; set; }
        Task<int> SaveChangesAsync();

    }
}
