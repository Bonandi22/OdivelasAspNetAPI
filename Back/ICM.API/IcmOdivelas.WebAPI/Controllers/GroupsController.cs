using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public GroupsController(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
           var group = await _repo.GetAllGroups();
            if (group == null) BadRequest("Groups not found");
            return Ok(group);
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetById(int id)
        {
            var group = await _repo.GetGroupById(id);
            if (group == null) BadRequest("Member not found");
            return Ok(group);
        }

        // POST: api/Groups
        [HttpPost]
        public ActionResult<Group> PostGroup(Group model)
        {
            var group = _mapper.Map<Group>(model);

            _repo.Add(group);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Groups/{model.Id}", _mapper.Map<Group>(group));
            }

            return BadRequest("Group not register");
        }

        // PUT: api/Groups/5
        [HttpPut("{id}")]
        public IActionResult PutGroup(int id, Group model)
        {
            var group = _repo.GetGroupById(id);
            if (group == null) return BadRequest("Group not found");

            _mapper.Map(model, group);

            _repo.Update(group);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Groups/{model.Id}", _mapper.Map<Group>(group));
            }

            return Ok("Group update");
        
        }
        // Patch: api/Groups/5
        [HttpPatch("{id}")]
        public IActionResult PatchGroup(int id, Group model)
        {
            var group = _repo.GetGroupById(id);
            if (group == null) return BadRequest("Group not found");

            _mapper.Map(model, group);

            _repo.Update(group);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Groups/{model.Id}", _mapper.Map<Group>(group));
            }

            return Ok("Group update");

        }      

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGroup(int id)
        {
            var group = _repo.GetGroupById(id);
            if (group == null) return BadRequest("Group not found");

            _repo.Delete(group);
            if (_repo.SaveChanges())
            {
                return Ok("Group has delete");
            }

            return BadRequest("Group not delete");
        }  
    }
}