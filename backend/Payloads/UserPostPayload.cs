namespace backend.Payloads
{
    public record UserPostPayload(string FirstName, string LastName, string Email, int Phone);
}