using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Services;
using Billpop.Models.Elastic;
using Billpop.Models.Requests.Listings;
using Billpop.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/listing")]
    public class ListingController : ControllerBase
    {
        private readonly IListingService _listingService;
        private readonly IAzureBlobService _azureBlobService;

        public ListingController(IListingService listingService, IAzureBlobService azureBlobService)
        {
            _listingService = listingService;
            _azureBlobService = azureBlobService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetListing(int id)
        {
            if(id == 0)
            {
                return BadRequest(new { error = "Invalid id" });
            }
            Listing listing = await _listingService.GetListingById(id);
            if(listing == null)
            {
                return BadRequest(new { error = "Invalid id" });
            }
            return Ok(new { listing });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetListingsForUser(int userId)
        {
            List<Listing> listings = await _listingService.GetListingsForUser(userId);
            return Ok();
        }

        [Authorize]
        [HttpPut("updatelisting")]
        public async Task<IActionResult> UpdateListing([FromBody] UpdateListingRequest request)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if(!await _listingService.UserOwnsListing(userId, request.Id))
            {
                return BadRequest(new { error = "You do not have sufficient permissions or the listing does not exist" });
            }
            await _listingService.UpdateListing(request);
            return Ok();
        }

        [HttpPost("createlisting")]
        [Authorize]
        public async Task<IActionResult> CreateListing([FromBody] CreateListingRequest request)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            int listingId = await _listingService.CreateListing(request, userId);
            return Ok(new { listingId });
        }

        [HttpPost("uploadimages")]
        [Authorize]
        public async Task<IActionResult> UploadImages()
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            var request = await HttpContext.Request.ReadFormAsync();
            List<IFormFile> files = request.Files.Where(x => x.ContentType.StartsWith("image")).ToList();
            await _azureBlobService.UploadAsync(files, $"l/{request["listingId"]}/");
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteListing(int id)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            Roles userRole = (Roles)Enum.Parse(typeof(Roles), User.Claims.FirstOrDefault(x => x.Type.Equals("Role")).Value);
            if(!await _listingService.UserOwnsListing(userId, id) && userRole.CompareTo(Roles.Moderator) == -1)
            {
;                return BadRequest(new { error = "You do not have sufficient permissions or the listing does not exist" });
            }
            _listingService.DeleteListing(id);
            return Ok();
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchListings([FromQuery] string query, int? number)
        {
            int validNumber = (number > 50 || number == null ? 50 : (int)number);
            List<ElasticListing> listings  = await _listingService.SearchListings(query, validNumber);
            return Ok(new { listings });
        }
    }
}
