using backend.Enums;

namespace backend.Payloads
{
    public record OrderPostPayload(string RecieverName, float Weight, string BoxColor, string Country, string Email, string Status);
}