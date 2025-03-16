using DocLock.Core.DTOS;
using DocLock.Core.IServices;
using DocLock.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DocLock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        readonly IPermissionService _permissionService;
        public PermissionController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }
        // GET: api/<PermissionController>
        [HttpGet]
        public async Task<ActionResult> GetAllPermissin()
        {
            return Ok(await _permissionService.GetPermissionsAsync());
        }

        // GET api/<PermissionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var res = await _permissionService.GetPermissionByIdAsync(id);
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpGet("/name/{name}")]
        public async Task<ActionResult> GetbyName(string name)
        {
            var res = await _permissionService.GetPermissionByNameAsync(name);
            if (res == null) return NotFound();
            return Ok(res);
        }

        // POST api/<PermissionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PermissionDto permission)
        {
            var res = await _permissionService.AddPermissionAsync(permission);
            if (res == null) return BadRequest();
            return Ok(res);
        }

        // PUT api/<PermissionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PermissionDto permission)
        {
            var res = await _permissionService.UpdatePermissionAsync(id, permission);
            if (res == null) return BadRequest();
            return Ok(res);
        }

        // DELETE api/<PermissionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var res = await _permissionService.RemovePermissionAsync(id);
            if (!res) return NotFound();
            return Ok();
        }
    }
}
