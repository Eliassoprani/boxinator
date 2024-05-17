using System.Security.Claims;
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
using backend.Helpers;
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
            authGroup.MapPut("/updateOrdersUser", updateOrdersUser);
            authGroup.MapDelete("/deleteOrder", deleteOrder);
        }

        [Authorize(Roles = "Admin")]    //Behöver ej checka claims när Roles = "Admin" är definierad här
        public static async Task<IResult> getAllOrders([FromServices] IOrderRepository orderRepository, ClaimsPrincipal user)
        {
            var orders = await orderRepository.GetAllOrders();

            var orderDTOs =  orders.Select(order => new OrderDTO(order)).ToList();

            return TypedResults.Ok(orderDTOs);
        }

        public static async Task<IResult> createAnOrder([FromServices] IOrderRepository orderRepository, OrderPostPayload payload)
        {
            Console.WriteLine("In BE create an order: " + payload);
            var order = await orderRepository.CreateAnOrder(payload);

            if(order == null) return TypedResults.BadRequest();
            OrderDTO orderDTO= new OrderDTO(order);
            return TypedResults.Ok(orderDTO);
        }

        [Authorize]
        public static async Task<IResult> getAllUserOrders([FromServices] IOrderRepository orderRepository, ClaimsPrincipal user)
        {
            string? userId = user.UserId();

            if (userId == null)
            {
                return TypedResults.Unauthorized();
            }

            var orders = await orderRepository.GetAllUserOrders(userId);

            var orderDTOs =  orders.Select(order => new OrderDTO(order)).ToList();

            return TypedResults.Ok(orderDTOs);
        }

        public static async Task<IResult> getOrderById([FromServices] IOrderRepository orderRepository, int OrderId)
        {
            var order = await orderRepository.GetOrderById(OrderId);

            var orderDTO = new OrderDTO(order);

            return TypedResults.Ok(orderDTO);
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> updateOrder([FromServices] IOrderRepository orderRepository, OrderPutPayload payload, int OrderId)
        {
            var order = await orderRepository.UpdateOrder(payload, OrderId);

            if(order == null) return TypedResults.BadRequest();

            return TypedResults.Ok(order);
        }

        //Om en guest claimat ett konto ska deras order få deras user id
        [Authorize]
        public static async Task<IResult> updateOrdersUser([FromServices] IOrderRepository orderRepository, OrderPutUserPayload payload)
        {
            var order = await orderRepository.UpdateOrdersUser(payload);

            if(order == null) return TypedResults.BadRequest();

            //Gör om till DTO
            //var orderDTO = new OrderDTO(order);

            return TypedResults.Ok();
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> deleteOrder([FromServices] IOrderRepository orderRepository, int OrderId, ClaimsPrincipal user)
        {
            var order = await orderRepository.DeleteOrder(OrderId);

            if(order == null) return TypedResults.BadRequest();

            return TypedResults.Ok(order);
        }
    }
}