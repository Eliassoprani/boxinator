using backend.Models;
using backend.Payloads;
using backend.Repositories;
using System.Web.Http;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    public static class OrderController
    {
        public static void ConfigureOrderController(this WebApplication app)
        {
            app.MapGet("/orders", GetAllOrders);
            app.MapGet("/orders/{userId}", GetAllUserOrders);
            //app.MapPost("/Orders", CreateAnOrder);
            //app.MapPut("/Orders", UpdateOrder);
            //app.MapGet("/Orders/{OrderId}", GetOrderById);
            //app.MapDelete("/Orders/{OrderId}", DeleteOrder);
        }

        //[Authorize(Roles = "Admin")]
        private static async Task<IResult> GetAllOrders(IOrderRepository OrderRepository)
        {
            return TypedResults.Ok(await OrderRepository.GetAllOrders());    
        }

        //För roll "user" där endast de ordrar med user id returneras
        private static async Task<IResult> GetAllUserOrders(IOrderRepository OrderRepository, string UserId)
        {
            return TypedResults.Ok(await OrderRepository.GetAllUserOrders(UserId)); 
        }

/*
        private static async Task<IResult> CreateAnOrder(IOrderRepository OrderRepository, OrderPostPayload payload)
        {
            Order? Order = await OrderRepository.CreateAnOrder(payload);

            return TypedResults.Created("created", Order);
        }

        //[Authorize(Roles = "Admin")]
        private static async Task<IResult> UpdateOrder(IOrderRepository OrderRepository, OrderPostPayload payload)
        {
            Order? Order = await OrderRepository.UpdateOrder(payload);

            return TypedResults.Created("created", Order);
        }

        private static async Task<IResult> GetOrderById(IOrderRepository OrderRepository, string OrderId)
        {
            Order? Order = await OrderRepository.GetOrderById(orderId);

            return TypedResults.Ok(Order);
        }

        //[Authorize(Roles = "Admin")]
        /*public static async Task<IResult> deleteOrder(IOrderRepository OrderRepository, string OrderId) {
            var order = await OrderRepository.GetOrderById(OrderId);

            if (order == null) return TypedResults.NotFound($"Could not find order with id: {OrderId}");

            var result = await OrderRepository.deleteOrder(OrderId);

            if (result.Succeeded) {
                return TypedResults.Ok($"Order with id: {OrderId} has been removed");
            }

            return TypedResults.BadRequest();
        }*/
    }
}