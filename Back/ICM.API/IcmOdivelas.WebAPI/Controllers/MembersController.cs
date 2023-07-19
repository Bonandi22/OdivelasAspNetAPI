using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
       
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public MembersController(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
           var member = await _repo.GetAllMember();
            if (member == null) BadRequest("Member not found");
            return Ok(member);
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetById(int id)
        {
            var member = await _repo.GetMemberById(id);
            if (member == null) BadRequest("Member not found");
            return Ok(member);
        }

        // POST: api/Members
        [HttpPost]
        public ActionResult<Member> PostMember(Member model)
        {
            var member = _mapper.Map<Member>(model);

            _repo.Add(member);
            if (_repo.SaveChanges())
            {
                return Created($"/api/members/{model.Id}", _mapper.Map<Member>(member));
            }

            return BadRequest("Member not register");
        }

        // PUT: api/Members/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member model)
        {
          var member = await _repo.GetMemberById(id);
                if (member == null) return BadRequest("member not found");
                
                member.Name = model.Name;
                member.PhoneNumber = model.PhoneNumber;
                member.Address=model.Address;
                member.City=model.City;
                member.Region = model.Region;
                member.BirthDate = model.BirthDate;
                member.Isbaptized = model.Isbaptized;
                member.Nacionality = model.Nacionality;
                member.CategoryId = model.CategoryId;
                member.GroupId = model.GroupId;
                member.SituationId = model.SituationId;

                _repo.Update(member);
                if (_repo.SaveChanges())
                {
                    return Created($"/api/members/{model.Id}", member);
                }
                return Ok("member update");        
        }

        // Patch: api/Members/5
        [HttpPatch("{id}")]
        public IActionResult PatchMember(int id, Member model)
        {
            var member = _repo.GetMemberById(id);
            if (member == null) return BadRequest("member not found");

            _mapper.Map(model, member);

            _repo.Update(member);
            if (_repo.SaveChanges())
            {
                return Created($"/api/members/{model.Id}", _mapper.Map<Member>(member));
            }

            return Ok("member update");

        }      

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await  _repo.GetMemberById(id);
            if (member == null) return BadRequest("member not found");

            _repo.Delete(member);
            if (_repo.SaveChanges())
            {
               return Ok(new { message = "Member has been deleted" });
            }

            return BadRequest("member not delete");
        }      
    }
}
