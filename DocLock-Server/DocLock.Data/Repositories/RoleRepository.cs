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
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context._Roles.ToListAsync();
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
            var role = await _context._Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
            if (role == null)
                return false;

            role.Permissions.Add(permission);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> AddRoleAsync(Role role)
        {
            try
            {
                _context._Roles.Add(role);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                throw new Exception("failed to add role");
            }
        }
        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            try
            {
                var res = await _context._Roles.FirstOrDefaultAsync(role => role.Id == id);
                if (res == null)
                    return false;
                res.Permissions = role.Permissions;
                res.UpdatedAt = DateOnly.FromDateTime(DateTime.Now);
                res.Description = role.Description;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> DeleteRoleAsync(int id)
        {
            try
            {
                var role = await _context._Roles.FirstOrDefaultAsync(role => role.Id == id);
                _context._Roles.Remove(role);
                await _context.SaveChangesAsync();
                return true;

            }
            catch
            {
                return false;
            }
        }
    }
}
