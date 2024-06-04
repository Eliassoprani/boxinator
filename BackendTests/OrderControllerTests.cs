using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Enums;
using backend.Models;
using backend.Payloads;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using NUnit.Framework;

namespace backend.tests
{
    public class OrderControllerTests
    {
        private HttpClient _client;
        private WebApplicationFactory<Program> _factory;

        [SetUp]
        public void Setup()
        {
            _factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => { });
            _client = _factory.CreateClient();
        }

        [TearDown]
        public void Teardown()
        {
            _client.Dispose();
            _factory.Dispose();
        }




        [Test]
        public async Task UpdateOrdersUserTest()
        {
            // Log in as a user to fetch orders
            var loginRequestJson = JsonConvert.SerializeObject(
                new { Email = "alex.hernstrom@gmail.com", Password = "password" }
            );

            // Convert JSON string to HttpContent
            var loginContent = new StringContent(
                loginRequestJson,
                Encoding.UTF8,
                "application/json"
            );

            var loginResponse = await _client.PostAsync("/authentication/login", loginContent);
            loginResponse.EnsureSuccessStatusCode();

            var loginResponseData = await loginResponse.Content.ReadAsStringAsync();
            var actualLoginResPayload = JsonConvert.DeserializeObject<LoginResPayload>(
                loginResponseData
            );

            var token = actualLoginResPayload.Token;

            // Add the JWT token to the request headers
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            // Prepare the update order request
            var updateOrderRequest = JsonConvert.SerializeObject(
                new OrderPutUserPayload("64b278e4-902e-4685-afac-7614c737a31b", "69")
            );

            // Convert JSON string to HttpContent
            var orderContent = new StringContent(
                updateOrderRequest,
                Encoding.UTF8,
                "application/json"
            );

            // Send the update order request
            var orderResponse = await _client.PutAsync("/orders/updateOrdersUser", orderContent);
            orderResponse.EnsureSuccessStatusCode();

            var orderResponseData = await orderResponse.Content.ReadAsStringAsync();
            var actualOrderResPayload = JsonConvert.DeserializeObject<Order>(
                orderResponseData
            );

            Console.WriteLine("RETURN: " + actualOrderResPayload);

            Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", actualOrderResPayload.UserId);
        }


        [Test]
        public async Task UpdateOrderTest()
        {
            //Logga in som admin / icke admin och testa uppdatera order
            var loginRequestJson = JsonConvert.SerializeObject(
                new { Email = "alex.hernstrom@gmail.com", Password = "password" }
            );

            // Convert JSON string to HttpContent
            var loginContent = new StringContent(
                loginRequestJson,
                Encoding.UTF8,
                "application/json"
            );

            var loginResponse = await _client.PostAsync("/authentication/login", loginContent);
            loginResponse.EnsureSuccessStatusCode();

            var loginResponseData = await loginResponse.Content.ReadAsStringAsync();
            var actualLoginResPayload = JsonConvert.DeserializeObject<LoginResPayload>(
                loginResponseData
            );

            var token = actualLoginResPayload.Token;

            // Add the JWT token to the request headers
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            //Skapa payload för uppdaterad order
            //public record OrderPutPayload(OrderStatus OrderStatus);
            var orderPayload = new { OrderStatus = 4 }; //4 = CANCELLED

            //Skicka till controller

            var jsonPayload = JsonConvert.SerializeObject(orderPayload);

            // Convert JSON string to HttpContent
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var orderId = 49;
            var response = await _client.PutAsync($"/orders/updateOrder?OrderId={orderId}", content);

            Console.WriteLine("RESPONSE STATUS: " + response);

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            // Deserialize the response
            var responseData = await response.Content.ReadAsStringAsync();

            var orderResPayload = JsonConvert.DeserializeObject<Order>(responseData);

            Console.WriteLine("RETURN: " + responseData);

            //Kolla så orderResPayload.status == 4
            Assert.AreEqual(OrderStatus.CANCELLED, orderResPayload.Status);
        }


