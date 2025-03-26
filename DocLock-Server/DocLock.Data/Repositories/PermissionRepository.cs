using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        readonly IDataContext _dataContext;
        public PermissionRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Permission> AddPermissionAsync(Permission permission)
        {
            try
            {
                await _dataContext._Permissions.AddAsync(permission);
                await _dataContext.SaveChangesAsync();
                return permission;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public async Task<Permission> GetPermissionByIdAsync(int id)
        {
            try
            {
                var res = await _dataContext._Permissions.FirstOrDefaultAsync(permission => permission.Id == id);
                return res;
            }
            catch (Exception)
            {
                return null;

            }
        }

        public async Task<Permission> GetPermissionByNameAsync(string name)
        {
            var res = await _dataContext._Permissions.FirstOrDefaultAsync(permission => permission.PermissionName == name);
            return res;
        }

        public async Task<List<Permission>> GetPermissionsAsync()
        {
            return await _dataContext._Permissions.ToListAsync();
        }

        public async Task<bool> RemovePermissionAsync(int id)
        {
            try
            {
                var res = await _dataContext._Permissions.FirstOrDefaultAsync(p => p.Id == id);
                if (res == null) return false;
                else
                {
                    _dataContext._Permissions.Remove(res);
                    await _dataContext.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<Permission> UpdatePermissionAsync(int id, Permission permission)
        {
            try
            {
                var res = await _dataContext._Permissions.FirstOrDefaultAsync(p => p.Id == id);
                if (res != null)
                {
                    res.PermissionName = permission.PermissionName ?? res.PermissionName;
                    res.Description = permission.Description ?? res.Description;
                    await _dataContext.SaveChangesAsync();
                }
                return res;
            }
            catch (Exception)
            {

                return null;
            }
        }
    }
}
