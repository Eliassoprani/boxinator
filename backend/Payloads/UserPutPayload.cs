using backend.Enums;

namespace backend.Payloads
{
    //Används aldrig. RegisterPayload används för att skapa ny användare
    //public record UserPostPayload(string FirstName, string LastName, string Email, string Password, string DateOfBirth, int Phone, string CountryOfResidence, int ZipCode);

    //För att uppdatera användare
    public record UserPutPayload(string? FirstName, string? LastName, string? Password, string? DateOfBirth, int? Phone, string? CountryOfResidence, int? ZipCode);
}