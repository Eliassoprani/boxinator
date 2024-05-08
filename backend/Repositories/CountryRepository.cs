using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Enums;
using backend.Models;
using backend.Payloads;
using backend.Security;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private DatabaseContext _databaseContext;

        public CountryRepository(DatabaseContext db)
        {
            _databaseContext = db;
        }

        public async Task<Country?> addCountry(CountryPostPayload payload)
        {
            Country country = new Country();
            country.CountryName = payload.CountryName;
            country.Multiplier = payload.Multiplier;

              try
            {
                _databaseContext.Countries.Add(country);
                await _databaseContext.SaveChangesAsync();
                return country;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Country>> getAllCountries()
        {
            return await _databaseContext.Countries.ToListAsync();
        }

        public async Task<Country?> getCountryByCountryName(string countryName)
        {
            Country? country = await _databaseContext.Countries.Where(c => c.CountryName.ToUpper() == countryName.ToUpper()).FirstOrDefaultAsync();
            if(country == null){
                return null;
            }
            return country;
        }
    }
}
