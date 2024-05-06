using backend.Models;
using backend.Payloads;
using backend.Repositories;
using System.Web.Http;
using backend.Enums;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static backend.Payloads.AuthPayload;
namespace backend.Controllers
{
    public static class UserApi
    {
        public static void ConfigureUserApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("authentication");
            authGroup.MapPost("/login", Login);
            authGroup.MapPost("/signup", Register);
        }


        /// <summary>
        /// a user that is already in the system can be logged in by entering the right credentials
        /// </summary>
        /// <param name="userManager"></param> is the class from Identity that is used to access the users table that was generated
        /// <param name="tokenService"></param> is the TokenServer class that creates a JWT token easily
        /// <param name="payload"></param> id the data the user needs to provide
        /// <returns></returns> 200 if the payload is ok and the user is in the database, 400 if the payload is bad or missing
        public static async Task<IResult> Login(IUserRepository userRepository, LoginPayload payload)
        {
            return TypedResults.Ok(userRepository.Login(payload));
        }

        /// <summary>
        /// a user is not in the system and need to register
        /// </summary>
        /// <param name="userManager"></param> is the class from Identity that is used to access the users table that was generated
        /// <param name="payload"></param> is the data the user needs to provide
        /// <returns></returns> 201 created if successfull, 400 if the payload is bad or missing
        public static async Task<IResult> Register(IUserRepository userRepository, RegisterPayload payload)
        {
            return TypedResults.Ok(userRepository.CreateAUser(payload));
        }

        public static async Task<IResult> getAllUsers(UserManager<User> userManager)
        {
            var users = await userManager.Users.ToListAsync();

            var userDTOs = users.Select(user => new UserDTO(user)).ToList();
            return TypedResults.Ok(userDTOs);
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> deleteUserById(IUserRepository userRepository, string id)
        {
            bool userDeleted = await userRepository.DeleteUser(id);
            if (userDeleted) {
                return TypedResults.Ok("user has been deleted");
            }
            return TypedResults.BadRequest();
        }
    }
}