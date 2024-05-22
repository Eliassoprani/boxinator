using backend.Models;
using backend.Payloads;
using backend.DTOs;

namespace backend.Repositories
{
    public interface ICountryRepository
    {
        public Task<IEnumerable<Country>> getAllCountries();

        public Task<Country?> getCountryByCountryName(string countryName);
    }
}