        [Test]
        public async Task GetAllUserOrdersTest()
        {
            // Log in as a user to fetch orders
            var loginRequestJson = JsonConvert.SerializeObject(
                new { Email = "alex.hernstrom@gmail.com", Password = "password" }
            );

            // Convert JSON string to HttpContent
            var loginContent = new StringContent(
                loginRequestJson,
                Encoding.UTF8,
                "application/json"
            );

            var loginResponse = await _client.PostAsync("/authentication/login", loginContent);
            loginResponse.EnsureSuccessStatusCode();

            var loginResponseData = await loginResponse.Content.ReadAsStringAsync();
            var actualLoginResPayload = JsonConvert.DeserializeObject<LoginResPayload>(
                loginResponseData
            );

            var token = actualLoginResPayload.Token;

            Console.WriteLine("TOKEN: " + token);

            // Add the JWT token to the request headers
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            // Fetch user orders with the token
            var response = await _client.GetAsync("/orders/getAllUserOrders");

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            var responseData = await response.Content.ReadAsStringAsync();

            Console.WriteLine("RESPONSE: " + responseData);

            // Deserialize response to a dynamic object
            dynamic dynamicOrderObject = JsonConvert.DeserializeObject<dynamic>(responseData);

            // Convert dynamic object to list of OrderDTO
            var orderDTOList = new List<OrderDTO>();

            foreach (var order in dynamicOrderObject)
            {
                var orderDTO = new OrderDTO
                {
                    Id = (int)order.id,
                    RecieverName = (string)order.recieverName,
                    Weight = (int)order.weight,
                    BoxColor = (string)order.boxColor,
                    SourceCountry = (string)order.sourceCountry,
                    Status = (OrderStatus)order.status,
                    Cost = (float)order.cost,
                    DestinationCountry = (string)order.destinationCountry,
                    UserId = (string)order.userId
                };

                orderDTOList.Add(orderDTO);
            }

            foreach (var orderDTO in orderDTOList)
            {
                Console.WriteLine(orderDTO);
            }

            // Example assertion for testing
            var orderToTest = orderDTOList.FirstOrDefault(o => o.Id == 49);
            if (orderToTest != null)
            {
                Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", orderToTest.UserId);
                Assert.AreEqual("Elin", orderToTest.RecieverName);
                Assert.AreEqual(1, orderToTest.Weight);
                Assert.AreEqual("#FFF", orderToTest.BoxColor);
                Assert.AreEqual("Denmark", orderToTest.SourceCountry);
                Assert.AreEqual(OrderStatus.CANCELLED, orderToTest.Status);
                Assert.AreEqual(10, orderToTest.Cost);
                Assert.AreEqual("Greece", orderToTest.DestinationCountry);
            }
        }


