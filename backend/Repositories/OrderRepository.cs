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

        public OrderRepository(DatabaseContext db, ICountryRepository countryRepository, IUserRepository userRepository)
        {
            _databaseContext = db;
            _countryRepository = countryRepository;
            _userRepository = userRepository;
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
            User? user = await _userRepository.GetUserById(payload.UserId);
            if (user == null) return null;
            //konvertera country string till int?
            Country? country = await _countryRepository.getCountryByCountryName(payload.SourceCountry);
            if(country == null){
                return null; //country finns inte tillgängligt, kan inte skapa order
            }
            //Lägg till user id
            var order = new Order
            {
                RecieverName = payload.RecieverName,
                Weight = payload.Weight,
                BoxColor = payload.BoxColor,
                //CountryId = payload.Country,
                Status = payload.OrderStatus,
                //Cost = payload.Cost;  //Bör räknas ut i frontend så användare kan se vad det kostar
                DestinationCounty = payload.DestinationCountry,
                //Dummy värden för att testa databas
                CountryId = country.Id,
                UserId = payload.UserId,
            };

            //Lägg till manuellt i databas
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
            //Filtrera ut och returnera endast de ordrar som har rätt user
            List<Order> userOrders = await _databaseContext
                .Orders.Where(order => order.UserId == UserId)
                .ToListAsync();

            return userOrders;
        }

        public async Task<Order?> GetOrderById(int OrderId)
        {
            var order = await _databaseContext.Orders.FirstOrDefaultAsync(order =>
                order.Id == OrderId
            );

            return order;
        }

        public async Task<Order?> UpdateOrder(OrderPostPayload payload, int OrderId)
        {
            //Hämta order 
            var order = await GetOrderById(OrderId);

            //Uppdatera order
            order.RecieverName = payload.RecieverName;
            order.Weight = payload.Weight;
            order.BoxColor = payload.BoxColor;
            order.Status = payload.OrderStatus;
 
            //Spara i databas
            await _databaseContext.SaveChangesAsync();

            return order;
        }

        public async Task<Order?> DeleteOrder(int OrderId)
        {
            //Hämta order
            var order = await GetOrderById(OrderId);

            //Radera order i databas kontext
            _databaseContext.Orders.Remove(order);

            //Spara ändring i databas
            await _databaseContext.SaveChangesAsync();

            return order;
        }
    }
}
