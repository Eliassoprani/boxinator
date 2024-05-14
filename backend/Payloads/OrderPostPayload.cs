using backend.Enums;

namespace backend.Payloads
{
    public record OrderPostPayload(string UserId, string RecieverName, float Weight, string BoxColor, string DestinationCountry, string SourceCountry, OrderStatus OrderStatus);
    public record OrderPutPayload(OrderStatus OrderStatus);
    public record OrderPutUserPayload(string UserId, string OrderId);

}