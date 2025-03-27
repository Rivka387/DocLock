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
        private readonly IDataContext _dataContext;

        public UserFileRepository(IDataContext context)
        {
            _dataContext = context;
        }


        //GET

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

        public async Task<UserFile> GetFileByUrlAsync(string fileUrl)
        {
            return await _dataContext._Files.FirstOrDefaultAsync(file => file.FileLink == fileUrl);
        }


        public async Task<bool> IsFileNameExistsAsync(int ownerId, string fileName)
        {
            var res = await _dataContext._Files.Where(f => f.OwnerId == ownerId && f.FileName == fileName).FirstOrDefaultAsync();
            return res != null;
        }

        public async Task<List<UserFile>> GetFileShareByEmail(string email)
        {
            return _dataContext._Files.ToList();
        }

        //PUT
        public async Task<bool> UpdateFileNameAsync(UserFile userFile)
        {

            var userFileToUpdate = await _dataContext._Files.FirstOrDefaultAsync(file => file.Id == userFile.Id);
            if (userFileToUpdate == null) return false;
            userFileToUpdate.FileName = userFile.FileName;
            userFileToUpdate.UpdateAt = DateOnly.FromDateTime(DateTime.Now);

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


        public async Task<bool> UpdateEmailListAsync(int id, string email)
        {
            try
            {
                var userFile = await _dataContext._Files.FirstOrDefaultAsync(file => file.Id == id);
                if (userFile == null) return false;
                userFile.EmailAloowed.Add(email);
                userFile.UpdateAt = DateOnly.FromDateTime(DateTime.Now);


                await _dataContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        //POST
        public async Task<UserFile> AddFileAsync(UserFile file)
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


        //DELETE
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

        public async Task<bool> CheckingIsAllowedEmailAsync(int id, string email)
        {
            return await _dataContext._Files.AnyAsync(file => file.Id == id && file.EmailAloowed.Any(e => e == email));

        }


    }
}
