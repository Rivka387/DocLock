using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;

namespace DocLock.Service.Services
{
    public class PermissionService : IPermissionService
    {
        readonly IPermissionRepository _permissionRepository;
        readonly IMapper _mapper;

        public PermissionService(IPermissionRepository permissionRepository, IMapper mapper)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
        }

        public async Task<PermissionDto> AddPermissionAsync(PermissionDto permission)
        {
            var permissionEntity = _mapper.Map<Permission>(permission);
            var addedPermission = await _permissionRepository.AddPermissionAsync(permissionEntity);
            return _mapper.Map<PermissionDto>(addedPermission);
        }

        public async Task<PermissionDto> GetPermissionByIdAsync(int id)
        {
            return _mapper.Map<PermissionDto>(await _permissionRepository.GetPermissionByIdAsync(id));
        }

        public async Task<PermissionDto> GetPermissionByNameAsync(string name)
        {
            return _mapper.Map<PermissionDto>(await _permissionRepository.GetPermissionByNameAsync(name));
        }

        public async Task<List<PermissionDto>> GetPermissionsAsync()
        {
            var permissions = await _permissionRepository.GetPermissionsAsync();
            return _mapper.Map<List<PermissionDto>>(permissions);
        }

        public async Task<bool> RemovePermissionAsync(int id)
        {
            return await _permissionRepository.RemovePermissionAsync(id);
        }

        public async Task<PermissionDto> UpdatePermissionAsync(int id, PermissionDto permission)
        {
            var permissionEntity = _mapper.Map<Permission>(permission);
            var updatedPermission = await _permissionRepository.UpdatePermissionAsync(id, permissionEntity);
            return _mapper.Map<PermissionDto>(updatedPermission);
        }
    }
}
