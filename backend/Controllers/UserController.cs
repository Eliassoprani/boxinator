using System.Security.Claims;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using backend.Payloads;
using backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            authGroup.MapPut("/update", updateUser);
            authGroup.MapGet("/getUserByToken", getUserByToken);
            authGroup.MapGet("/getUserByEmail/{email}", getUserByEmail);
            authGroup.MapPost("/google_signup", googleSignup);
        }

        public static async Task<IResult> googleSignup(
            [FromServices] IUserRepository userRepository,
            [FromBody] GoogleSignUpPayload googleSignUpPayload
        )
        {
            var response = await userRepository.GoogleSignup(googleSignUpPayload);
            if (response != null)
            {
                return TypedResults.Ok(response);
            }
            return TypedResults.BadRequest();
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
            LoginResPayload? response = await userRepository.Login(payload);

            if (response != null)
            {
                return TypedResults.Ok(response);
            }

            return TypedResults.BadRequest();
        }

        /// <summary>
        /// a user is not in the system and need to register
        /// </summary>
        /// <param name="userManager"></param> is the class from Identity that is used to access the users table that was generated
        /// <param name="payload"></param> is the data the user needs to provide
        /// <returns></returns> 201 created if successfull, 400 if the payload is bad or missing
        public static async Task<IResult> Register(IUserRepository userRepository, RegisterPayload payload)
        {
            RegisterResPayload? response = await userRepository.CreateAUser(payload);

            if (response != null)
            {
                return TypedResults.Ok(response); //Returnerar user id
            }
            return TypedResults.BadRequest();
        }

        [Microsoft.AspNetCore.Authorization.Authorize] //Kollar om jwt finns och är giltig
        public static async Task<IResult> updateUser([FromServices] IUserRepository userRepository, ClaimsPrincipal user, UserPutPayload payload)
        {
            string? userId = user.UserId();

            if (userId == null)
            {
                return TypedResults.Unauthorized();
            }

            User? updatedUser = await userRepository.UpdateUser(userId, payload);

            if (updatedUser == null)
            {
                return TypedResults.BadRequest();
            }

            return TypedResults.Ok(new UserDTO(updatedUser));
        }

        public static async Task<IResult> getUserByToken([FromServices] IUserRepository userRepository, ClaimsPrincipal user)
        {
            string? userId = user.UserId();

            if (userId == null)
            {
                return TypedResults.Unauthorized();
            }

            User? userToBeReturned = await userRepository.GetUserById(userId);

            if (userToBeReturned == null)
            {
                return TypedResults.BadRequest();
            }

            return TypedResults.Ok(new UserDTO(userToBeReturned));
        }

        public static async Task<IResult> getUserByEmail([FromServices] IUserRepository userRepository, string email)
        {
            User? userToBeReturned = await userRepository.GetUserByEmail(email);

            if (userToBeReturned == null)
            {
                return TypedResults.Ok("notRegistered");
            }

            var id = userToBeReturned.Id;

            return TypedResults.Ok(id);
        }
    }
}
