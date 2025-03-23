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
        public Task<List<UserFileDto>> GetFileShareByEmail(string email);


        // PUT
        public Task<string> UploadFileAsync(IFormFile file, string fileName, string password, int userId, string type);

        // POST
        public Task<bool> IsFileNameExist(int id, string name);
        public Task<bool> CheckingIsAllowedViewAsync(string email, SharingFileDto sharingFile);

        public Task<SharingFileDto> SharingFileAsync(int id, string email);
        public Task<FileContentResult> GetDecryptFileAsync(SharingFileDto decryption);
        public Task<bool> UpdateFileNameAsync(int fileId, string newFileName);

        // DELETE
        public Task<bool> DeleteUserFileAsync(int id);
    }
}
