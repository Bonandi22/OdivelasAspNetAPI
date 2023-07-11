using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public RolesController(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetFunction()
        {
            var roles = await _repo.GetAllRole();
            if (roles == null) BadRequest("Roles not found");
            return Ok(roles);
        }

        // GET: api/roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetById(int id)
        {
            var roles = await _repo.GetRoleById(id);
            if (roles == null) BadRequest("Roles not found");
            return Ok(roles);
        }

        // POST: api/roles
        [HttpPost]
        public ActionResult<Role> PostFunction(Role model)
        {
            var roles = _mapper.Map<Role>(model);

            _repo.Add(roles);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Roles/{model.Id}", _mapper.Map<Role>(roles));
            }

            return BadRequest("Roles not register");
        }

        // PUT: api/roles/5
        [HttpPut("{id}")]
        public IActionResult PutRoles(int id, Role model)
        {
            var roles = _repo.GetRoleById(id);
            if (roles == null) return BadRequest("Roles not found");

            _mapper.Map(model, roles);

            _repo.Update(roles);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Roles/{model.Id}", _mapper.Map<Role>(roles));
            }

            return Ok("Roles update");

        }
        // Patch: api/roles/5
        [HttpPatch("{id}")]
        public IActionResult PatchRoles(int id, Role model)
        {
           var roles = _repo.GetRoleById(id);
            if (roles == null) return BadRequest("Roles not found");

            _mapper.Map(model, roles);

            _repo.Update(roles);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Roles/{model.Id}", _mapper.Map<Role>(roles));
            }

            return Ok("Roles update");

        }

        // DELETE: api/roles/5
        [HttpDelete("{id}")]
        public IActionResult DeleteRoles(int id)
        {
            var roles = _repo.GetRoleById(id);
            if (roles == null) return BadRequest("Roles not found");

            _repo.Delete(roles);
            if (_repo.SaveChanges())
            {
                return Ok("Roles has delete");
            }

            return BadRequest("Roles not delete");
        }
        
    }
}