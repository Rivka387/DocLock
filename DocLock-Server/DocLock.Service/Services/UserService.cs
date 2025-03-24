using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IServices;
using DocLock.Core.Repositories;
using DocLock.Data;
using Microsoft.AspNetCore.Mvc;


namespace DocLock.Service.Services
{
    public class UserService : IUserService
    {
        readonly IUserRepository _userRepository;
        readonly IRoleRepository _roleRepository;
        readonly IUserActivityRepository _userActivityRepository;
        readonly DataContext _dataContext;

        readonly IMapper _mapper;
        public UserService(IMapper mapper, IUserRepository userRepository,IRoleRepository roleRepository, IUserActivityRepository userActivityRepository, DataContext dataContext)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _userActivityRepository = userActivityRepository;
            _dataContext = dataContext;

        }
        //GET
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var res = await _userRepository.GetAllUsersAsync();
            res = res.ToList().Where(user => !user.Roles.Any(role => role.RoleName == "Admin"));
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
            var user =  await _userRepository.LoginAsync(email, password);
            if (user != null)
            {
                await _userActivityRepository.LogActivityAsync(user.Id, "Login");
            }

            return _mapper.Map<UserDto>(user);
        }

        //PUT
        public async Task<UserDto> RegisterAsync(UserDto user, string[] roles)
        {
            if (user == null)
            {
                // טיפול במקרה שבו user הוא null
                return null;
            }
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
                await _userActivityRepository.LogActivityAsync(res.Id, "Register");

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
