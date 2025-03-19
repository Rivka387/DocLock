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
    {//GET
        public Task<List<UserFile>> GetAllFilesAsync();
        public Task<UserFile> GetFileByIdAsync(int id);
        public Task<UserFile> GetFileByNameAsync(string name);
        public Task<UserFile[]> GetUserFilesByUserIdAsync(int userId);
        public Task<bool> IsFileNameExistsAsync(int ownerId, string fileName);
        public Task<UserFile> GetFileByUrlAsync(string fileUrl);

        //POST
        public Task<UserFile> AddFileAsync(UserFile file);

        //PUT
        public Task<bool> UpdateFileNameAsync(UserFile userFile);


        //DELETE
        public Task<bool> DeleteFileAsync(int id);

    }
}
