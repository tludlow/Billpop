using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Billpop.Models.Elastic;
using Billpop.Models.Requests.Listings;

namespace Api.Services
{
    public interface IListingService
    {
        public Task<int> CreateListing(CreateListingRequest request, int userId);
        public Task<Listing> GetListingById(int id);
        public Task<List<Listing>> GetListingsForUser(int userId);
        public Task<bool> UserOwnsListing(int userId, int listingId);
        public Task UpdateListing(UpdateListingRequest request);
        public void DeleteListing(int id);
        public Task<List<ElasticListing>> SearchListings(string query, int number);
    }
}
