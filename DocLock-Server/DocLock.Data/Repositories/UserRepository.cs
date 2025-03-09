using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        readonly IDataContext _dataContext;
        public UserRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> AddUserAsync(User user)
        {
            await _dataContext._Users.AddAsync(user);
            return user;
        }


        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _dataContext._Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id) 
        {
            return await _dataContext._Users.FirstOrDefaultAsync(user => user.Id == id)??new User();
        }

        public async Task<User> GetUserByEmailAsync(string email) 
        { 
            return await _dataContext._Users.FirstOrDefaultAsync(user => user.Email == email)?? new User(); 
        }
    }
}
