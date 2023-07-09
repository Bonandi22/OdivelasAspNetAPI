using System.ComponentModel.DataAnnotations;


namespace IcmOdivelas.WebAPI.Model
{
    public class Situation
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<Member>? Members { get; set; }
    }
}