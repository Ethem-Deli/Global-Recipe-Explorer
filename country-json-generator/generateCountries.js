const fetch = require('node-fetch');
const fs = require('fs');

async function generateCountriesJSON() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        const formattedCountries = countries.map(country => ({
            code: country.cca3.toLowerCase(),
            name: country.name.common,
            capital: country.capital ? country.capital[0] : '',
            continent: country.region,
            flag: country.flags && country.flags.png ? country.flags.png : '',
            dishes: [],       // You can fill this later with your own dishes
            recipes: []       // You can add your own recipes here later
        }));

        fs.writeFileSync('countries.json', JSON.stringify(formattedCountries, null, 2));
        console.log('countries.json file generated!');
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

generateCountriesJSON();
