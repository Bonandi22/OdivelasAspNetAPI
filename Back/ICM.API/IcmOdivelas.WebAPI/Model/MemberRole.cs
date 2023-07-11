namespace IcmOdivelas.WebAPI.Model
{
    public class MemberRole
    {
        public int MemberId { get; set; }
        public int RoleId { get; set; }
        public Member? Member { get; set; }
        public Role? Role { get; set; }
    }
}