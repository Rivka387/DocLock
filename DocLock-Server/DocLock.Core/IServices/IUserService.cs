using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;

namespace DocLock.Core.IServices
{
    public interface IUserService
    {
        //GET
        public Task<IEnumerable<UserDto>> GetAllUsersAsync();
        public Task<UserDto> GetUserByIdAsync(int id);
        public Task<UserDto> GetUserByEmailAsync(string email);


        //PUT
        public Task<UserDto> RegisterAsync(UserDto user);

        //POST
        public Task<UserDto> LoginAsync(string email, string password);
        public Task<bool> UpdatePasswordAsync(int id,string email);
        public Task<bool> UpdateNameAsync(int id, string email);

        public Task<bool> UpdateRoleAsync(int id, Role role);
        public Task<bool> EnableUserAsync(int id);
        public Task<bool> DisableUserAsync(int id);
        //DELETE
        public Task<bool> DeleteUserAsync(int id);

    }
}
