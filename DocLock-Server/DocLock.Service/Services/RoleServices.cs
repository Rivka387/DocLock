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
    public class RoleService : IRoleService
    {
        readonly IRoleRepository _roleRepository;
        readonly IPermissionRepository _permissionRepository;
        readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper, IPermissionRepository permissionRepository)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
            _permissionRepository = permissionRepository;
        }
        public async Task<IEnumerable<RoleDto>> GetRolesAsync()
        {
            var roles = await _roleRepository.GetRolesAsync();
            return _mapper.Map<IEnumerable<RoleDto>>(roles);
        }

        public async Task<RoleDto> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.GetRoleByNameAsync(roleName);
            return _mapper.Map<RoleDto>(role);
        }

        public async Task<bool> IsRoleHasPermissinAsync(string roleName, string permission)
        {
            return await _roleRepository.IsRoleHasPermissinAsync(roleName, permission);
        }

        public async Task<bool> AddPermissinForRoleAsync(string roleName, string permission)
        {
            try
            {
                var res = await _permissionRepository.GetPermissionByNameAsync(permission);
                if (res == null)
                {
                    throw new Exception(" permission not found");
                }
                return await _roleRepository.AddPermissinForRoleAsync(roleName, res);
            }
            catch
            {
                throw new Exception("failed to add permission");
            }
        }
        public async Task<bool> AddRoleAsync(RoleDto role)
        {
            return await _roleRepository.AddRoleAsync(_mapper.Map<Role>(role));
        }
        public async Task<bool> UpdateRoleAsync(int id, RoleDto role)
        {
            return await _roleRepository.UpdateRoleAsync(id, _mapper.Map<Role>(role));
        }
        public async Task<bool> DeleteRoleAsync(int id)
        {
            return await _roleRepository.DeleteRoleAsync(id);
        }

    }
}