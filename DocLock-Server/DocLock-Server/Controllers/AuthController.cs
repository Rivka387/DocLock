using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IServices;
using DocLock.Service.PostModels;
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
        public AuthController(IConfiguration configuration,IUserService userService,IMapper mapper)
        {
            _configuration = configuration;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody]LoginModel loginModel)
        {
            if (string.IsNullOrEmpty(loginModel.Email) || loginModel.Password.Length <= 0)
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _userService.LoginAsync(loginModel.Email,loginModel.Password);

            if (user!=null)
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "malkabr"),
                new Claim(ClaimTypes.Role, "teacher")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                //Role role = Role.USER;

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }
        // POST api/<UserController>

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] LoginModel loginModel)
        {
            if (string.IsNullOrEmpty(loginModel.Email) || loginModel.Password.Length <= 0)
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _userService.RegisterAsync(_mapper.Map<UserDto>(loginModel));

            if (user != null)
            {
                var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "malkabr"),
                new Claim(ClaimTypes.Role, "teacher")
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }
    }
}
