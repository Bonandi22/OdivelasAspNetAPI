namespace IcmOdivelas.WebAPI.Model
{
    public class MemberFunction
    {
        public int MemberId { get; set; }
        public int FunctionId { get; set; }
        public Member? Member { get; set; }
        public Function? Function { get; set; }
    }
}