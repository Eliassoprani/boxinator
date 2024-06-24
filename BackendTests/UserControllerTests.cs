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

        [Test]
        public async Task LoginTest()
        {
            var loginRequestJson = JsonConvert.SerializeObject(
                new LoginPayload("alex.hernstrom@gmail.com", "password")
            );

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

            Assert.AreEqual("alex.hernstrom@gmail.com", actualLoginResPayload.Email);
        }

        [Test]
        public async Task RegisterTest()
        {
            var registerRequestJson = JsonConvert.SerializeObject(
                new RegisterPayload(
                    "newuser@gmail.com",
                    "newpassword",
                    "New",
                    "User",
                    "1990-01-01",
                    1234567890,
                    "USA",
                    12345
                )
            );

            var registerContent = new StringContent(
                registerRequestJson,
                Encoding.UTF8,
                "application/json"
            );

            var registerResponse = await _client.PostAsync(
                "/authentication/signup",
                registerContent
            );
            registerResponse.EnsureSuccessStatusCode();

            var registerResponseData = await registerResponse.Content.ReadAsStringAsync();

            var actualRegisterResPayload = JsonConvert.DeserializeObject<RegisterResPayload>(
                registerResponseData
            );

            Assert.NotNull(actualRegisterResPayload);
            Assert.IsNotEmpty(actualRegisterResPayload.Id);
        }

        [Test]
        public async Task UpdateUserTest()
        {
            var loginRequestJson = JsonConvert.SerializeObject(
                new LoginPayload("newuser@gmail.com", "newpassword")
            );

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

            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            var updateUserRequest = JsonConvert.SerializeObject(
                new UserPutPayload(
                    "Updated",
                    "User",
                    "newpassword",
                    "1991-01-01",
                    9876543210,
                    "Canada",
                    54321
                )
            );

            var userContent = new StringContent(
                updateUserRequest,
                Encoding.UTF8,
                "application/json"
            );

            var updateUserResponse = await _client.PutAsync("/authentication/update", userContent);

            updateUserResponse.EnsureSuccessStatusCode();

            var updateUserResponseData = await updateUserResponse.Content.ReadAsStringAsync();

            var actualUserDTO = JsonConvert.DeserializeObject<UserDTO>(updateUserResponseData);

            Assert.NotNull(actualUserDTO);
            Assert.AreEqual("Updated", actualUserDTO.FirstName);
            Assert.AreEqual("User", actualUserDTO.LastName);
        }

        [Test]
        public async Task GetUserByTokenTest()
        {
            var loginRequestJson = JsonConvert.SerializeObject(
                new LoginPayload("alex.hernstrom@gmail.com", "password")
            );

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

            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                token
            );

            var response = await _client.GetAsync("/authentication/getUserByToken");

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            var responseData = await response.Content.ReadAsStringAsync();

            var userDTO = JsonConvert.DeserializeObject<UserDTO>(responseData);

            Assert.NotNull(userDTO);
            Assert.AreEqual("alex.hernstrom@gmail.com", userDTO.Email);
        }

        [Test]
        public async Task GetUserByEmailTest()
        {
            var response = await _client.GetAsync(
                "/authentication/getUserByEmail/alex.hernstrom@gmail.com"
            );

            response.EnsureSuccessStatusCode();

            Assert.NotNull(response);

            var responseData = await response.Content.ReadAsStringAsync();

            var userId = JsonConvert.DeserializeObject<string>(responseData);

            Assert.NotNull(userId);
            Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", userId);
        }

        [Test]
        public async Task GetUserByIdTest()
        {
            var response = await _client.GetAsync(
                "/authentication/getUserById/64b278e4-902e-4685-afac-7614c737a31b"
            );

            response.EnsureSuccessStatusCode();
            Assert.NotNull(response);

            var responseData = await response.Content.ReadAsStringAsync();
            
            var userDTO = JsonConvert.DeserializeObject<UserDTO>(responseData);

            Assert.NotNull(userDTO);
            Assert.AreEqual("64b278e4-902e-4685-afac-7614c737a31b", userDTO.Id);
            Assert.AreEqual("alex.hernstrom@gmail.com", userDTO.Email);
        }
    }
}
