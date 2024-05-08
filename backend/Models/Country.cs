using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;
namespace backend.Models
{
    [Table("countries")]
    public class Country
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("country_name")]
        public string CountryName { get; set; }
        [Column("multiplier")]
        public float Multiplier { get; set; }
    }
}