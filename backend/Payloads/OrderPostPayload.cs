using backend.Enums;

namespace backend.Payloads
{
    public record OrderPostPayload(string UserId, string RecieverName, float Weight, string BoxColor, string DestinationCountry, OrderStatus OrderStatus);


}