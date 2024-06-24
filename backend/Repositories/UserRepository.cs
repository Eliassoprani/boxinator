using backend.Models;
using backend.Data;
using backend.Payloads;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using static backend.Payloads.AuthPayload;
using backend.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;

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

            return user;
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
                user.DateOfBirth = payload.DateOfBirth;
            if (payload.Phone != null)
                user.Phone = payload.Phone.Value; // Phone is an integer which means .Value is added
            if (payload.CountryOfResidence != null)
                user.CountryOfResidence = payload.CountryOfResidence;
            if (payload.ZipCode != null)
                user.ZipCode = payload.ZipCode.Value;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return user;
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"Error: {error.Description}");
                }
                return null;
            }
        }

        public async Task<LoginResPayload?> Login(LoginPayload payload)
        {
            if (payload.Email == null || payload.Email.Length == 0) return null;
            if (payload.Password == null || payload.Password.Length == 0) return null;

            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null) return null;

            var isPassword = await _userManager.CheckPasswordAsync(user, payload.Password);
            if (!isPassword) return null;

            var token = _tokenService.CreateToken(user);

            return new LoginResPayload(token, user.Email, user.Id, user.Role, user.FirstName, user.LastName, user.DateOfBirth, user.Phone, user.CountryOfResidence, user.ZipCode);
        }

        public async Task<LoginResPayload?> GoogleSignup(GoogleSignUpPayload payload)
        {
            try
            {
                var payloadValidationSettings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new List<string> { "799496013454-k4kisc5leble0b5jfurpvcvev4p6j7bt.apps.googleusercontent.com" }
                };

                var validPayload = await GoogleJsonWebSignature.ValidateAsync(payload.jwt, payloadValidationSettings);

                if (validPayload == null)
                {
                    return null; // Invalid Google token
                }

                var user = await _userManager.FindByEmailAsync(payload.email);

                if (user == null)
                {
                    // User does not exist, create new user
                    var newUser = new User
                    {
                        UserName = payload.email,
                        Email = payload.email,
                        FirstName = payload.firstName ?? "", // If payload.firstName is null, assign an empty string
                        LastName = payload.lastName ?? "",   // If payload.lastName is null, assign an empty string
                        Role = UserRoles.User,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow,
                        DateOfBirth = "",                  // Nullable property, no need to assign a default value
                        Phone = 0,                           // Nullable property, assign 0 as default value
                        CountryOfResidence = "",             // Nullable property, assign an empty string
                        ZipCode = 0                          // Nullable property, assign 0 as default value
                    };

                    var result = await _userManager.CreateAsync(newUser);
                    if (!result.Succeeded)
                    {
                        return null; // User creation failed
                    }

                    user = newUser; // Assign the newly created user to the 'user' variable
                }

                // Generate token for the user
                var token = _tokenService.CreateToken(user);

                // Return the LoginResPayload with user details and token
                return new LoginResPayload(token, user.Email, user.Id, user.Role, user.FirstName, user.LastName, user.DateOfBirth, user.Phone, user.CountryOfResidence, user.ZipCode);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null; // Exception occurred
            }
        }
    }
}