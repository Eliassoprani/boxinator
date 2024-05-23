using backend.Models;
using backend.Payloads;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<Order>> GetAllOrders();

        public Task<Order?> CreateAnOrder(OrderPostPayload payload);

        public Task<IEnumerable<Order>> GetAllUserOrders(string UserId);

        public Task<Order?> GetOrderById(int OrderId);

        public Task<Order?> UpdateOrder(OrderPutPayload payload, int OrderId);

        public Task<Order?> UpdateOrdersUser(OrderPutUserPayload payload);
    }
}