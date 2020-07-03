using Api.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Repositories
{
    public interface IListingRepository
    {
        public int AddListing(Listing listing);
        public void AddSearchTags(List<SearchTag> searchTags, int listingId);
        public void UpdateListing(int id, string title, string about, decimal price);
        public void UpdateSearchTags(int listingId, List<SearchTag> searchTags);
        public Listing GetListingById(int id);
        public Listing GetListingByIdWithSearchTags(int id);
        public void DeleteListing(int id);
    }
}
