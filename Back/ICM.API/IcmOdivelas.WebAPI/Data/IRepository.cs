
using IcmOdivelas.WebAPI.Model;

namespace IcmOdivelas.WebAPI.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        bool SaveChanges();


        //Member
        Task<IEnumerable<Member>> GetAllMember();
      Task<Member> GetMemberById(int id );

    }
}