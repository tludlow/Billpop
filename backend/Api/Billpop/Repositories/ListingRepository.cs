using Api.Data;
using Api.Models.Domain;
using Microsoft.Extensions.Configuration;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task<int> AddListing(Listing listing)
        {
            string sql = "INSERT INTO Listings (Title, About, Price, Currency, Created, UserId, Status) OUTPUT INSERTED.Id VALUES (@Title, @About, @Price, @Currency, @Created, @UserId, @Status)";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return await connection.QuerySingleAsync<int>(sql, listing);
            }
        }

        public async Task AddSearchTags(List<string> searchTags, int listingId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                foreach(string searchTag in searchTags)
                {
                   await connection.ExecuteAsync(_insertSearchTag, new { searchTagTypeId = searchTag, listingId });
                }
            }
        }

        public async Task<List<SearchTagType>> GetRelatedSearchTagsForListing(int listingId)
        {
            string selectAllRelatedSearchTags = "SELECT st.Name, st.RelatedSearchTagTypeId FROM SearchTags AS s JOIN SearchTagTypes AS st ON st.Name = s.SearchTagTypeId JOIN Listings AS l ON l.Id = s.ListingId WHERE l.Id = @listingId";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return (await connection.QueryAsync<SearchTagType>(selectAllRelatedSearchTags, new { listingId })).ToList();
            }
        }

        public void UpdateListing(int id, string title, string about, decimal price)
        {
            string sql = $"UPDATE Listings SET Title = @title, About = @about, Price = @price WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                connection.ExecuteAsync(sql, new { id, title, about, price});
            }
        }

        public async Task UpdateSearchTags(int listingId, List<SearchTag> searchTags)
        {
            string deleteSearchTag = "DELETE FROM SearchTags WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                List<SearchTag> searchTagsForListing = (await connection.QueryAsync<SearchTag>(_selectAllSearchTagsForListing, new { listingId })).ToList();
                List<SearchTag> filteredTagsForListing = searchTagsForListing;
                foreach (SearchTag existingSearchTag in searchTagsForListing)
                {
                    if (searchTags == null || searchTags.Find(x => x.SearchTagTypeId == existingSearchTag.SearchTagTypeId) == null)
                    {
                        _ = connection.ExecuteAsync(deleteSearchTag, new { id = existingSearchTag.Id });
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
                        _ = connection.ExecuteAsync(_insertSearchTag, new { searchTagTypeId = searchTag.SearchTagTypeId, listingId });
                    }
                }
            }
        }
        public async Task<Listing> GetListingByIdWithSearchTags(int id)
        {
            string selectListing = "SELECT * FROM Listings WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                Listing listing = await connection.QuerySingleOrDefaultAsync<Listing>(selectListing, new { id });
                listing.SearchTags = (await connection.QueryAsync<SearchTag>(_selectAllSearchTagsForListing, new { listingId = listing.Id })).ToList();
                return listing;
            }
        }

        public async Task<Listing> GetListingById(int id)
        {
            string selectListing = "SELECT * FROM Listings WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return await connection.QuerySingleOrDefaultAsync<Listing>(selectListing, new { id });
            }
        }

        public async Task<Listing> GetListingWithUserIdOnly(int id)
        {
            string selectListing = "SELECT UserId FROM Listings WHERE Id = @id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                return await connection.QuerySingleOrDefaultAsync<Listing>(selectListing, new { id });
            }
        }

        public void DeleteListing(int id)
        {
            string deleteListingById = $"DELETE Listings WHERE Id = @id";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                connection.ExecuteAsync(deleteListingById, new { id });
            }
        }

        public async Task<List<Listing>> GetListingsForUser(int userId)
        {
            string selectListingsForUser = $"SELECT * FROM Listings WHERE UserId = @userId";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                List<Listing> listings = (await connection.QueryAsync<Listing>(selectListingsForUser, new { userId })).ToList();
                for (int i = 0; i < listings.Count(); i++)
                {
                    listings[i].SearchTags = (await connection.QueryAsync<SearchTag>(_selectAllSearchTagsForListing, new { listingId = listings[i].Id })).ToList();
                }
                return listings;
            }
        }

        public async Task<List<Listing>> GetListingsById(int[] ids)
        {
            string selectListings = $"SELECT * FROM Listings WHERE Id IN @ids";

            using (var connection = new SqlConnection(_configuration.GetConnectionString("Database")))
            {
                List<Listing> listings = (await connection.QueryAsync<Listing>(selectListings, new { ids })).ToList();
                return listings;
            }
        }
    }
}
