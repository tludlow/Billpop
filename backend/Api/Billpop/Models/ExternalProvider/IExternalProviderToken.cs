using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Models.ExternalProvider
{
    public interface IExternalProviderToken
    {
        public string Access_Token { get; set; }
        public string Email { get; set; }
    }
}
