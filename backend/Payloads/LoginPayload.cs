using backend.Enums;

namespace backend.Payloads
{
    public record LoginPayload(string Email, string Password);

    public record LoginResPayload(
        string Token,
        string Email,
        string Id,
        UserRoles Role,
        string FirstName,
        string LastName,
        string DateOfBirth,
        int? Phone,
        string CountryOfResidence,
        int? ZipCode
    );
}
