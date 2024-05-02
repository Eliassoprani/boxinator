using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User?> CreateAUser(string Name, string Email, int Phone);

        public Task<User?> UpdateUser(int Userid, string Name, string Email, int Phone);

        public Task<User?> GetUserById(int Userid);

        public Task<User?> DeleteUser(int Userid);

    }
}