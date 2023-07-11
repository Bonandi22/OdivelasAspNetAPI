using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SituationsController : ControllerBase
    {
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public SituationsController(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Situations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Situation>>> GetSituation()
        {
           var situations = await _repo.GetAllSituation();
            if (situations == null) BadRequest("Situation not found");
            return Ok(situations);
        }

        // GET: api/Situations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Situation>> GetById(int id)
        {
            var situation = await _repo.GetSituationById(id);
            if (situation == null) BadRequest("Situation not found");
            return Ok(situation);
        }

        // POST: api/Situation
        [HttpPost]
        public ActionResult<Situation> PostSituation(Situation model)
        {
            var situation = _mapper.Map<Situation>(model);

            _repo.Add(situation);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Situations/{model.Id}", _mapper.Map<Situation>(situation));
            }

            return BadRequest("Situation not register");
        }

        // PUT: api/Situation/5
        [HttpPut("{id}")]
        public IActionResult PutSituation(int id, Situation model)
        {
            var situation = _repo.GetSituationById(id);
            if (situation == null) return BadRequest("Situation not found");

            _mapper.Map(model, situation);

            _repo.Update(situation);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Situations/{model.Id}", _mapper.Map<Situation>(situation));
            }

            return Ok("Situation update");
        
        }
        // Patch: api/Situation/5
        [HttpPatch("{id}")]
        public IActionResult PatchSituation(int id, Role model)
        {
            var situation = _repo.GetSituationById(id);
            if (situation == null) return BadRequest("Situation not found");

            _mapper.Map(model, situation);

            _repo.Update(situation);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Situations/{model.Id}", _mapper.Map<Role>(situation));
            }

            return Ok("Situation update");

        }      

        // DELETE: api/Situation/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSituation(int id)
        {
            var situation = _repo.GetSituationById(id);
            if (situation == null) return BadRequest("Situation not found");

            _repo.Delete(situation);
            if (_repo.SaveChanges())
            {
                return Ok("Situation has delete");
            }

            return BadRequest("Situation not delete");
        }  
    }
}