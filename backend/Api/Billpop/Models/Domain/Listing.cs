using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models.Domain
{
    public enum Currencies
    {
        GBP,
        EUR,
    }

    public enum Status
    {
        Open,
        AwaitingDelivery,
        Sold,
    }

    public class Listing
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        [MaxLength(300)]
        public string About { get; set; }
        [Column(TypeName = "decimal(6, 2)")]
        public decimal Price { get; set; }
        public Currencies Currency { get; set; }
        public DateTime Created { get; set; }
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public Status Status { get; set; }
        public List<SearchTag> SearchTags { get; set; } = new List<SearchTag>();
    }
}