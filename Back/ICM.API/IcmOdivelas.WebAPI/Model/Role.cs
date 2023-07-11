using System.ComponentModel.DataAnnotations;

namespace IcmOdivelas.WebAPI.Model
{
    public class Role
    {
        [Key]

        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Member>? Members { get; set; }
        public ICollection<MemberRole>? MemberFunctions { get; set; }
    }
    
}