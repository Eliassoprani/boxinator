using backend.Models;
using backend.Payloads;
using static backend.Payloads.AuthPayload;
namespace backend.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();

        public Task<RegisterResPayload?> CreateAUser(RegisterPayload payload);

        public Task<User?> UpdateUser(string userId, UserPutPayload payload);

        public Task<User?> GetUserById(string Userid);

        public Task<User?> GetUserByEmail(string Email);

        public Task<bool> DeleteUser(string Userid);

        public Task<LoginResPayload?> Login(LoginPayload payload);

    }
}