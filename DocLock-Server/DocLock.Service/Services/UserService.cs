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
using DocLock.Core.Repositories;


namespace DocLock.Service.Services
{
    public class UserService : IUserService
    {
        readonly IUserRepository _userRepository;
        readonly IRoleRepository _roleRepository;
        readonly IMapper _mapper;
        public UserService(IMapper mapper, IUserRepository userRepository,IRoleRepository roleRepository)
        {
            _mapper = mapper;
            _roleRepository = roleRepository;
            _userRepository = userRepository;
        }
        //GET
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var res = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<UserDto[]>(res);
        }

        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var res = await _userRepository.GetUserByEmailAsync(email);
            return _mapper.Map<UserDto>(res);
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var res = await _userRepository.GetUserByIdAsync(id);
            return _mapper.Map<UserDto>(res);
        }
        public async Task<UserDto> LoginAsync(string email, string password)
        {
            var userTask = _userRepository.LoginAsync(email, password);
            var user = await userTask;
            if (user == null)
            {
                return null;
            }

            return _mapper.Map<UserDto>(user);
        }

        //PUT
        public async Task<UserDto> RegisterAsync(UserDto user, string[] roles)
        {
            var userEmail = await this.GetUserByEmailAsync(user.Email);
            if (userEmail != null)
            {
                return null;
            }
            var res = await _userRepository.AddUserAsync(_mapper.Map<User>(user), roles);
            if (res != null)
            {
                for (int i = 0; i < roles.Length; i++)
                {
                    await _userRepository.UpdateRoleAsync(res.Id, await _roleRepository.GetRoleByNameAsync(roles[i]));
                }
            }
            return _mapper.Map<UserDto>(res);
        }
        //POST


        public async Task<bool> UpdateNameAsync(int id, string email)
        {
            return await _userRepository.UpdateNameAsync(id, email);
        }

        public async Task<bool> UpdatePasswordAsync(int id, string email)
        {
            return await _userRepository.UpdatePasswordAsync(id, email);
        }

        public async Task<bool> EnableUserAsync(int id)
        {
            return await _userRepository.EnableUserAsync(id);
        }

        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            return await _userRepository.UpdateRoleAsync(id, role);
        }

        public async Task<bool> DisableUserAsync(int id)
        {
            return await _userRepository.DisableUserAsync(id);
        }

        //DELETE
        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteUserAsync(id);
        }
        

       
       



    }
}
