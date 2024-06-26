using backend.Enums;

namespace backend.Payloads
{
    public class AuthPayload
    {
        // public record LoginPayload(string Email, string Password);
        // public record LoginResPayload(string Token, string Email, string Id, UserRoles Role, string FirstName, string LastName, string DateOfBirth, int? Phone, string CountryOfResidence, int? ZipCode);

        // public record RegisterPayload(string Email, string Password, string FirstName, string LastName, string DateOfBirth, int Phone, string CountryOfResidence, int ZipCode);
        // //public record RegisterResPayload(string Email);
        // public record RegisterResPayload(string Id);

        public record GoogleSignUpPayload(string email, string firstName, string lastName, string jti, string iss, string aud, string azp, int iat, int nbf, string sub, string jwt);
    }
}