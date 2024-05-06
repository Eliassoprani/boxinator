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
        //public Country Country { get; set; }
        //public OrderStatus status { get; set; }

        public OrderDTO(Order order)
        {
            Id = order.Id;
            RecieverName = order.RecieverName;
            Weight = order.Weight;
            BoxColor = order.BoxColor;
            //CountryId = order.Country.CountryId;
            //CountryName = order.Country.CountryName;
            //CountryMultiplier = order.Country.CountryMultiplier;
            //OrderStatus = order.status;
        }
    }
}