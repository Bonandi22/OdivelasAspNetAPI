using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IRepository _repo;
      

        public UserController(IRepository repo )
        {
            _repo = repo;
        }

    //     // GET: api/Members
    //    [HttpGet]
    //     public async Task<ActionResult<List<User>>> GetAllUsers()
    //     {
    //         var users = await _repo.GetAllUsers();
    //         if (users == null || users.Count == 0)
    //         {
    //             return BadRequest("No users found");
    //         }            
    //         return Ok(users);
    //     }      

        // GET: api/User/{login}
        [HttpGet("{login}")]
        public async Task<ActionResult<User>> GetByName(string login)
        {
            var user = await _repo.GetUserByName(login);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

    } 
}
