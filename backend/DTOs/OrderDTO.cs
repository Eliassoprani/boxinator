using System.ComponentModel.DataAnnotations;
using backend.Models;
using backend.Enums;

namespace backend.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string RecieverName { get; set; }
        public float Weight { get; set; }
        public string BoxColor { get; set; }
        public string SourceCountry { get; set; }
        public OrderStatus Status { get; set; }
        public float Cost { get; set; }
        public string DestinationCountry {get; set;}
        public string UserId {get; set;}
        
        public OrderDTO(Order order)
        {
            Id = order.Id;
            RecieverName = order.RecieverName;
            Weight = order.Weight;
            BoxColor = order.BoxColor;
            SourceCountry = order.SourceCountry.CountryName;
            Status = order.Status;
            Cost = order.Cost;
            DestinationCountry = order.DestinationCountry;
            UserId = order.UserId;
        }
    }
}