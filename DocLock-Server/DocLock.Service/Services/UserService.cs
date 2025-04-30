
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
        readonly IUserActivityRepository _userActivityRepository;

        public UserService(IMapper mapper, IUserRepository userRepository, IRoleRepository roleRepository, IUserActivityRepository userActivityRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _mapper = mapper;
            _userActivityRepository = userActivityRepository;
        }

        //Get

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
            var user = await _userRepository.LoginAsync(email, password);
            if (user != null)
            {
                await _userActivityRepository.LogActivityAsync(user.Id, "Login");
            }
            return _mapper.Map<UserDto>(user);
        }


        //put

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
                await _userActivityRepository.LogActivityAsync(res.Id, "Register");
            }
            return _mapper.Map<UserDto>(res);
        }


        //Post
        public async Task<bool> UpdateNameAsync(int id, string name)
        {
            return await _userRepository.UpdateNameAsync(id, name);
        }


        public async Task<bool> UpdatePasswordAsync(int id, string password)
        {
            return await _userRepository.UpdatePasswordAsync(id, password);
        }

        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            return await _userRepository.UpdateRoleAsync(id, role);
        }

        public async Task<bool> EnableUserAsync(int id)
        {
            return await _userRepository.EnableUserAsync(id);
        }

        public async Task<bool> DisableUserAsync(int id)
        {
            return await _userRepository.DisableUserAsync(id);
        }

        //Delete

        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.DeleteUserAsync(id);
        }


    }
}
