using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;

namespace DocLock.Core.Repositories
{
    public interface IUserRepository
    {
        //Get
        public Task<IEnumerable<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> GetUserByEmailAsync(string email);


        //Put
        public Task<User> AddUserAsync(User user, string[] roles);

        //Post
        public Task<User> LoginAsync(string email, string password);
        public Task<bool> UpdatePasswordAsync(int id, string password);
        public Task<bool> UpdateNameAsync(int id, string name);
        public Task<bool> UpdateRoleAsync(int id, Role role);

        //Delete
        public Task<bool> DeleteUserAsync(int id);


    }

}
