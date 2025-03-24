using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;
using DocLock.Core.Repositories;

using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;

namespace DocLock.Service.Services
{


    public class UserFileService : IUserFileService
    {
        private readonly IUserFileRepository _userFileRepository;
        private readonly S3Service _fileStorageService;
        private readonly IUserService _userService;
        private readonly string _encryptionKey;
        readonly IMapper _mapper;

        public UserFileService(IUserFileRepository fileRepository, S3Service fileStorageService, IConfiguration configuration, IMapper mapper, IUserService userService)
        {
            _userFileRepository = fileRepository;
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _userService = userService;
            _encryptionKey = configuration["ENCRYPTION_KEY"];

        }


        public async Task<IEnumerable<UserFileDto>> GetAllUserFilesAsync()
        {
            var res = await _userFileRepository.GetAllFilesAsync();
            return _mapper.Map<UserFileDto[]>(res);
        }


        public async Task<UserFileDto> GetUserFileByIdAsync(int id)
        {
            var res = await _userFileRepository.GetFileByIdAsync(id);
            return _mapper.Map<UserFileDto>(res);
        }


        public async Task<IEnumerable<UserFileDto>> GetUserFilesByUserIdAsync(int userId)
        {
            var res = await _userFileRepository.GetUserFilesByUserIdAsync(userId);
            return _mapper.Map<UserFileDto[]>(res);
        }


