using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;

namespace DocLock.Service.Services
{
    public class RoleService : IRoleService
    {
        readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.GetRoleByNameAsync(roleName);
            return role;
        }

        public async Task<bool> IsRoleHasPermissinAsync(string roleName, string permission)
        {
            var res = await _roleRepository.IsRoleHasPermissinAsync(roleName, permission);
            return res;
        }

        public async Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission)
        {
            var res = await _roleRepository.AddPermissinForRoleAsync(roleName, permission);
            return res;
        }
    }
}