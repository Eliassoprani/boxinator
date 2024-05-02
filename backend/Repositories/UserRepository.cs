using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DatabaseContext _databaseContext;
        public UserRepository(DatabaseContext db)
        {
            _databaseContext = db;
        }
        public async Task<User?> CreateAUser(string Name, string Email, int Phone)
        {
            User User = new User()
            {
                Name = Name,
                Email = Email,
                Phone = Phone,
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

        public async Task<User?> UpdateUser(int Userid, string Name, string Email, int Phone)
        {
            User? User = await GetUserById(Userid);
            if (User == null)
            {
                return null;
            }
            User.Name = Name;
            User.Email = Email;
            User.Phone = Phone;
            User.CreatedAt = DateTime.UtcNow;
            User.UpdatedAt = DateTime.UtcNow;
            User.UpdatedAt = DateTime.UtcNow;
            await _databaseContext.SaveChangesAsync();

            return User;
        }
    }
}