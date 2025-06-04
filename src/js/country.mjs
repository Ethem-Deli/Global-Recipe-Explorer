export async function getCountryData(countryName) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await res.json();
    return data[0]; // Country object
}
