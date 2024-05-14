using backend.Enums;

namespace backend.Payloads
{
    public record UserPostPayload(string FirstName, string LastName, string Email, string Password, DateTime DateOfBirth, int Phone, string CountryOfResidence, int ZipCode);
    public record UserPutPayload(string? FirstName, string? LastName, string? Password, DateTime? DateOfBirth, int? Phone, string? CountryOfResidence, int? ZipCode);

}