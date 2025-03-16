using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;

namespace DocLock.Core.IRepositories
{
    public interface IUserFileRepository
    {
        //GET
        Task<List<UserFile>> GetAllFilesAsync();
        Task<UserFile> GetFileByIdAsync(int id);
        Task<UserFile> GetFileByNameAsync(string name);
        Task<UserFile[]> GetUserFilesByUserIdAsync(int userId);
        public Task<bool> IsFileNameExists(int userId, string fileName);

        //PUT
        Task<UserFile> AddUserFileAsync(UserFile file);
        Task<bool> updateFileNameAsync(UserFile userFile);


        //DELETE
        Task<bool> DeleteFileAsync(int id);

    }
}
