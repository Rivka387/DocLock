using DocLock.Core.DTOS;
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
        [HttpGet]
        public async Task<ActionResult> GetRolesAsync()
        {
            return Ok(await _roleService.GetRolesAsync());
        }

        // GET: api/<RoleController>
        [HttpGet("{roleName}")]
        public async Task<ActionResult> GetRoleByNameAsync(string roleName)
        {
            return Ok(await _roleService.GetRoleByNameAsync(roleName));
        }

        [HttpGet("{roleName}/Ispermissin")]
        public async Task<ActionResult> GetRoleHasPermissinAsync(string roleName, [FromQuery] string permission)
        {
            return Ok(await _roleService.IsRoleHasPermissinAsync(roleName, permission));
        }

        [HttpPost]
        public async Task<ActionResult> AddRoleAsync([FromBody] RoleDto role)
        {
            return Ok(await _roleService.AddRoleAsync(role));
        }

        [HttpPost("/addPermission/{roleName}")]
        public async Task<ActionResult> AddPermissinForRoleAsync(string roleName, [FromBody] string permission)
        {
            return Ok(await _roleService.AddPermissinForRoleAsync(roleName, permission));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRoleAsync(int id, [FromBody] RoleDto role)
        {
            return Ok(await _roleService.UpdateRoleAsync(id, role));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoleAsync(int id)
        {
            return Ok(await _roleService.DeleteRoleAsync(id));
        }
    }
}
