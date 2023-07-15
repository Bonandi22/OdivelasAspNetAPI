using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IcmOdivelas.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        public readonly IRepository _repo;
         private readonly IConfiguration _config;


        public LoginController(IRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDto model)
        {
                if (ModelState.IsValid)
                {
                if (await _repo.IsValidUser(model.Login!, model.Password!))
                {
                    var user = await _repo.GetUserByEmail(model.Login!);

                    if (user != null)
                    {
                        var tokenString = GenerateToken(model.Login!, user.Name!);
                        return Ok(new { token = tokenString });
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Invalid username or password.");
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid username or password.");
                }
                 }
                else
                {
                    return BadRequest(ModelState);
                }

                 return Unauthorized();
        }

        private string GenerateToken(string Login, string name)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

           var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, Login),
                    new Claim("name", name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }       

    }
    
}