using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.Domain
{
    public enum Roles
    {
        User,
        Moderator,
        Admin
    }

    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        public string Password { get; set; }
        public string ExternalId { get; set; }
        public string PhoneNumber { get; set; }
        [Required]
        public Roles Role { get; set; }
    }
}
