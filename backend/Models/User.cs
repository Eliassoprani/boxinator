using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;
namespace backend.Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("first_name")]
        public string FirstName { get; set; }
        [Column("last_name")]
        public string LastName { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("date_of_birth")]
        public DateTime DateOfBirth { get; set; }
        [Column("phone")]
        public int Phone { get; set; }
        [Column("country_of_residence")]
        public string CountryOfResidence { get; set; }
        [Column("role")]
        public UserRoles Role { get; set; }
        [Column("zip_code")]
        public int ZipCode { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        // Navigation property for the one-to-many relationship
        public List<Order> Orders { get; set; }
    }
}