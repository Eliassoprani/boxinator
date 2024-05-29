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



/*
        [Test]
        public async Task UpdateOrdersUserTest() {
            //I body: UserId: userId, OrderId: orderId
            //Sätter nytt user_id på en Order
            var updateOrderRequest = JsonConvert.SerializeObject(
                new { UserId = "64b278e4-902e-4685-afac-7614c737a31b", OrderId = "24" }
            );

            // Convert JSON string to HttpContent
            var orderContent = new StringContent(
                updateOrderRequest,
                Encoding.UTF8,
                "application/json"
            );

            var orderResponse = await _client.PutAsync("/orders/updateOrdersUser", orderContent);
            orderResponse.EnsureSuccessStatusCode();

            var orderResponseData = await orderResponse.Content.ReadAsStringAsync();
            var actualOrderResPayload = JsonConvert.DeserializeObject<Order>(   //Kan ej deserialisera order när toString metod finns med i modell class
                orderResponseData
            );

            Console.WriteLine("RETURN: " + actualOrderResPayload);

            Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", actualOrderResPayload.UserId);
        }
/*
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

        /*
                [Test]
                public async Task GetAllUserOrdersTest()
                {
                    //Logga in som user, hämta ordrar
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
        
                    //Hämta ordrar
                    var response = await _client.GetAsync("/orders/getAllUserOrders");
        
                    response.EnsureSuccessStatusCode();
                    Assert.NotNull(response);
        
                    var responseData = await response.Content.ReadAsStringAsync();
        
                    //Problem att deserialisera DTO objekt. Utbytt till list of orders i order controllern
                    var updateResponse = JsonConvert.DeserializeObject<List<Order>>(responseData);
        
                    Order orderToTest = new Order();
        
                    foreach (var order in updateResponse)
                    {
                        Console.WriteLine(order);
                        if (order.Id == 49)
                        {
                            orderToTest = order;
                        }
                    }
        
                    Console.WriteLine("Order to test: " + orderToTest);
        
                    //Testa mot en av ordrarna där id=49
                    var orderToTest2 = new
                    {
                        UserId = "64b278e4-902e-4685-afac-7614c737a31b",
                        RecieverName = "Elin",
                        Weight = 1,
                        BoxColor = "#FFF",
                        DestinationCountry = "Greece",
                        SourceCountry = "Denmark",
                        OrderStatus = 1,
                        Cost = 10
                    };
        
                    Assert.AreEqual(orderToTest2.UserId, orderToTest.UserId);
                    Assert.AreEqual(orderToTest2.RecieverName, orderToTest.RecieverName);
                    Assert.AreEqual(orderToTest2.Weight, orderToTest.Weight);
                    Assert.AreEqual(orderToTest2.BoxColor, orderToTest.BoxColor);
                    Assert.AreEqual(orderToTest2.DestinationCountry, orderToTest.DestinationCountry);
                    Assert.AreEqual(orderToTest2.SourceCountry, orderToTest.SourceCountry.CountryName);
                    Assert.AreEqual(OrderStatus.RECIEVED, orderToTest.Status); // Kan ej jämföra orderPayload.OrderStatus (som är 1) med RECIEVED
                    Assert.AreEqual(orderToTest2.Cost, orderToTest.Cost);
                }
                /*
                        [Test]
                        public async Task CreateAnOrderTest()
                        {
                            //Skapa payload
                            var orderPayload = new
                            {
                                UserId = "64b278e4-902e-4685-afac-7614c737a31b",
                                RecieverName = "Elin",
                                Weight = 1,
                                BoxColor = "#FFF",
                                DestinationCountry = "Greece",
                                SourceCountry = "Denmark",
                                OrderStatus = 0,
                                Cost = 10
                            };
                
                            // Convert to JSON string
                            var jsonPayload = JsonConvert.SerializeObject(orderPayload);
                
                            // Convert JSON string to HttpContent
                            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                
                            var response = await _client.PostAsync("/orders/createAnOrder", content);
                
                            response.EnsureSuccessStatusCode();
                            Assert.NotNull(response);
                
                            // Deserialize the response to RegisterResPayload
                            var responseData = await response.Content.ReadAsStringAsync();
                
                            var orderResPayload = JsonConvert.DeserializeObject<Order>(responseData);
                
                            Console.WriteLine("RETURN: " + orderResPayload);
                            Console.WriteLine(
                                "Sent OrderStatus: " + orderPayload.OrderStatus + " Received OrderStatus: " + orderResPayload.Status
                            );
                
                            Assert.AreEqual(orderPayload.UserId, orderResPayload.UserId);
                            Assert.AreEqual(orderPayload.RecieverName, orderResPayload.RecieverName);
                            Assert.AreEqual(orderPayload.Weight, orderResPayload.Weight);
                            Assert.AreEqual(orderPayload.BoxColor, orderResPayload.BoxColor);
                            Assert.AreEqual(orderPayload.DestinationCountry, orderResPayload.DestinationCountry);
                            Assert.AreEqual(orderPayload.SourceCountry, orderResPayload.SourceCountry.CountryName);
                            Assert.AreEqual(OrderStatus.CREATED, orderResPayload.Status);   // Kan ej jämföra orderPayload.OrderStatus (som är 0) med CREATED
                            Assert.AreEqual(orderPayload.Cost, orderResPayload.Cost);
                        }
                
                        /*
                                [Test]
                                public async Task GetAllOrdersTest() {
                                    //Test logga in som admin och icke admin. Sedan hämta alla ordrar. Ändrade min user role (0/1) direkt i databas vid testning att vara user/admin
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
                        
                                    //Hämta ordrar som icke admin / admin
                                    Console.WriteLine("TOKEN: " + token);
                        
                                    // Add the JWT token to the request headers
                                    _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                                        "Bearer",
                                        token
                                    );
                        
                                    //Hämta ordrar med token
                                    var response = await _client.GetAsync("/orders/getAllOrders");
                        
                                    response.EnsureSuccessStatusCode();
                                    Assert.NotNull(response);
                        
                                    var responseData = await response.Content.ReadAsStringAsync();
                        
                                    Console.WriteLine("RESPONSE: " + responseData);
                        
                                    //Problem att deserialisera DTO objekt. Utbytt till list of orders i order controllern
                                    var updateResponse = JsonConvert.DeserializeObject<List<Order>>(responseData);
                                }
                        */
    }
}
