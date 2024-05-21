import { urlBackendBasePath } from "../assets/strings";

export const fetchCountries = async (setCountries) => {
    const fetchCountriesResponse = await fetch(`${urlBackendBasePath}/countries/getAllCountries`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });

    if (!fetchCountriesResponse.ok) {
      throw new Error("Failed to get countries from the database");
    }

    const returnedCountries = await fetchCountriesResponse.json();

    console.log(returnedCountries);

    setCountries(returnedCountries);
  }