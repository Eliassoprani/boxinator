using backend.Models;
using backend.Payloads;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<OrderDTO>> GetAllOrders();

        public Task<IEnumerable<OrderDTO>> GetAllUserOrders(string UserId);

        public Task<Order?> CreateAnOrder(OrderPostPayload payload);

        public Task<Order?> UpdateOrder(OrderPostPayload payload);

        public Task<Order?> GetOrderById(string OrderId);

        //public Task<Order?> DeleteOrder(string OrderId);
    }
}