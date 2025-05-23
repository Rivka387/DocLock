﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.Entities;

namespace DocLock.Core.IRepositories
{
    public interface IRoleRepository
    {

        public Task<bool> IsRoleHasPermissinAsync(string roleName, string permission);
        public Task<IEnumerable<Role>> GetRolesAsync();
        public Task<Role> GetRoleByNameAsync(string roleName);
        public Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission);
        public Task<bool> AddRoleAsync(Role role);
        public Task<bool> UpdateRoleAsync(int id, Role role);
        public Task<bool> DeleteRoleAsync(int id);


    }
}
