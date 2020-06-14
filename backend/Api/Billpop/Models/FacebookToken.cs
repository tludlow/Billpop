using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Models
{
    public class FacebookToken
    {
        public string Access_Token { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }
}
