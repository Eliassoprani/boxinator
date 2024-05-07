using backend.Data;
using backend.DTOs;
using backend.Enums;
using backend.Models;
using backend.Payloads;
using backend.Security;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace backend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private DatabaseContext _databaseContext;

        public OrderRepository(DatabaseContext db)
        {
            _databaseContext = db;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            // Retrieve orders from the database
            var orders = await _databaseContext.Orders.ToListAsync();

            return orders;
        }

        public async Task<Order?> CreateAnOrder(OrderPostPayload payload)
        {
            //Checka så inga fält är null

            //konvertera country string till int?

            //Lägg till user id
            var order = new Order
            {
            RecieverName = payload.RecieverName;
            Weight = payload.Weight;
            BoxColor = payload.BoxColor;
            //CountryId = payload.Country;  
            Status = payload.Status;
            //if(payload.Email)   //Om email finns med => role är guest. Email bör sparas i databas
            //Cost = payload.Cost;  //Bör räknas ut i frontend så användare kan se vad det kostar
            }

            return order;
        }

/*
        public async Task<IEnumerable<OrderDTO>> GetAllUserOrders(string UserId)
        {
            //Filtrera ut och returnera endast de ordrar som har rätt user
            List<Order> userOrders = await _databaseContext
                .Orders.Where(order => order.UserId == UserId)
                .ToListAsync();

            // Map entity models to DTOs using AutoMapper
            var userOrderDtos = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(userOrders);

            return userOrderDtos;
        }

        public async Task<Order?> UpdateOrder(OrderPostPayload payload)
        {
            return null;
        }

        public async Task<Order?> GetOrderById(string OrderId)
        {
            return null;
        }

        public async Task<Order?> DeleteOrder(string OrderId)
        {
            return null;
        }*/
    }
}
