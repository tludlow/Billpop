using System;

namespace Billpop.Models
{
    public class LoginProvider
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Picture { get; set; }
        public bool Registered = false;

        public static explicit operator LoginProvider(GoogleToken v)
        {
            return new LoginProvider
            {
                Id = v.Sub,
                Email = v.Email,
                Username = v.Name,
                Picture = v.Picture
            };
        }
    }
}
