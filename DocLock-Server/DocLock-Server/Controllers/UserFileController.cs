using System.Collections.Generic;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using DocLock.Core.IServices;
using DocLock.Data.Repositories;
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
        public UserFileController(IUserFileRepository userFileRepository, IUserFileService userFileService, IMapper mapper)
        {
            _userFileService = userFileService;
            _mapper = mapper;

        }






        // GET: api/<FileController>
        [HttpGet]
        public async Task<IActionResult> GetAllUserFiles()
        {
            var files = await _userFileService.GetAllUserFilesAsync();
            return Ok(files);
        }

        // GET api/<FileController>/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<UserFileDto[]>> GetUserFilesByUserId(int id)
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
        public async Task<ActionResult> GetFileById(int id)
        {
            var file = await _userFileService.GetUserFileByIdAsync(id);
            if (file == null)
                return NotFound("File not found.");

            return Ok(file);
        }
        [HttpGet("filesShared/{email}")]
        public async Task<ActionResult> GetFileshareByEmail(string email)
        {
            var file = await _userFileService.GetFileShareByEmail(email);
            return Ok(file);
        }



        // POST api/<FileController>
        [HttpPost("Sharing/{id}")]
        public async Task<ActionResult> SharingFile(int id, [FromBody] string email)
        {
            var result = await _userFileService.SharingFileAsync(id, email);
            if (result == null)
                return NotFound("File not found.");
            return Ok(result);
        }

        [HttpPost("CheckingIsAllowedView/{id}")]
        public async Task<ActionResult> CheckingIsAllowedView(string email, [FromBody] SharingFileDto sharingFileDTO)
        {
            var res = await _userFileService.CheckingIsAllowedViewAsync(email, sharingFileDTO);
            if (!res)
                return Unauthorized("Not allowed viewing");
            var result = await _userFileService.GetDecryptFileAsync(sharingFileDTO);
            if (result == null)
                return NotFound("File not found.");
            return Ok(res);
        }
        [HttpPost("IsFile/{id}")]
        public async Task<ActionResult> IsFileExist(int id, [FromBody] string name)
        {
            var result = await _userFileService.IsFileNameExists(id, name);
            return Ok(result);
        }

        // POST api/<FileController>

        [HttpPost("upload/{File}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadFile(int id, [FromForm] UploadFileRequestDto request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest("File is required.");

            var userId = id; // לממש בהתאם
            var result = await _userFileService.UploadFileAsync(request.File, request.FileName, request.Password, userId, request.FileType);
            return Ok(new { encryptedLink = result });
        }

        [HttpPost("decrypt-file")]
        public async Task<IActionResult> GetDecryptFile([FromBody] SharingFileDto request)
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
        public async Task<IActionResult> UpdateFileName(int id, [FromBody] string newFileName)
        {
            var result = await _userFileService.UpdateFileNameAsync(id, newFileName);
            if (!result)
                return BadRequest("Failed to update file name.");

            return Ok(result);
        }

        // DELETE api/<FileController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var result = await _userFileService.DeleteUserFileAsync(id);
            if (!result)
                return NotFound("File not found.");

            return Ok(result);
        }
    }

}
