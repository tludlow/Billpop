using Api.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Models.Requests.Listings
{
    public class CreateListingRequest
    {
        public string Title { get; set; }
        public string About { get; set; }
        public decimal Price { get; set; }
        public int CurrencyId { get; set; }
        public List<string> SearchTags { get; set; }
    }
}
