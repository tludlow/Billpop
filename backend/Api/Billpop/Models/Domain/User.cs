using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        public string Password { get; set; }
        [MaxLength(50)]
        public string ExternalId { get; set; }
        [Required]
        [MaxLength(20)]
        [Column(TypeName = "varchar(20)")]
        public string PhoneNumber { get; set; }
        [Required]
        public Roles Role { get; set; }
        public DateTime Created { get; set; }
    }
}
