using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        readonly IDataContext _context;
        public RoleRepository(IDataContext context)
        {
            _context = context;
        }
        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var res = await _context._Roles.Where(role => role.RoleName == roleName).FirstOrDefaultAsync();
            return res;
        }

        public async Task<bool> IsRoleHasPermissinAsync(string roleName, string permission)
        {
            var res = await _context._Roles.AnyAsync(r => r.RoleName == roleName && r.Permissions.Any(p => p.PermissionName == permission));
            return res;
        }
        public async Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission)
        {
            var role = await _context._Roles.Where(r => r.RoleName == roleName).FirstOrDefaultAsync();
            if (role == null)
                return false;
            role.Permissions.Add(permission);
            return true;
        }
    }
}
