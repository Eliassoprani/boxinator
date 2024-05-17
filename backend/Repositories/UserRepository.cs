using backend.Models;
using backend.Data;
using backend.Payloads;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using static backend.Payloads.AuthPayload;
using backend.Enums;
namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public UserRepository(DatabaseContext db, UserManager<User> userManager, TokenService tokenService)
        {
            _databaseContext = db;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        
        public async Task<RegisterResPayload?> CreateAUser(RegisterPayload payload)
        {
            if (payload.Email == null) return null;
            if (payload.Password == null || payload.Password == "") return null;
            DateTime ca = DateTime.UtcNow;
            Console.WriteLine(ca);
            var result = await _userManager.CreateAsync(
                new User
                {
                    UserName = payload.Email,
                    Email = payload.Email,
                    FirstName = payload.FirstName,
                    LastName = payload.LastName,
                    DateOfBirth = payload.DateOfBirth,
                    Phone = payload.Phone,
                    CountryOfResidence = payload.CountryOfResidence,
                    ZipCode = payload.ZipCode,
                    Role = UserRoles.User,
                    CreatedAt = ca,
                    UpdatedAt = ca
                },
                payload.Password!
            );

            if (result.Succeeded)
            {   
                var user = await _userManager.FindByEmailAsync(payload.Email);
                return new RegisterResPayload(user.Id);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    // Log or display each error message
                    Console.WriteLine($"Error: {error.Description}");
                }
                return null;
            }
        }

        public async Task<bool> DeleteUser(string Userid)
        {
            var user = await _userManager.FindByIdAsync(Userid);

            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return null;
        }

        public async Task<User?> GetUserById(string Userid)
        {
            var user = await _userManager.FindByIdAsync(Userid);

            if (user == null) return null;

            return user;
        }

        public async Task<User?> GetUserByEmail(string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);

            if (user == null) return null;

            return user;    //Behöver endast id returnerat
        }

        public async Task<User?> UpdateUser(string userId, UserPutPayload payload)
        {
            User? user = await GetUserById(userId);
            if (user == null) return null;

            // Update the user properties with the payload values if they are not null
            if (payload.FirstName != null)
                user.FirstName = payload.FirstName;
            if (payload.LastName != null)
                user.LastName = payload.LastName;
            if (payload.Password != null)
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, payload.Password);
            if (payload.DateOfBirth != null)
                user.DateOfBirth = payload.DateOfBirth; // Ändrat till string
            if (payload.Phone != null)
                user.Phone = payload.Phone.Value; // Access the underlying value of int?
            if (payload.CountryOfResidence != null)
                user.CountryOfResidence = payload.CountryOfResidence;
            if (payload.ZipCode != null)
                user.ZipCode = payload.ZipCode.Value; // Access the underlying value of int?

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return user;
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    // Log or handle each error message
                    Console.WriteLine($"Error: {error.Description}");
                }
                return null;
            }
        }

        public async Task<LoginResPayload?> Login(LoginPayload payload)
        {
            if (payload.Email == null || payload.Email.Length == 0) return null;
            if (payload.Password == null || payload.Password.Length == 0) return null;

            // find by email
            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null) return null;

            var isPassword = await _userManager.CheckPasswordAsync(user, payload.Password);
            if (!isPassword) return null;

            var token = _tokenService.CreateToken(user);

            return new LoginResPayload(token, user.Email, user.Id, user.Role, user.FirstName, user.LastName, user.DateOfBirth, user.Phone, user.CountryOfResidence, user.ZipCode);

        }
    }
}