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
            app.MapGet("/Users", GetAllUsers);
        }

        private static async Task<IResult> GetAllUsers(IUserRepository UserRepository)
        {
            return TypedResults.Ok(await UserRepository.GetAllUsers());
        }

        private static async Task<IResult> CreateUser(IUserRepository UserRepository, UserPostPayload payload)
        {
            User? User = await UserRepository.CreateAUser(payload);

            return TypedResults.Created("created", User);
        }
    }
}