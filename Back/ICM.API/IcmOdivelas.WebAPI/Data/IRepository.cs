
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

        //category
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> GetCategoryById(int id);

        //Roles
        Task<IEnumerable<Role>> GetAllRole();
        Task<Role> GetRoleById(int id);

        //Groups
        Task<IEnumerable<Group>> GetAllGroups();
        Task<Group> GetGroupById(int id);

        //Situation
        Task<IEnumerable<Situation>> GetAllSituation();
        Task<Situation> GetSituationById(int id);

        //MemberRoles
        Task<IEnumerable<MemberRole>> GetAllMemberRole();
        Task<MemberRole> GetMemberRoleById(int id);

        //login
        Task<bool> IsValidUser(string username, string password);

        //User
        Task<User> GetUserByEmail(string username);
        Task<List<User>> GetAllUsers();
        Task<User> GetUserByName(string Login);
    }
}