using System.ComponentModel.DataAnnotations;
using backend.Models;
using backend.Enums;

namespace backend.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public int Phone { get; set; }
        public string CountryOfResidence { get; set; }
        public UserRoles Role { get; set; }
        public int ZipCode { get; set; }

        public UserDTO(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            DateOfBirth = user.DateOfBirth;
            Phone = user.Phone;
            CountryOfResidence = user.CountryOfResidence;
            ZipCode = user.ZipCode;
            Email = user.Email;
            Role = user.Role;
            
        }
    }
}