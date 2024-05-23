using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    [Table("users")]
    public class User : IdentityUser
    {
        [Column("first_name")]
        public string FirstName { get; set; }

        [Column("last_name")]
        public string LastName { get; set; }

        [Column("date_of_birth")]
        public string? DateOfBirth { get; set; } = null; // Provide default value

        [Column("phone")]
        public int? Phone { get; set; } = null; // Provide default value

        [Column("country_of_residence")]
        public string? CountryOfResidence { get; set; }

        [Column("role")]
        public UserRoles Role { get; set; }

        [Column("zip_code")]
        public int? ZipCode { get; set; } = null; // Provide default value

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        // Navigation property for the one-to-many relationship
        public List<Order> Orders { get; set; }
    }
}
