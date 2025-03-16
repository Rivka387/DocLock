using DocLock.Core.Entities;
using DocLock.Core.IServices;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DocLock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        // GET: api/<RoleController>
        [HttpGet("{roleName}")]
        public async Task<ActionResult> GetRoleByNameAsync(string roleName)
        {
            return Ok(await _roleService.GetRoleByNameAsync(roleName));
        }

        [HttpGet("{roleName}/permissin")]
        public async Task<ActionResult> GetRoleHasPermissinAsync(string roleName, [FromQuery] string permission)
        {
            return Ok(await _roleService.IsRoleHasPermissinAsync(roleName, permission));
        }

        [HttpPost("{roleName}")]
        public async Task<ActionResult> AddPermissinForRoleAsync(string roleName, [FromBody] Permission permission)
        {
            return Ok(await _roleService.AddPermissinForRoleAsync(roleName, permission));
        }
    }
}
