﻿using System.Collections.Generic;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;
using DocLock.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DocLock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFileController : ControllerBase
    {
        private readonly IUserFileService _userFileService;
        readonly IMapper _mapper;
        public UserFileController( IUserFileService userFileService)
        {
            _userFileService = userFileService;

        }






        // GET: api/<FileController>
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllUserFilesAsync()
        {
            var files = await _userFileService.GetAllUserFilesAsync();
            return Ok(files);
        }

        // GET api/<FileController>/5
        [HttpGet("user/{id}")]
        [Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<UserFileDto[]>> GetUserFilesByUserIdAsync(int id)
        {

            if (id < 0)
                return BadRequest();
            var userFiles = await _userFileService.GetUserFilesByUserIdAsync(id);
            if (userFiles == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(userFiles);
        }
        // GET api/<FileController>/5

        [HttpGet("{id}")]
        [Authorize(Policy = "UserOrAdmin")]
        public async Task<ActionResult> GetFileByIdAsync(int id)
        {
            var file = await _userFileService.GetUserFileByIdAsync(id);
            if (file == null)
                return NotFound("File not found.");

            return Ok(file);
        }
        [HttpGet("filesShared/{email}")]
        [Authorize(Policy = "UserOnly")]
        public async Task<ActionResult> GetFileShareByEmailAsync(string email)
        {
            var file = await _userFileService.GetFileShareByEmail(email);
            return Ok(file);
        }



        // POST api/<FileController>
        [HttpPost("Sharing/{id}")]
        [Authorize(Policy = "UserOnly")]
        public async Task<ActionResult> SharingFileAsync(int id, [FromBody] string email)
        {
            var result = await _userFileService.SharingFileAsync(id, email);
            if (result == null)
                return NotFound("File not found.");
            return Ok(result);
        }

        [HttpPost("CheckingIsAllowedView/{email}")]
        [Authorize(Policy = "UserOrAdmin")]
        public async Task<IActionResult> CheckingIsAllowedViewAsync(string email, [FromBody] SharingFileDto sharingFileDto)
        {
            var file = await _userFileService.GetUserFileByIdAsync(sharingFileDto.Id);
            if (file == null)
                return NotFound("File not found.");
            sharingFileDto.Password = file.FilePassword;
            var result = await _userFileService.GetDecryptFileAsync(sharingFileDto);
            if (result == null)
                return NotFound("File not found.");
            return File(result.FileContents, result.ContentType, result.FileDownloadName);
        }
        //Post
        [HttpPost("IsFile/{id}")]
        [Authorize(Policy = "UserOrAdmin")]
        public async Task<ActionResult> IsFileExistAsync(int id, [FromBody] string name)
        {
            var result = await _userFileService.IsFileNameExists(id, name);
            return Ok(result);
        }

        // POST api/<FileController>

        [HttpPost("upload/{id}")]
        [Consumes("multipart/form-data")]
        [Authorize(Policy = "UserOnly")]
        public async Task<IActionResult> UploadFileAsync(int id, [FromForm] UploadFileRequestDto request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("File is required.");

            var userId = id; // לממש בהתאם
            var result = await _userFileService.UploadFileAsync(request.File, request.FileName, request.Password, userId, request.FileType);
            return Ok(new { encryptedLink = result });
        }

        [HttpPost("decrypt-file")]
        [Authorize(Policy = "UserOnly")]
        public async Task<IActionResult> GetDecryptFileAsync([FromBody] SharingFileDto request)
        {
            var result = await _userFileService.GetDecryptFileAsync(request);
            if (result == null)
            {
                return Unauthorized("Invalid password or file not found.");
            }

            // החזרת הקובץ להורדה
            return result;



        }

        // PUT api/<FileController>/5
        [HttpPut("{id}")]
        [Authorize(Policy = "UserOnly")]
        public async Task<IActionResult> UpdateFileNameAsync(int id, [FromBody] string newFileName)
        {
            var result = await _userFileService.UpdateFileNameAsync(id, newFileName);
            if (!result)
                return BadRequest("Failed to update file name.");

            return Ok(result);
        }

        // DELETE 
        [HttpDelete("{id}")]
        [Authorize(Policy = "UserOrAdmin")]
        public async Task<IActionResult> DeleteFileAsync(int id)
        {
            var result = await _userFileService.DeleteUserFileAsync(id);
            if (!result)
                return NotFound("File not found.");

            return Ok(result);
        }
    }

}
