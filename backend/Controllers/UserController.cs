using backend.Models;
using backend.Payloads;
using backend.Repositories;

namespace backend.Controllers
{
    public static class UserApi
    {
        public static void ConfigureUserApi(this WebApplication app)
        {
            app.MapPost("/Users", CreateUser);
        }

        private static async Task<IResult> GetAllUsers(IUserRepository UserRepository)
        {
            return TypedResults.Ok(await UserRepository.GetAllUsers());
        }

        private static async Task<IResult> CreateUser(IUserRepository UserRepository, UserPostPayload payload)
        {
            User? User = await UserRepository.CreateAUser(payload.FirstName, payload.LastName, payload.Email, payload.Phone);

            return TypedResults.Created("created", User);
        }
    }
}