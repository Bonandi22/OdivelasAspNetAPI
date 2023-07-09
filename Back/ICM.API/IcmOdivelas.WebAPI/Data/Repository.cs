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

        public async Task<Member> GetMemberById(int id)
        {
            var member = await _context.Members.FindAsync(id);
            return member!;

        }
        public Task<IEnumerable<Member>> GetAllMember()
        {
            var members = _context.Members.ToList();
            return Task.FromResult<IEnumerable<Member>>(members);
        }


    }
}