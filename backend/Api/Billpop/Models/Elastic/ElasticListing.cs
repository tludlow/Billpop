using Api.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Billpop.Models.Elastic
{
    public class ElasticListing
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string About { get; set; }
        public DateTime Created { get; set; }
        public decimal Price { get; set; }
        public Currencies Currency { get; set; }
        public int UserId { get; set; }
        public string[] Tags { get; set; }

        public static explicit operator ElasticListing(Listing v)
        {
            return new ElasticListing
            {
                Id = v.Id,
                Title = v.Title,
                About = v.About,
                Created = v.Created,
                Price = v.Price, 
                Currency = v.Currency,
                UserId = v.UserId,
            };
        }

        public static string[] SearchTagTypesToElasticTags(List<SearchTagType> searchTags)
        {
            List<string> tagsList = new List<string>();
            foreach (SearchTagType tag in searchTags)
            {
                tagsList.Add(tag.Name);
                if(tag.RelatedSearchTagTypeId != null)
                {
                    tagsList.Add(tag.RelatedSearchTagTypeId);
                }
            }
            return tagsList.ToArray();
        }
    }
}
