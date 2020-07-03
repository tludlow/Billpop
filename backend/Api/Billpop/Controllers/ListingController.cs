using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using Billpop.Models;
using Billpop.Models.ExternalProvider;
using Billpop.Models.Requests.Listings;
using Billpop.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Api.Controllers
{
    [Route("api/listing")]
    public class ListingController : ControllerBase
    {
        private readonly IListingService _listingService;
        public ListingController(IListingService listingService)
        {
            _listingService = listingService;
        }

        [HttpGet("{id}")]
        public IActionResult GetListing(int id)
        {
            if(id == 0)
            {
                return BadRequest(new { error = "Invalid id" });
            }
            Listing listing = _listingService.GetListingById(id);
            if(listing == null)
            {
                return BadRequest(new { error = "Invalid id" });
            }
            return Ok(new { listing });
        }

        [Authorize]
        [HttpPut("updatelisting")]
        public IActionResult CreateListing([FromBody] UpdateListingRequest request)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if(!_listingService.UserOwnsListing(userId, request.Id))
            {
                return BadRequest(new { error = "You do not have sufficient permissions" });
            }
            _listingService.UpdateListing(request);
            return Ok();
        }

        [HttpPost("createlisting")]
        [Authorize]
        public IActionResult CreateListing([FromBody] CreateListingRequest request)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            int listingId = _listingService.CreateListing(request, userId);
            return Ok(new { listingId });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteListing(int id)
        {
            int userId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            Roles userRole = (Roles)Enum.Parse(typeof(Roles), User.Claims.FirstOrDefault(x => x.Type.Equals("Role")).Value);
            if(!_listingService.UserOwnsListing(userId, id) && userRole.CompareTo(Roles.Moderator) == -1)
            {
;                return BadRequest(new { error = "You do not have sufficient permissions or the listing does not exist" });
            }
            _listingService.DeleteListing(id);
            return Ok();
        }
    }
}
