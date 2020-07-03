using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Billpop.Models.Requests.Listings;

namespace Api.Services
{
    public interface IListingService
    {
        public int CreateListing(CreateListingRequest request, int userId);
        public Listing GetListingById(int id);
        public bool UserOwnsListing(int userId, int listingId);
        public void UpdateListing(UpdateListingRequest request);
        public void DeleteListing(int id);
    }
}
