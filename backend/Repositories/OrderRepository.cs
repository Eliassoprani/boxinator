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

        private readonly IMapper _mapper;

        public OrderRepository(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderDTO>> GetAllOrders()
        {
            // Retrieve orders from the database
            var orders = await _databaseContext.Orders.ToListAsync();

            // Map entity models to DTOs using AutoMapper
            var orderDtos = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(orders);

            return orderDtos;
        }

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

        public async Task<Order?> CreateAnOrder(OrderPostPayload payload)
        {
            return null;
        }

        public async Task<Order?> UpdateOrder(OrderPostPayload payload)
        {
            return null;
        }

        public async Task<Order?> GetOrderById(string OrderId)
        {
            return null;
        }

        /*public async Task<Order?> DeleteOrder(string OrderId)
        {
            return null;
        }*/
    }
}
