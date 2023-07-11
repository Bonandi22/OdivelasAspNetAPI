using Microsoft.AspNetCore.Mvc;
using IcmOdivelas.WebAPI.Data;
using IcmOdivelas.WebAPI.Model;
using AutoMapper;

namespace IcmOdivelas.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public readonly IRepository _repo;
        private readonly IMapper _mapper;

        public CategoriesController(IRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            var categories = await _repo.GetAllCategories();
            if (categories == null) BadRequest("Category not found");
            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var categories = await _repo.GetCategoryById(id);
            if (categories == null) BadRequest("Category not found");
            return Ok(categories);
        }

        // POST: api/Categories
        [HttpPost]
        public ActionResult<Category> PostCategory(Category model)
        {
            var categories = _mapper.Map<Category>(model);

            _repo.Add(categories);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Categories/{model.Id}", _mapper.Map<Category>(categories));
            }

            return BadRequest("Category not register");
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public IActionResult PutCategory(int id, Category model)
        {
            var categories = _repo.GetCategoryById(id);
            if (categories == null) return BadRequest("Category not found");

            _mapper.Map(model, categories);

            _repo.Update(categories);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Categories/{model.Id}", _mapper.Map<Category>(categories));
            }

            return Ok("Category update");

        }
        // Patch: api/Categories/5
        [HttpPatch("{id}")]
        public IActionResult PatchCategory(int id, Category model)
        {
            var categories = _repo.GetCategoryById(id);
            if (categories == null) return BadRequest("Category not found");

            _mapper.Map(model, categories);

            _repo.Update(categories);
            if (_repo.SaveChanges())
            {
                return Created($"/api/Categories/{model.Id}", _mapper.Map<Category>(categories));
            }

            return Ok("Category update");

        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var categories = _repo.GetCategoryById(id);
            if (categories == null) return BadRequest("Category not found");

            _repo.Delete(categories);
            if (_repo.SaveChanges())
            {
                return Ok("Category has delete");
            }

            return BadRequest("Category not delete");
        }
    }
}
