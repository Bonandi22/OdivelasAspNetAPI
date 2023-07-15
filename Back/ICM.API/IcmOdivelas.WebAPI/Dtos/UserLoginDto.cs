using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IcmOdivelas.WebAPI.Dtos
{
    public class UserLoginDto
    {
        public string? Name { get; set; }
         public string? Login { get; set; }
        public string? Password { get; set; }
    }
}