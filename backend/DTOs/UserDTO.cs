using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public UserDTO(User user)
        {
            Id = user.Id;
            Username = user.UserName;
            Email = user.Email;
        }
    }
}