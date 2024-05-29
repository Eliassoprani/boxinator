namespace backend.Payloads
{
    public record RegisterPayload(
        string Email,
        string Password,
        string FirstName,
        string LastName,
        string DateOfBirth,
        int Phone,
        string CountryOfResidence,
        int ZipCode
    );

    public record RegisterResPayload(string Id);
}
