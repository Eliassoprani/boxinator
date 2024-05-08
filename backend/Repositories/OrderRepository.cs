using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Enums;
using backend.Models;
using backend.Payloads;
using backend.Security;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private DatabaseContext _databaseContext;
        private readonly ICountryRepository _countryRepository;
        public OrderRepository(DatabaseContext db, ICountryRepository countryRepository)
        {
            _databaseContext = db;
            _countryRepository = countryRepository;
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
            Country? country = await _countryRepository.getCountryByCountryName(payload.Country);
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
                Status = payload.Status,
                //if(payload.Email)   //Om email finns med => role är guest. Email bör sparas i databas
                //Cost = payload.Cost;  //Bör räknas ut i frontend så användare kan se vad det kostar

                //Dummy värden för att testa databas
                CountryId = country.Id,
                UserId = "6ed30c52-372e-4c3d-a2a3-8a893fc56a3e",
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
