using Api.Data;
using Api.Models.Domain;
using Microsoft.Extensions.Configuration;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Billpop.Models.Requests.Listings;
using System.Security.Policy;
using System.Linq;

namespace Billpop.Repositories
{
    public class ListingRepository : IListingRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _selectAllSearchTagsForListing = "SELECT * FROM SearchTags WHERE ListingId = @listingId";
        private readonly string _insertSearchTag = "INSERT INTO SearchTags (SearchTagTypeId, ListingId) VALUES (@searchTagTypeId, @listingId)";

        public ListingRepository(DataContext dataContext, IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public int AddListing(Listing listing)
        {
            string sql = "INSERT INTO Listings (Title, About, Price, Currency, Created, UserId) OUTPUT INSERTED.Id VALUES (@Title, @About, @Price, @Currency, @Created, @UserId)";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return connection.QuerySingle<int>(sql, listing);
            }
        }

        public void AddSearchTags(List<SearchTag> searchTags, int listingId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                foreach(SearchTag searchTag in searchTags)
                {
                    connection.Execute(_insertSearchTag, new { searchTagTypeId = searchTag.SearchTagTypeId, listingId });
                }
            }
        }

        public void UpdateListing(int id, string title, string about, decimal price)
        {
            string sql = $"UPDATE Listings SET Title = @title, About = @about, Price = @price WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                connection.Execute(sql, new { id, title, about, price});
            }
        }

        public void UpdateSearchTags(int listingId, List<SearchTag> searchTags)
        {
            string deleteSearchTag = "DELETE FROM SearchTags WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                List<SearchTag> searchTagsForListing = connection.Query<SearchTag>(_selectAllSearchTagsForListing, new { listingId }).ToList();
                List<SearchTag> filteredTagsForListing = searchTagsForListing;
                foreach (SearchTag existingSearchTag in searchTagsForListing)
                {
                    if (searchTags == null || searchTags.Find(x => x.SearchTagTypeId == existingSearchTag.SearchTagTypeId) == null)
                    {
                        connection.Execute(deleteSearchTag, new { id = existingSearchTag.Id });
                        filteredTagsForListing = filteredTagsForListing.Where(x => x.SearchTagTypeId != existingSearchTag.SearchTagTypeId).ToList();
                    }
                }
                if(searchTags == null)
                {
                    return;
                }
                foreach (SearchTag searchTag in searchTags)
                {
                    if(filteredTagsForListing.Find(x => x.SearchTagTypeId == searchTag.SearchTagTypeId) == null)
                    {
                        connection.Execute(_insertSearchTag, new { searchTagTypeId = searchTag.SearchTagTypeId, listingId });
                    }
                }
            }
        }
        public Listing GetListingByIdWithSearchTags(int id)
        {
            string selectListing = "SELECT * FROM Listings WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                Listing listing = connection.QuerySingleOrDefault<Listing>(selectListing, new { id });
                listing.SearchTags = connection.Query<SearchTag>(_selectAllSearchTagsForListing, new { listingId = listing.Id }).ToList();
                if(listing.Title == null)
                {
                    return null;
                }
                return listing;
            }
        }

        public Listing GetListingById(int id)
        {
            string selectListing = "SELECT * FROM Listings WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return connection.QuerySingleOrDefault<Listing>(selectListing, new { id });
            }
        }

        public void DeleteListing(int id)
        {
            string sql = $"DELETE Listings WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                connection.Execute(sql, new { id });
            }
        }
    }
}
