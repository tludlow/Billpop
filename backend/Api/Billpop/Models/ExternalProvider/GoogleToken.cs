using Billpop.Models.ExternalProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Models
{
    public class GoogleToken : IExternalProviderToken
    {
        public string Access_Token { get; set; }
        public string Sub { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
    }
}
