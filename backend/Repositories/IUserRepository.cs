using backend.Models;
using backend.Payloads;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User?> CreateAUser(UserPostPayload payload);

        public Task<User?> UpdateUser(int Userid, string FirstName, string LastName, string Email, int Phone);

        public Task<User?> GetUserById(int Userid);

        public Task<User?> DeleteUser(int Userid);

    }
}