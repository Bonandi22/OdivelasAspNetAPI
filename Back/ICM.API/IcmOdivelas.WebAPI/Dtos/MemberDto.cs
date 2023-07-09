namespace IcmOdivelas.WebAPI.Dtos
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Region { get; set; }
        public bool IsBaptized { get; set; }
        public string? Nationality { get; set; }
    }
}