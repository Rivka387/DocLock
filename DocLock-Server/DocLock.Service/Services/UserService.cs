﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IServices;
using DocLock.Core.Repositories;


namespace DocLock.Service.Services
{
    public class UserService : IUserService
    {
        readonly IUserRepository _userRepository;
        readonly IMapper _mapper;
        public UserService(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteUserAsync(id);
        }

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
            var res = _userRepository.LoginAsync(email,password);
            return _mapper.Map<UserDto>(res);
        }

        public async Task<UserDto> RegisterAsync(UserDto user)
        {
            var res = await _userRepository.AddUserAsync(_mapper.Map<User>(user));
            return _mapper.Map<UserDto>(res);


        }

      

        public async Task<bool> UpdateNameAsync(int id, string email)
        {
            return await _userRepository.UpdateNameAsync(id, email);
        }

        public async Task<bool> UpdatePasswordAsync(int id, string email)
        {
            return await _userRepository.UpdatePasswordAsync(id, email);
        }

    }
}
