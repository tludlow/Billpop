using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models.Domain;
using Billpop.Models.Requests.Listings;
using Billpop.Repositories;
using Microsoft.Extensions.Configuration;

namespace Api.Services
{
    public class ListingService : IListingService
    {
        private readonly IListingRepository _listingRepository;

        public ListingService(IListingRepository listingRepository, IUserService userService)
        {
            _listingRepository = listingRepository;
        }

        public int CreateListing(CreateListingRequest request, int userId)
        {
            Listing listing = new Listing 
            {
                Title = request.Title,
                About = request.About,
                Currency = Currencies.GBP,
                UserId = userId,
                Price = request.Price,
                Created = DateTime.Now,
                Status = Status.Open,
            };
            int listingId = _listingRepository.AddListing(listing);
            _listingRepository.AddSearchTags(request.SearchTags, listingId);
            return listingId;
        }

        public Listing GetListingById(int id)
        {
            return _listingRepository.GetListingById(id);
        }

        public bool UserOwnsListing(int userId, int listingId)
        {
            return _listingRepository.GetListingById(listingId)?.UserId == userId;
        }

        public void UpdateListing(UpdateListingRequest request)
        {
            _listingRepository.UpdateSearchTags(request.Id, request.SearchTags);
            _listingRepository.UpdateListing(request.Id, request.Title, request.About, request.Price);
        }

        public void DeleteListing(int id)
        {
            _listingRepository.DeleteListing(id);
        }
    }
}
