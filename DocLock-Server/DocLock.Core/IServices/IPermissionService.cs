using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;

namespace DocLock.Core.IServices
{
    public interface IPermissionService
    {
        public Task<PermissionDto> AddPermissionAsync(PermissionDto permission);
        public Task<List<PermissionDto>> GetPermissionsAsync();
        public Task<PermissionDto> GetPermissionByIdAsync(int id);
        public Task<PermissionDto> GetPermissionByNameAsync(string name);

        public Task<bool> RemovePermissionAsync(int id);
        public Task<PermissionDto> UpdatePermissionAsync(int id, PermissionDto permission);
    }
}
