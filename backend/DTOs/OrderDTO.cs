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
        public int CountryId { get; set; }  //Switch för att få country name och multiplier
        public OrderStatus Status { get; set; } //Switch på status för att få ut enum/string
        public float Cost { get; set; }
        public string DestinationCountry {get; set;}
        public OrderDTO(Order order)
        {
            Id = order.Id;
            RecieverName = order.RecieverName;
            Weight = order.Weight;
            BoxColor = order.BoxColor;
            CountryId = order.CountryId;
            Status = order.Status;
            Cost = order.Cost;
            DestinationCountry = order.DestinationCounty;
        }
    }
}