        [Test]
                        public async Task CreateAnOrderTest()
                        {
                        //Skapa payload
                        OrderPostPayload orderPayload = new OrderPostPayload("64b278e4-902e-4685-afac-7614c737a31b", "Elin", 1, "#FFF", "Greece", "Denmark", 0, 10);
                     
                            // Convert to JSON string
                            var jsonPayload = JsonConvert.SerializeObject(orderPayload);
                
                            // Convert JSON string to HttpContent
                            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                
                            var response = await _client.PostAsync("/orders/createAnOrder", content);
                
                            response.EnsureSuccessStatusCode();
                            Assert.NotNull(response);
                
                            // Deserialize the response to RegisterResPayload
                            var responseData = await response.Content.ReadAsStringAsync();
                
                            dynamic dynamicOrderObject = JsonConvert.DeserializeObject<dynamic>(responseData);

                            // Create a new instance of OrderDTO and map properties
                            var orderResPayload = new OrderDTO
                            {
                                Id = (int)dynamicOrderObject.id,
                                RecieverName = (string)dynamicOrderObject.recieverName,
                                Weight = (int)dynamicOrderObject.weight,
                                BoxColor = (string)dynamicOrderObject.boxColor,
                                SourceCountry = (string)dynamicOrderObject.sourceCountry,
                                Status = (OrderStatus)dynamicOrderObject.status,
                                Cost = (float)dynamicOrderObject.cost,
                                DestinationCountry = (string)dynamicOrderObject.destinationCountry,
                                UserId = (string)dynamicOrderObject.userId
                            };

                            Console.WriteLine("RETURN: " + orderResPayload);
                            Console.WriteLine(
                                "Sent OrderStatus: " + orderPayload.OrderStatus + " Received OrderStatus: " + orderResPayload.Status
                            );
                
                            Assert.AreEqual(orderPayload.UserId, orderResPayload.UserId);
                            Assert.AreEqual(orderPayload.RecieverName, orderResPayload.RecieverName);
                            Assert.AreEqual(orderPayload.Weight, orderResPayload.Weight);
                            Assert.AreEqual(orderPayload.BoxColor, orderResPayload.BoxColor);
                            Assert.AreEqual(orderPayload.DestinationCountry, orderResPayload.DestinationCountry);
                            Assert.AreEqual(orderPayload.SourceCountry, orderResPayload.SourceCountry);
                            Assert.AreEqual(OrderStatus.CREATED, orderResPayload.Status);   // Kan ej jämföra orderPayload.OrderStatus (som är 0) med CREATED
                            Assert.AreEqual(orderPayload.Cost, orderResPayload.Cost);
                        }


        [Test]
        public async Task GetAllOrdersTest()
        {
            // Log in as admin and non-admin to fetch all orders
            var loginRequestJson = JsonConvert.SerializeObject(
                new { Email = "alex.hernstrom@gmail.com", Password = "password" }
            );

            // Convert JSON string to HttpContent
            var loginContent = new StringContent(
                loginRequestJson,
                Encoding.UTF8,
                "application/json"
            );

            var loginResponse = await _client.PostAsync("/authentication/login", loginContent);
            loginResponse.EnsureSuccessStatusCode();

            var loginResponseData = await loginResponse.Content.ReadAsStringAsync();
            var actualLoginResPayload = JsonConvert.DeserializeObject<LoginResPayload>(
                loginResponseData
            );

            var token = actualLoginResPayload.Token;

            // Add the JWT token to the request headers
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            // Fetch orders with the token
            var response = await _client.GetAsync("/orders/getAllOrders");

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            var responseData = await response.Content.ReadAsStringAsync();

            Console.WriteLine("RESPONSE: " + responseData);

            // Deserialize response to a dynamic object
            dynamic dynamicOrderObject = JsonConvert.DeserializeObject<dynamic>(responseData);

            // Convert dynamic object to list of OrderDTO
            var orderDTOList = new List<OrderDTO>();

            foreach (var order in dynamicOrderObject)
            {
                var orderDTO = new OrderDTO
                {
                    Id = (int)order.id,
                    RecieverName = (string)order.recieverName,
                    Weight = (int)order.weight,
                    BoxColor = (string)order.boxColor,
                    SourceCountry = (string)order.sourceCountry,
                    Status = (OrderStatus)order.status,
                    Cost = (float)order.cost,
                    DestinationCountry = (string)order.destinationCountry,
                    UserId = (string)order.userId
                };

                orderDTOList.Add(orderDTO);
            }

            foreach (var orderDTO in orderDTOList)
            {
                Console.WriteLine(orderDTO);
            }

            // Example assertion for testing
            var orderToTest = orderDTOList.FirstOrDefault(o => o.Id == 49);
            if (orderToTest != null)
            {
                Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", orderToTest.UserId);
                Assert.AreEqual("Elin", orderToTest.RecieverName);
                Assert.AreEqual(1, orderToTest.Weight);
                Assert.AreEqual("#FFF", orderToTest.BoxColor);
                Assert.AreEqual("Denmark", orderToTest.SourceCountry);
                Assert.AreEqual(OrderStatus.CANCELLED, orderToTest.Status);
                Assert.AreEqual(10, orderToTest.Cost);
                Assert.AreEqual("Greece", orderToTest.DestinationCountry);
            }
        }


    }
}
