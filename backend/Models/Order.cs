using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;

namespace backend.Models
{
    [Table("orders")]
    public class Order
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("reciever_name")]
        public string RecieverName { get; set; }

        [Column("weight")]
        public float Weight { get; set; }

        [Column("box_color")]
        public string BoxColor { get; set; }

        [Column("country_id")]
        public int CountryId { get; set; }
        public Country SourceCountry { get; set; }

        [Column("DestinationCountry")]
        public string DestinationCountry { get; set; }

        [Column("cost")]
        public float Cost { get; set; }

        [Column("user_id")]
        public string UserId { get; set; }
        public User User { get; set; }

        [Column("status")]
        public OrderStatus Status { get; set; }

        // public override string ToString()
        // {
        //     return $"Id: {Id}, "
        //         + $"RecieverName: {RecieverName}, "
        //         + $"Weight: {Weight}, "
        //         + $"BoxColor: {BoxColor}, "
        //         + $"CountryId: {CountryId}, "
        //         + $"SourceCountry: {SourceCountry.CountryName}, "
        //         + $"DestinationCountry: {DestinationCountry}, "
        //         + $"Cost: {Cost}, "
        //         + $"UserId: {UserId}, "
        //         + $"User: {User?.ToString() ?? "null"}, "
        //         + $"Status: {Status}";
        // }
    }
}