        public async Task<FileContentResult> GetDecryptFileAsync(SharingFileDto decryption)
        {


            var userFile = await _userFileRepository.GetFileByIdAsync(decryption.Id);

            if (userFile == null || userFile.FilePassword != decryption.Password)
            {
                return null; 
            }

            string fileUrl = DecryptLinkOrPassword(userFile.EncryptedLink, _encryptionKey);

            var encryptedFileBytes = await _fileStorageService.DownloadFileAsync(fileUrl);
            if (encryptedFileBytes == null)
            {
                return null; 
            }
            byte[] decryptedFile = DecryptFile(encryptedFileBytes, _encryptionKey);
            return new FileContentResult(decryptedFile, userFile.FileType)
            {
                FileDownloadName = userFile.FileName + "." + userFile.FileType 

        }


        public async Task<bool> IsFileNameExists(int id, string name)
        {
            return await _userFileRepository.IsFileNameExistsAsync(id, name);
        }

        public async Task<List<UserFileDto>> GetFileShareByEmail(string email)
        {
            var res = await _userFileRepository.GetFileShareByEmail(email);
            var filteredFiles = res.Where(x => x.EmailAloowed.Any(e => email == e)).ToList();
            return _mapper.Map<List<UserFileDto>>(filteredFiles);

        }

        public async Task<bool> UpdateFileNameAsync(int fileId, string newFileName)
        {
            var userFile = await _userFileRepository.GetFileByIdAsync(fileId);
            if (userFile == null)
            {
                return false;
            }
            string oldFilePath = userFile.FileName;
            string newFilePath = $"{newFileName}";
            try
            {
                var newLink = await _fileStorageService.UpdateFileNameAsync(oldFilePath, newFilePath);
                if (newLink == null)
                {
                    return false;
                }
                userFile.FileLink = newLink;
                userFile.EncryptedLink = EncryptLinkOrPassword(userFile.FileLink, _encryptionKey);
                userFile.FileName = newFileName;
                return await _userFileRepository.UpdateFileNameAsync(userFile);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating file name in S3: {ex.Message}");
                return false;
            }
        }


        public async Task<bool> IsFileNameExist(int id, string name)
        {
            return await _userFileRepository.IsFileNameExistsAsync(id, name);
        }

        public async Task<bool> CheckingIsAllowedViewAsync(string email, SharingFileDto sharingFile)
        {
            string decryptionpassword = DecryptLinkOrPassword(sharingFile.Password, _encryptionKey);
            string[] arr = decryptionpassword.Split(',');
            var userFile = await _userFileRepository.GetFileByIdAsync(sharingFile.Id);

            if (arr[0] != userFile.Id.ToString() || arr[1] != email)
            {
                return false;
            }

            return await _userFileRepository.CheckingIsAllowedEmailAsync(userFile.Id, email);
        }

        public async Task<SharingFileDto> SharingFileAsync(int id, string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            var userFile = await _userFileRepository.GetFileByIdAsync(id);
            if (userFile == null) { return null; }
            await _userFileRepository.UpdateEmailListAsync(id, email);
            string keyuser = userFile.Id.ToString() + ',' + email;
            string password = EncryptLinkOrPassword(keyuser, _encryptionKey);
            return new SharingFileDto
            {
                Id = userFile.Id,
                Password = password
            };
        }
        public async Task<string> UploadFileAsync(IFormFile file, string fileName, string password, int userId, string type)
        {
            string fileType = type;
            byte[] encryptedData = EncryptFile(file, _encryptionKey, userId, fileName);

            string fileUrl = await _fileStorageService.UploadFileAsync(file, fileName, encryptedData);
            if (fileUrl == null)
            {
                return null;
            }
            string encryptedLink = EncryptLinkOrPassword(fileUrl, _encryptionKey);
            await _userFileRepository.AddFileAsync(new UserFile
            {
                OwnerId = userId,
                FileName = fileName,
                FileLink = fileUrl,
                EncryptedLink = encryptedLink,
                FilePassword = password,
                FileType = fileType
            });

            return encryptedLink;
        }

        public async Task<bool> DeleteUserFileAsync(int id)
        {
            try
            {
                var userFile = await _userFileRepository.GetFileByIdAsync(id);
                if (userFile == null)
                {
                    return false;
                }
                 var fileKey = userFile.FileLink.Contains("s3.amazonaws.com") ?
                 userFile.FileLink.Split(new[] { ".s3.amazonaws.com/" }, StringSplitOptions.None).Last() :
                 userFile.FileLink;

                if (!await _fileStorageService.DeleteFileAsync(fileKey))
                {
                    return false;
                }

                return await _userFileRepository.DeleteFileAsync(id);
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        //Encrypt and Decrypt methods
        private byte[] EncryptFile(IFormFile file, string key, int userId, string fileName)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                byte[] fileBytes = memoryStream.ToArray();

                using (var aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(key.PadRight(24).Substring(0, 24)); // Ensures 32-byte key
                    aes.IV = new byte[16];

                    using (var encryptor = aes.CreateEncryptor())
                    {
                        return encryptor.TransformFinalBlock(fileBytes, 0, fileBytes.Length);
                    }
                }
            }
        }


        private string EncryptLinkOrPassword(string data, string key)
        {
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key.PadRight(24).Substring(0, 24)); // Ensures 32-byte key
                aes.IV = new byte[16];

                using (var encryptor = aes.CreateEncryptor())
                {
                    byte[] encryptedBytes = encryptor.TransformFinalBlock(dataBytes, 0, dataBytes.Length);
                    return Convert.ToBase64String(encryptedBytes);
                }
            }
        }


        private string DecryptLinkOrPassword(string encryptedLink, string key)
        {
            byte[] encryptedBytes = Convert.FromBase64String(encryptedLink);

            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key.PadRight(24).Substring(0, 24)); // Ensures 32-byte key
                aes.IV = new byte[16]; 
                using (var decryptor = aes.CreateDecryptor())
                {
                    byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }


        private byte[] DecryptFile(byte[] encryptedData, string key)
        {
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key.PadRight(24).Substring(0, 24)); 
                aes.IV = new byte[16];

                using (var decryptor = aes.CreateDecryptor())
                {
                    return decryptor.TransformFinalBlock(encryptedData, 0, encryptedData.Length);
                }
            }
        }


    }
}
