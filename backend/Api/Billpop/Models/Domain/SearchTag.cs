using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models.Domain
{
    public class SearchTag
    {
        public int Id { get; set; }
        [Required]
        [ForeignKey("Listing")]
        public int ListingId{ get; set; }
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        [ForeignKey("SearchTagType")]
        public string SearchTagTypeId { get; set; }
    }
}
