using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemberRoles : ControllerBase
    {
         public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public MemberRoles(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/MemberRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberRole>>> GetMemberRole()
        {
           var memberRole = await _repo.GetAllMemberRole();
            if (memberRole == null) BadRequest("Member not found");
            return Ok(memberRole);
        }

        // POST: api/MemberRole
        [HttpPost]
        public ActionResult<MemberRole> PostMemberRoles(List<MemberRole> memberRoles)
        {
            foreach (var memberRole in memberRoles)
            {
                _repo.Add(memberRole);
            }

            if (_repo.SaveChanges())
            {
                return Created("/api/memberRoles", memberRoles);
            }

            return BadRequest("Failed to save member roles");
        }        

     }
}