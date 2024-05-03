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
            return null;
        }

        public async Task<User?> DeleteUser(string Userid)
        {
            return null;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return null;
        }

        public async Task<User?> GetUserById(string Userid)
        {
           return null;
        }

        public async Task<User?> UpdateUser(string Userid, string FirstName, string LastName, string Email, int Phone)
        {
           return null;
        }

        public async Task<User?> Login(string Email, string Password)
        {
            return null;
        }
    }
}