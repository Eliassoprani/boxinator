using Microsoft.AspNetCore.Mvc.Testing;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;
using Newtonsoft.Json;
using backend.Models;

namespace backend.tests
{
    public class CountryControllerTests
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
        public async Task GetAllCountriesTest()
        {
            // Arrange
            var expectedCountries = new List<Country>
            {
                new Country { Id = 1, CountryName = "Country1", Multiplier = 1.0f },
                new Country { Id = 2, CountryName = "Country2", Multiplier = 2.0f },
            };

            // Act
            var response = await _client.GetAsync("/countries/getAllCountries");
            response.EnsureSuccessStatusCode(); // Throw if not a success code

            var responseData = await response.Content.ReadAsStringAsync();
            var actualCountries = JsonConvert.DeserializeObject<IEnumerable<Country>>(responseData);

            // Assert
            Assert.AreEqual(System.Net.HttpStatusCode.OK, response.StatusCode);
            CollectionAssert.AreEqual(expectedCountries, actualCountries);
        }
    }
}
