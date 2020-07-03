using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models.Domain
{
    public class SearchTagType
    {
        [Key]
        [Required]
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
        [MaxLength(50)]
        [Column(TypeName = "varchar(50)")]
        [ForeignKey("SearchTagType")]
        public string RelatedSearchTagTypeId { get; set; }
    }
}
