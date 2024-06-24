using backend.Data;
using backend.Models;
using backend.Payloads;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private DatabaseContext _databaseContext;
        private readonly ICountryRepository _countryRepository;
        private readonly IUserRepository _userRepository;

        public OrderRepository(DatabaseContext db, ICountryRepository countryRepository, IUserRepository userRepository){
            _databaseContext = db;
            _countryRepository = countryRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            // Retrieve orders from the database
            var orders = await _databaseContext.Orders
                .Include(order => order.SourceCountry)
                .ToListAsync();
            return orders;
        }

        public async Task<Order?> CreateAnOrder(OrderPostPayload payload)
        {
            Country? country = await _countryRepository.getCountryByCountryName(
                payload.SourceCountry
            );

            if (country == null) {
                return null;
            }

            var order = new Order
            {
                RecieverName = payload.RecieverName,
                Weight = payload.Weight,
                BoxColor = payload.BoxColor,
                Status = payload.OrderStatus,
                DestinationCounty = payload.DestinationCountry,
                CountryId = country.Id,
                UserId = payload.UserId,
                Cost = payload.Cost,
            };

            //Add order manually to database
            try
            {
                _databaseContext.Orders.Add(order);
                await _databaseContext.SaveChangesAsync();
                return order;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Order>> GetAllUserOrders(string UserId)
        {
            //Filter orders by user id
            List<Order> userOrders = await _databaseContext
                .Orders.Where(order => order.UserId == UserId)
                .Include(order => order.SourceCountry)
                .ToListAsync();

            return userOrders;
        }

        public async Task<Order?> GetOrderById(int OrderId)
        {
            var order = await _databaseContext.Orders.FirstOrDefaultAsync(order => order.Id == OrderId);

            return order;
        }

        public async Task<Order?> UpdateOrder(OrderPutPayload payload, int OrderId)
        {
            var order = await GetOrderById(OrderId);

            order.Status = payload.OrderStatus;

            await _databaseContext.SaveChangesAsync();

            return order;
        }

        //When a guest claim an order and create an account, the order is updated with their new user id
        public async Task<Order?> UpdateOrdersUser(OrderPutUserPayload payload)
        {
            int orderIdInt = int.Parse(payload.OrderId);

            var order = await GetOrderById(orderIdInt);

            order.UserId = payload.UserId;

            await _databaseContext.SaveChangesAsync();

            return order;
        }
    }
}
