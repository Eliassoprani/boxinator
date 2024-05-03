using backend.Models;
using backend.Payloads;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User?> CreateAUser(UserPostPayload payload);

        public Task<User?> UpdateUser(string Userid, string FirstName, string LastName, string Email, int Phone);

        public Task<User?> GetUserById(string Userid);

        public Task<User?> DeleteUser(string Userid);

    }
}