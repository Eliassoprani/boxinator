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
    public class UserControllerTests
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
        public async Task GetUserByTokenTest()
        {
            //Logga in för att få token
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

            //Hämta användare med token
            var response = await _client.GetAsync("/authentication/getUserByToken");

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            // Deserialize the response
            var responseData = await response.Content.ReadAsStringAsync();

            Console.WriteLine("RESPONSE: " + responseData);

            //Problem att deserialisera UserDTO objekt
            var updateResponse = JsonConvert.DeserializeObject<string>(responseData);

            Assert.AreEqual("Alexandraaaa", updateResponse);
        }

        /*
                [Test]
                public async Task UpdateTest()
                {
                    //Logga in som reggad användare. hämta token. skicka token till update metod med uppdaterade props. hämta props från databas. jämför skickade props med hämtade props.
                    // Convert LoginPayload to JSON string
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
        
                    //content: public record UserPutPayload(string? FirstName, string? LastName, string? Password, string? DateOfBirth, int? Phone, string? CountryOfResidence, int? ZipCode);
                    //Skapa payload (request body). Uppdatera first name
                    var requestUpdatePayload = new { FirstName = "Alexandraaaa", };
        
                    // Convert to JSON string
                    var jsonPayload = JsonConvert.SerializeObject(requestUpdatePayload);
        
                    // Convert JSON string to HttpContent
                    var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        
                    var response = await _client.PutAsync("/authentication/update", content);
        
                    response.EnsureSuccessStatusCode();
                    Assert.NotNull(response);
        
                    // Deserialize the response
                    var responseData = await response.Content.ReadAsStringAsync();
        
                    Console.WriteLine("RESPONSE: " + responseData);
        
                    //Problem att deserialisera UserDTO objekt, har därför bytt att update returnerar en string (user.FirstName)
                    var updateResponse = JsonConvert.DeserializeObject<string>(responseData);
        
                    Assert.AreEqual("Alexandraaaa", updateResponse);
                }
        
                /*
                [Test]
                public async Task RegisterTest()
                {
                    //Testa att http respons är 200 OK samt att respons data ej är null
                    var requestRegisterPayload = new
                    {
                        Email = "johanna@test.se",
                        Password = "password",
                        FirstName = "Johanna",
                        LastName = "Tester",
                        DateOfBirth = "2024-05-28",
                        Phone = 111,
                        CountryOfResidence = "Denmark",
                        ZipCode = 111
                    };
        
                    // Convert to JSON string
                    var jsonPayload = JsonConvert.SerializeObject(requestRegisterPayload);
        
                    // Convert JSON string to HttpContent
                    var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        
                    var response = await _client.PostAsync("/authentication/signup", content);
        
                    // Deserialize the response to RegisterResPayload
                    var responseData = await response.Content.ReadAsStringAsync();
                    var registerResPayload = JsonConvert.DeserializeObject<RegisterResPayload>(
                        responseData
                    );
        
                    // Access the Id property
                    var idFromRegisterRes = registerResPayload.Id;
        
                    //Hämta det nyskapade ID:t från databasen med getUserByEmail och jämför med det id som returnerades
                    var responseFromDb = await _client.GetAsync(
                        $"/authentication/getUserByEmail/johanna@test.se"
                    );
                    var responseFromDbData = await responseFromDb.Content.ReadAsStringAsync();
                    var idFromDb = JsonConvert.DeserializeObject<string>(responseFromDbData);
        
                    Console.WriteLine("FROM REGISTER:");
                    Console.WriteLine(idFromRegisterRes); //Tom string
                    Console.WriteLine("FROM DB:");
                    Console.WriteLine(idFromDb);
        
                    response.EnsureSuccessStatusCode();
                    Assert.NotNull(response);
                    Assert.AreEqual(idFromRegisterRes, idFromDb);
                }
        
                /*
                        [Test]
                        public async Task GetUserByEmailTest()
                        {
                            const string expectedId = "64b278e4-902e-4685-afac-7614c737a31b";
                
                            const string email = "alex.hernstrom@gmail.com";
                
                            var response = await _client.GetAsync($"/authentication/getUserByEmail/{email}");
                            response.EnsureSuccessStatusCode();
                
                            // Get response as an HttpResponseMessage
                            var responseData = await response.Content.ReadAsStringAsync();
                
                            // Correctly deserialize the JSON string to remove the extra quote marks
                            var actualId = JsonConvert.DeserializeObject<string>(responseData);
                
                            Console.WriteLine("EXPECTED:");
                            Console.WriteLine(expectedId);
                            Console.WriteLine("ACTUAL:");
                            Console.WriteLine(actualId);
                
                            Assert.NotNull(responseData);
                            Assert.AreEqual(expectedId, actualId);
                        }
                        
                
                        /*
                                [Test]
                                public async Task LoginTest()
                                //public record LoginResPayload(string Token, string Email, string Id, UserRoles Role, string FirstName, string LastName, string DateOfBirth, int? Phone, string CountryOfResidence, int? ZipCode);
                                {
                                    const expectedLoginResPayload = new LoginResPayload(
                                        "tokenstring",
                                        "alex.hernstrom@gmail.com",
                                        "64b278e4-902e-4685-afac-7614c737a31b",
                                        UserRoles.User,
                                        "Alexandra",
                                        "Harn",
                                        "2024-05-28",
                                        111,
                                        "Sweden",
                                        777
                                    );
                        
                                    // Convert LoginPayload to JSON string
                                    var loginRequestJson = JsonConvert.SerializeObject(
                                        new { Email = "alex.hernstrom@gmail.com", Password = "password" }
                                    );
                        
                                    // Convert JSON string to HttpContent
                                    var content = new StringContent(loginRequestJson, Encoding.UTF8, "application/json");
                        
                                    var response = await _client.PostAsync("/authentication/login", content);
                                    response.EnsureSuccessStatusCode();
                        
                                    var responseData = await response.Content.ReadAsStringAsync();
                                    var actualLoginResPayload = JsonConvert.DeserializeObject<LoginResPayload>(
                                        responseData
                                    );
                        
                                    Console.WriteLine("EXPECTED:");
                                    Console.WriteLine(expectedLoginResPayload);
                                    Console.WriteLine("ACTUAL:");
                                    Console.WriteLine(actualLoginResPayload);
                        
                                    // Assert
                                    Assert.NotNull(actualLoginResPayload);
                                    Assert.AreEqual(expectedLoginResPayload.Email, actualLoginResPayload.Email);
                                    Assert.AreEqual(expectedLoginResPayload.Id, actualLoginResPayload.Id);
                                    Assert.AreEqual(expectedLoginResPayload.Role, actualLoginResPayload.Role);
                                    Assert.AreEqual(expectedLoginResPayload.FirstName, actualLoginResPayload.FirstName);
                                    Assert.AreEqual(expectedLoginResPayload.LastName, actualLoginResPayload.LastName);
                                    Assert.AreEqual(expectedLoginResPayload.DateOfBirth, actualLoginResPayload.DateOfBirth);
                                    Assert.AreEqual(expectedLoginResPayload.Phone, actualLoginResPayload.Phone);
                                    Assert.AreEqual(
                                        expectedLoginResPayload.CountryOfResidence,
                                        actualLoginResPayload.CountryOfResidence
                                    );
                                    Assert.AreEqual(expectedLoginResPayload.ZipCode, actualLoginResPayload.ZipCode);
                                }
                                */
    }
}
