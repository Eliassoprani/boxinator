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
            authGroup.MapPost("/createAnOrder", createAnOrder);
            authGroup.MapGet("/getAllUserOrders", getAllUserOrders);
            authGroup.MapPut("/updateOrder", updateOrder);
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> getAllOrders([FromServices] IOrderRepository orderRepository)
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

        public static async Task<IResult> createAnOrder([FromServices] IOrderRepository orderRepository, OrderPostPayload payload)
        {
            //Hämta från IOrderRepository
            var order = await orderRepository.CreateAnOrder(payload);

            if(order == null) return TypedResults.BadRequest();

            return TypedResults.Ok(order);
        }

        public static async Task<IResult> getAllUserOrders([FromServices] IOrderRepository orderRepository, string UserId)
        {
            //Hämta från IOrderRepository
            var ordersTask = orderRepository.GetAllUserOrders(UserId);

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

        public static async Task<IResult> getOrderById([FromServices] IOrderRepository orderRepository, int OrderId)
        {
            //Hämta från IOrderRepository
            var orderTask = orderRepository.GetOrderById(OrderId);

            //Vänta tills alla orders hämtats
            var order = await orderTask;

            //Gör om till DTO
            var orderDTO = new OrderDTO(order);

            return TypedResults.Ok(orderDTO);
        }

        public static async Task<IResult> updateOrder([FromServices] IOrderRepository orderRepository, OrderPostPayload payload, int OrderId)
        {
            //Hämta från IOrderRepository
            var order = await orderRepository.UpdateOrder(payload, OrderId);

            if(order == null) return TypedResults.BadRequest();

            return TypedResults.Ok(order);
        }
    }
}
