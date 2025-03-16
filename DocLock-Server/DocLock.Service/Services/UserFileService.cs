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

namespace DocLock.Service.Services
{

    public class UserFileService : IUserFileService
    {
        private readonly IUserFileRepository _userFileRepository;
        readonly IMapper _mapper;
        public UserFileService(IMapper mapper, IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _mapper = mapper;
            _userFileRepository = (IUserFileRepository?)userRepository;
        }

        public async Task<UserDto> AddUserFileAsync(UserDto userDto)
        {
            var userFile = _mapper.Map<UserFile>(userDto);
            var addedUserFile = await _userFileRepository.AddUserFileAsync(userFile);
            return _mapper.Map<UserDto>(addedUserFile);
        }

        public async Task<bool> DeleteUserFileAsync(int id)
        {
            return await _userFileRepository.DeleteFileAsync(id);

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
            return (IEnumerable<UserFileDto>)_mapper.Map<UserFileDto>(res);
        }

        public async Task<bool> IsFileNameExists(int userId, string fileName)
        {
            var userFiles = await _userFileRepository.GetUserFilesByUserIdAsync(userId);
            return userFiles.Any(file => file.FileName.Equals(fileName, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<bool> UpdateFileNameAsync(int fileId, string newFileName)
        {
            try
            {
                var userFile = await _userFileRepository.GetFileByIdAsync(fileId);
                if (userFile == null)
                {
                    return false; 
                }
                userFile.FileName = newFileName;
                var updateResult = await _userFileRepository.updateFileNameAsync(userFile);
                return updateResult;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<UserFileDto> UploadFileAsync(UserFileDto fileDto)
        {
            throw new NotImplementedException();
        }

     
    }
}
