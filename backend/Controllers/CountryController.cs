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
    public static class CountryController
    {
        public static void ConfigureCountriesApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("countries");
            authGroup.MapGet("/getAllCountries", getAllCountries);
            authGroup.MapPost("/addCountry", addCountry);
        }

        [Authorize(Roles = "Admin")]
        public static async Task<IResult> getAllCountries([FromServices] ICountryRepository countryRepository)
        {
            //Hämta från IOrderRepository
            IEnumerable<Country> countries = await countryRepository.getAllCountries();

            return TypedResults.Ok(countries);
        }

        public static async Task<IResult> addCountry([FromServices] ICountryRepository countryRepository, CountryPostPayload payload)
        {
            //Hämta från IOrderRepository
            Country? country = await countryRepository.addCountry(payload);

            if(country == null) return TypedResults.BadRequest();

            return TypedResults.Ok(country);
        }
    }
}
