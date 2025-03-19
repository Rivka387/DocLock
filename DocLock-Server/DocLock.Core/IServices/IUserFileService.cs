using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DocLock.Core.IServices
{
    public interface IUserFileService
    {
        // GET
        public Task<IEnumerable<UserFileDto>> GetAllUserFilesAsync();
        public Task<UserFileDto> GetUserFileByIdAsync(int id);
        public Task<IEnumerable<UserFileDto>> GetUserFilesByUserIdAsync(int userId);
        public Task<bool> IsFileNameExists(int userId, string fileName);


        // PUT
        public Task<string> UploadFileAsync(IFormFile file, string fileName, string password, int userId, string type);

        // POST
        public Task<bool> UpdateFileNameAsync(int fileId, string newFileName);
        public Task<FileContentResult> GetDecryptFileAsync(string encryptedLink, string password);

        // DELETE
        public Task<bool> DeleteUserFileAsync(int id);
    }
}
