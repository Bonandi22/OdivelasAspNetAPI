using IcmOdivelas.WebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace IcmOdivelas.WebAPI.Data
{
    public class Repository:IRepository
    {
        private readonly DataContext _context;

        public Repository(DataContext context) 
        { 
            _context = context; ;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public bool SaveChanges()
        {
           return _context.SaveChanges() > 0;
        }

        //Members        
        public Task<IEnumerable<Member>> GetAllMember()
        {
            var members = _context.Members.ToList();
            return Task.FromResult<IEnumerable<Member>>(members);
        }
        public async Task<Member> GetMemberById(int id)
        {
            var member = await _context.Members.FindAsync(id);
            return member!;
        }

        //Category
        public Task<IEnumerable<Category>> GetAllCategories()
        {
            var category = _context.Categories.ToList();
            return Task.FromResult<IEnumerable<Category>>(category);
        }
        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            return category!;
        }

        //Roles
        public Task<IEnumerable<Role>> GetAllRole()
        {
            var roles = _context.Roles.ToList();
            return Task.FromResult<IEnumerable<Role>>(roles);
        }
        public async Task<Role> GetRoleById(int id)
        {
            var roles = await _context.Roles.FindAsync(id);
            return roles!;
        }

        //Groups

        public Task<IEnumerable<Group>> GetAllGroups()
        {
            var groups = _context.Groups.ToList();
            return Task.FromResult<IEnumerable<Group>>(groups);
        }
        public async Task<Group> GetGroupById(int id)
        {
            var groups = await _context.Groups.FindAsync(id);
            return groups!;
        }

        //Situations
         public Task<IEnumerable<Situation>> GetAllSituation()
        {
            var situation = _context.Situations.ToList();
            return Task.FromResult<IEnumerable<Situation>>(situation);
        }
        public async Task<Situation> GetSituationById(int id)
        {
            var situation = await _context.Situations.FindAsync(id);
            return situation!;
        }

        //MemberRoles
        public Task<IEnumerable<MemberRole>> GetAllMemberRole()
        {
            var memberRoles = _context.MemberRoles.ToList();
            return Task.FromResult<IEnumerable<MemberRole>>(memberRoles);
        }
        public async Task<MemberRole> GetMemberRoleById(int id)
        {
            var memberRoles = await _context.MemberRoles.FindAsync(id);
            return memberRoles!;
        }
    }
}