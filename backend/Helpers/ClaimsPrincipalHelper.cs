using System.Security.Claims;
using System.Security.Principal;
using backend.Models;
using backend.Enums;
namespace backend.Helpers
{
    public static class ClaimsPrincipalHelpers
    {
        //define method userid extending claimsprincipal
        public static string? UserId(this ClaimsPrincipal user)
        {
            //take user and find first name identifier claim, which is the user.id decided in TokenService
            Claim? claim = user.FindFirst(ClaimTypes.NameIdentifier);
            //if claim not found return null else return user.id string
            return claim?.Value;

        }

        public static UserRoles? Role(this ClaimsPrincipal user)
        {
            // Take user and find role
            Claim? claim = user.FindFirst(ClaimTypes.Role);

            // If claim not found return null, else return role
            if (claim != null)
            {
                if (Enum.TryParse<UserRoles>(claim.Value, out UserRoles role))
                {
                    return role;
                }
                else
                {
                    // Handle the case where the claim value doesn't match any enum value
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
