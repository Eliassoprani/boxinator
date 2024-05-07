using System.Web.Http;
using backend.DTOs;
using backend.Enums;
using backend.Models;
using backend.Payloads;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public static class OrderApi
    {
        public static void ConfigureOrderApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("orders");
            authGroup.MapGet("/getAllOrders", getAllOrders);
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> getAllOrders(
            [FromServices] IOrderRepository orderRepository
        )
        {
            //Hämta från IOrderRepository
            var ordersTask = orderRepository.GetAllOrders();

            //Vänta tills alla orders hämtats
            var orders = await ordersTask;

            //Gör om till DTOs
            var orderDTOs = new List<OrderDTO>();

            foreach (var order in orders)
            {
                var orderDTO = new OrderDTO(order);
                orderDTOs.Add(orderDTO);
            }

            return TypedResults.Ok(orderDTOs);
        }
    }
}
