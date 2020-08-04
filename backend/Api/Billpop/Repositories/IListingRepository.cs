using Api.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Repositories
{
    public interface IListingRepository
    {
        public Task<int> AddListing(Listing listing);
        public Task AddSearchTags(List<string> searchTags, int listingId);
        public void UpdateListing(int id, string title, string about, decimal price);
        public Task UpdateSearchTags(int listingId, List<SearchTag> searchTags);
        public Task<Listing> GetListingById(int id);
        public Task<Listing> GetListingByIdWithSearchTags(int id);
        public Task<Listing> GetListingWithUserIdOnly(int id);
        public Task<List<Listing>> GetListingsForUser(int userId);
        public void DeleteListing(int id);
        public Task<List<SearchTagType>> GetRelatedSearchTagsForListing(int listingId);
        public Task<List<Listing>> GetListingsById(int[] ids);
    }
}
