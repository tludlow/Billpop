using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Domain;
using Billpop.Models.Elastic;
using Billpop.Models.Requests.Listings;
using Billpop.Repositories;
using Microsoft.Extensions.Configuration;
using Nest;

namespace Api.Services
{
    public class ListingService : IListingService
    {
        private readonly IListingRepository _listingRepository;
        private readonly IConfiguration _configuration;
        private readonly ElasticClient _elastic;

        public ListingService(IListingRepository listingRepository, IConfiguration configuration)
        {
            _listingRepository = listingRepository;
            _configuration = configuration;
            _elastic = new ElasticClient(new ConnectionSettings(new Uri(_configuration["url:elastic"]))
                .DefaultIndex("listings"));
        }

        public async Task<int> CreateListing(CreateListingRequest request, int userId)
        {
            Listing listing = new Listing 
            {
                Title = request.Title,
                About = request.About,
                Currency = Currencies.GBP,
                UserId = userId,
                Price = request.Price,
                Created = DateTime.Now,
                Status = Models.Domain.Status.Open,
            };
            listing.Id = await _listingRepository.AddListing(listing);
            await _listingRepository.AddSearchTags(request.SearchTags, listing.Id);
            List<SearchTagType> searchTagTypes = await _listingRepository.GetRelatedSearchTagsForListing(listing.Id);
            ElasticListing elasticListing = (ElasticListing)listing;
            elasticListing.Tags = ElasticListing.SearchTagTypesToElasticTags(searchTagTypes);
            IndexResponse indexListing = await _elastic.IndexDocumentAsync(elasticListing);
            return listing.Id;
        }

        public async Task<Listing> GetListingById(int id)
        {
            return await _listingRepository.GetListingByIdWithSearchTags(id);
        }

        public async Task<bool> UserOwnsListing(int userId, int listingId)
        {
            int? userIdForListing = (await _listingRepository.GetListingWithUserIdOnly(listingId))?.UserId;
            return userIdForListing != null && userIdForListing == userId;
        }

        public async Task UpdateListing(UpdateListingRequest request)
        {
            await _listingRepository.UpdateSearchTags(request.Id, request.SearchTags);
             _listingRepository.UpdateListing(request.Id, request.Title, request.About, request.Price);
            List<SearchTagType> searchTags = await _listingRepository.GetRelatedSearchTagsForListing(request.Id);
            await _elastic.UpdateAsync<ElasticListing>(request.Id, u => u.Index("listings")
                .Doc(new ElasticListing { Title = request.Title, About = request.About, Price = request.Price, Tags = ElasticListing.SearchTagTypesToElasticTags(searchTags) }));
        }

        public void DeleteListing(int id)
        {
            _listingRepository.DeleteListing(id);
            _elastic.DeleteAsync<ElasticListing>(id);
        }

        public Task<List<Listing>> GetListingsForUser(int userId)
        {
            return _listingRepository.GetListingsForUser(userId);
        }

        public async Task<List<ElasticListing>> SearchListings(string query, int number)
        {
            List<ElasticListing> searchResponse = (await _elastic.SearchAsync<ElasticListing>(s => s
                .From(0)
                .Size(number)
                .Query(q => q
                    .MultiMatch(c => c
                    .Fields(f => f.Field(p => p.Title, 1.5).Field(p => p.About).Field(p => p.Tags))
                    .Type(TextQueryType.MostFields)
                    .Query(query)
                    .MinimumShouldMatch(0)
                    .Analyzer("standard")
                    .Fuzziness(Fuzziness.Auto)
                    .PrefixLength(2)
                    .MaxExpansions(2)
                    .Operator(Operator.Or)
                    .FuzzyRewrite(MultiTermQueryRewrite.ConstantScoreBoolean)
                    .Lenient()
                    .Name("named_query")
                    .ZeroTermsQuery(ZeroTermsQuery.All)
                    .AutoGenerateSynonymsPhraseQuery(false))))).Documents.ToList();
            return searchResponse;
        }
    }
}
