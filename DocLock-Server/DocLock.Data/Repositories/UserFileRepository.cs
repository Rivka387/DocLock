using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data.Repositories
{
    public class UserFileRepository : IUserFileRepository
    {
        readonly IDataContext _dataContext;
        public UserFileRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserFile> AddUserFileAsync(UserFile file)
        {
            try
            {
                await _dataContext._Files.AddAsync(file);
                await _dataContext.SaveChangesAsync();
                return file;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            try
            {
                var res = await _dataContext._Files.FirstOrDefaultAsync(file => file.Id == id);
                if (res == null) return false;
                _dataContext._Files.Remove(res);
                await _dataContext.SaveChangesAsync();
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<List<UserFile>> GetAllFilesAsync()
        {
            return await _dataContext._Files.ToListAsync();

        }

        public async Task<UserFile> GetFileByIdAsync(int id)
        {
            return await _dataContext._Files.FirstOrDefaultAsync(file => file.Id == id);
        }

        public async Task<UserFile> GetFileByNameAsync(string name)
        {
            return await _dataContext._Files.FirstOrDefaultAsync(file => file.FileName == name);
        }

        public async Task<UserFile[]> GetUserFilesByUserIdAsync(int userId)
        {
            var userFiles = await _dataContext._Files.Where(file => file.OwnerId == userId).ToArrayAsync();
            return userFiles;
        }

        public async Task<bool> IsFileNameExists(int ownerId, string fileName)
        {
            return await _dataContext._Files.AnyAsync(file => file.OwnerId == ownerId && file.FileName == fileName);
        }

        public async Task<bool> updateFileNameAsync(UserFile userFile)
        {

            var userFileToUpdate = await _dataContext._Files.FirstOrDefaultAsync(file => file.Id == userFile.Id);
            if (userFileToUpdate == null) return false;
            if (userFileToUpdate.FileName == userFile.FileName) return true;
            userFileToUpdate.FileName = userFile.FileName;
            try
            {
                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

    }
}
