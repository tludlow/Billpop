using Billpop.Models.ExternalProvider;

namespace Billpop.Models
{
    public class LoginProvider
    {
        public string ExternalId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Picture { get; set; }
        public bool Registered = false;

        public static explicit operator LoginProvider(GoogleToken v)
        {
            return new LoginProvider
            {
                ExternalId = v.Sub,
                Email = v.Email,
                Username = v.Name,
                Picture = v.Picture
            };
        }

        public static explicit operator LoginProvider(FacebookToken v)
        {
            return new LoginProvider
            {
                ExternalId = v.Id,
                Email = v.Email,
                Username = v.Name,
            };
        }
    }
}
