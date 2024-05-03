using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Payloads;
using backend.Enums;
using backend.Security;
namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DatabaseContext _databaseContext;
        public UserRepository(DatabaseContext db)
        {
            _databaseContext = db;
        }
        public async Task<User?> CreateAUser(UserPostPayload payload)
        {
            User User = new User()
            {
                FirstName = payload.FirstName,
                LastName = payload.LastName,
                Email = payload.Email,
                Password = PasswordHasher.HashPassword(payload.Password),
                DateOfBirth = payload.DateOfBirth,
                CountryOfResidence = payload.CountryOfResidence,
                Role = UserRoles.User,
                ZipCode = payload.ZipCode,
                Phone = payload.Phone,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _databaseContext.Users.Add(User);
            await _databaseContext.SaveChangesAsync();
            return User;
        }

        public async Task<User?> DeleteUser(int Userid)
        {
            User? User = await GetUserById(Userid);
            if (User == null)
            {
                return null;
            }
            _databaseContext.Remove(User);
            await _databaseContext.SaveChangesAsync();

            return User;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _databaseContext.Users
                      .ToListAsync();
        }

        public async Task<User?> GetUserById(int Userid)
        {
            User? User = await _databaseContext.Users
                            .Where(m => m.Id == Userid)
                            .SingleOrDefaultAsync();
            if (User == null)
            {
                return null;
            }
            return User;
        }

        public async Task<User?> UpdateUser(int Userid, string FirstName, string LastName, string Email, int Phone)
        {
            User? User = await GetUserById(Userid);
            if (User == null)
            {
                return null;
            }
            User.FirstName = FirstName;
            User.LastName = LastName;
            User.Email = Email;
            User.Phone = Phone;
            User.UpdatedAt = DateTime.UtcNow;
            await _databaseContext.SaveChangesAsync();

            return User;
        }

        public async Task<User?> Login(string Email, string Password)
        {
            User? User = await _databaseContext.Users
                            .Where(m => m.Email == Email && m.Password == PasswordHasher.HashPassword(Password))
                            .SingleOrDefaultAsync();
            return User;   
        }
    }
}