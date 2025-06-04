import { searchRecipes } from './api.mjs';
import { getCountryFacts } from './api.mjs';

const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

if (!countryName) {
    document.getElementById('country-details').innerHTML = '<p>Country not specified.</p>';
} else {
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
        .then(res => res.json())
        .then(data => {
            const country = data[0];
            document.getElementById('country-name').textContent = country.name.common;
            document.getElementById('country-flag').src = country.flags.svg;
            document.getElementById('country-flag').alt = `${country.name.common} Flag`;
            document.getElementById('country-capital').textContent = country.capital ? country.capital[0] : 'N/A';
            document.getElementById('country-region').textContent = country.region;
            document.getElementById('country-population').textContent = country.population.toLocaleString();
            document.getElementById('country-languages').textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
            document.getElementById('country-currencies').textContent = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
            document.getElementById('country-timezones').textContent = country.timezones.join(', ');
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            document.getElementById('country-details').innerHTML = '<p>Error loading country data.</p>';
        });
}

document.getElementById('country-title').textContent += countryName;

// Country Facts
getCountryFacts(countryName).then(data => {
    const facts = document.getElementById('country-facts');
    facts.innerHTML = `
    <img src="${data.flags.png}" alt="Flag of ${data.name.common}" />
    <p><strong>Capital:</strong> ${data.capital}</p>
    <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${data.region}</p>
  `;
});

// Recipes
searchRecipes({ cuisine: countryName }).then(results => {
    const section = document.getElementById('country-recipes');
    section.innerHTML = results.map(recipe => `
    <div class="recipe-card">
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
    </div>
  `).join('');
});

const foods = countryFoods[country.name.common];
if (foods) {
    const foodList = foods.map(food => `<li>${food}</li>`).join('');
    document.getElementById('country-details').innerHTML += `
    <h2>Famous Foods</h2>
    <ul>${foodList}</ul>
  `;
}

