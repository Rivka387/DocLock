using System;
using System.Collections.Generic;
using System.Data;
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

        //GET
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _dataContext._Users.ToListAsync();
        }


        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _dataContext._Users.FirstOrDefaultAsync(user => user.Email == email);
        }


        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext._Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        //POST
        public async Task<User> AddUserAsync(User user, string[] roles)
        {
            {
                try
                {
                    await _dataContext._Users.AddAsync(user);
                    await _dataContext.SaveChangesAsync();
                    return user;
                }
                catch
                {
                    return null;
                }
            }
        }


        public async Task<User> LoginAsync(string email, string password)
        {
            var res = await _dataContext._Users.FirstOrDefaultAsync(user => user.Email == email && user.Password == password);
            return res;
        }


        public async Task<bool> UpdatePasswordAsync(int id, string password)
        {
            try
            {
                var user = await _dataContext._Users.Where(user => user.Id == id).FirstOrDefaultAsync();
                if (user == null) return false;
                user.Password = password;
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateNameAsync(int id, string name)
        {
            try
            {
                var user = await _dataContext._Users.Where(user => user.Id == id).FirstOrDefaultAsync();
                if (user == null) return false;
                user.Name = name;
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }


        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            try
            {
                var user = await _dataContext._Users.FirstOrDefaultAsync(user => user.Id == id);
                if (user == null) return false;
                user.Roles.Add(role);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }


            public async Task<bool> EnableUserAsync(int id)
        {
            try
            {
                var user = await _dataContext._Users.FindAsync(id);
                if (user == null) return false;

                user.IsActive = true;
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DisableUserAsync(int id)
        {
            try
            {
                var user = await _dataContext._Users.FindAsync(id);
                if (user == null) return false;

                user.IsActive = false;
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //DELETE
        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                var res = await _dataContext._Users.FirstOrDefaultAsync(user => user.Id == id);
                if (res == null) return false;
                _dataContext._Users.Remove(res);
                await _dataContext.SaveChangesAsync();
                return true;
                
            }
            catch (Exception)
            {

                return false;
            }
        }

      
    }
}
