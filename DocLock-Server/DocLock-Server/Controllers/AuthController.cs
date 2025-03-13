using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IServices;
using DocLock.Service.PostModels;
using DocLock.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DocLock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        public AuthController(IConfiguration configuration, IUserService userService, IMapper mapper)
        {
            _configuration = configuration;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (EmailValidator.IsValidEmail(loginModel.Email))
                return BadRequest("Email not valid");

            if (string.IsNullOrEmpty(loginModel.Password)) return BadRequest("Password are required");

            var res = await _userService.LoginAsync(loginModel.Email, loginModel.Password);
            if (res == null)
                return NotFound();
            if (res.IsActive == false)
                return Unauthorized();

            var tokenString = _authService.GenerateJwtToken(res.Name, res.Roles.Select(r => r.RoleName).ToArray());
            return Ok(new { Token = tokenString, user = res });
        }

        // POST api/<UserController>

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterPostModel userRegister)
        {
            if (!EmailValidator.IsValidEmail(userRegister.User.Email))
            {
                return BadRequest("Email Not valid");

            }

            var res = await _userService.RegisterAsync(_mapper.Map<UserDto>(userRegister.User), userRegister.Roles);
            if (res == null)
            {
                return BadRequest();
            }

            var tokenString = _authService.GenerateJwtToken(res.Name, userRegister.Roles);
            return Ok(new { Token = tokenString, user = res });
        }
    }
}
