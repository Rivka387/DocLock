using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.IServices;
using DocLock.Service.PostModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DocLock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly IUserService _userService;
        readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _userService = userService;
        }

        // GET: api/<UserController>
        [HttpGet]

        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());

        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserByIdAsync(int id)
        {
            if (id < 0)
                return BadRequest();
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(user);
        }

        [HttpGet("email")]
        public async Task<ActionResult<UserDto>> GetUserByEmail([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest("Email is required.");

            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"User with email {email} not found.");
            }

            return Ok(user);
        }





        // PUT api/<UserController>/5
        [HttpPut("/name/{id}")]
            public async Task<ActionResult<bool>> UpdateName(int id, [FromBody] string value)
            {
                if (string.IsNullOrEmpty(value))
                {
                    return BadRequest("Name cannot be empty.");
                }

                var result = await _userService.UpdateNameAsync(id, value);

                if (!result)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                return Ok(result); 
            }


        [HttpPut("/password/{id}")]
        public async Task<ActionResult<bool>> UpdatePassword(int id, [FromBody] string password)
        {
            if (string.IsNullOrEmpty(password) || password.Length < 6)
            {
                return BadRequest("Password must be at least 6 characters long.");
            }

            var result = await _userService.UpdatePasswordAsync(id, password);

            if (!result)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return Ok(true);  
        }

        // DELETE api/<UserController>/5
        [HttpDelete("/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var res =await _userService.DeleteUserAsync(id);
            if (!res)
                return NotFound();
            return Ok(res);
        }
    }
}
