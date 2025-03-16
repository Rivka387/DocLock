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
        readonly IUserFileService _userFileService;
        readonly IMapper _mapper;
        public UserFileController(IUserFileRepository userFileRepository,IUserFileService userFileService, IMapper mapper)
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
        [HttpGet("user/{userId}")]
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
        public async Task<IActionResult> GetFileById(int id)
        {
            var file = await _userFileService.GetUserFileByIdAsync(id);
            if (file == null)
                return NotFound("File not found.");

            return Ok(file);
        }
        [HttpGet("Isfile/{id}")]
        public async Task<IActionResult> IsFileExist(int ownerdId,string fileName)
        {
            var file = await _userFileService.IsFileNameExists(ownerdId,fileName);
            if (file == null)
                return NotFound("File not found.");
            return Ok(file);
        }
        // POST api/<FileController>
        [HttpPost]
        public async Task<IActionResult> UploadFile([FromBody] UserFile file)
        {
            //!!!!
            //var result = await _userFileService.AddUserFileAsync(fileDto);
            //if (result == null)
            //    return BadRequest("Failed to add file.");

            //return Ok(result);
            throw new System.NotImplementedException();
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
