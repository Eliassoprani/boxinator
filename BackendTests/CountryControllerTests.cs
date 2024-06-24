using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using NUnit.Framework;

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
            var expectedCountries = new List<Country>
            {
                new Country
                {
                    Id = 1,
                    CountryName = "Sweden",
                    Multiplier = 1
                },
                new Country
                {
                    Id = 2,
                    CountryName = "Norway",
                    Multiplier = 1.5f
                },
                new Country
                {
                    Id = 3,
                    CountryName = "Denmark",
                    Multiplier = 2.5f
                }
            };

            var response = await _client.GetAsync("/countries/getAllCountries");
            response.EnsureSuccessStatusCode(); // Throw if not a success code

            var responseData = await response.Content.ReadAsStringAsync();
            var actualCountries = JsonConvert.DeserializeObject<List<Country>>(responseData);

            Assert.AreEqual(System.Net.HttpStatusCode.OK, response.StatusCode);
            Assert.AreEqual(
                expectedCountries.Count,
                actualCountries.Count,
                "Country count does not match"
            );

            for (int i = 0; i < expectedCountries.Count; i++)
            {
                Assert.AreEqual(
                    expectedCountries[i].Id,
                    actualCountries[i].Id,
                    $"Country Id at index {i} does not match"
                );
                Assert.AreEqual(
                    expectedCountries[i].CountryName,
                    actualCountries[i].CountryName,
                    $"CountryName at index {i} does not match"
                );
                Assert.AreEqual(
                    expectedCountries[i].Multiplier,
                    actualCountries[i].Multiplier,
                    $"Multiplier at index {i} does not match"
                );
            }
        }
    }
}
