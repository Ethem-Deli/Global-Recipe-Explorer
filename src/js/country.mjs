import { searchRecipes, getCountryFacts } from './api.mjs';

const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

// Select DOM
const detailsDiv = document.getElementById('country-details');
const factsDiv = document.getElementById('country-facts');
const recipesDiv = document.getElementById('country-recipes');

if (!countryName) {
  detailsDiv.innerHTML = '<p>Country not specified.</p>';
} else {
  document.getElementById('country-title').textContent += countryName;

  // Core country info
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
      const c = data[0];
      detailsDiv.innerHTML = `
        <h2>${c.name.common}</h2>
        <img src="${c.flags.svg}" alt="${c.name.common} Flag" id="country-flag" />
        <p><strong>Capital:</strong> ${c.capital?.[0] || 'N/A'}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${c.languages ? Object.values(c.languages).join(', ') : 'N/A'}</p>
        <p><strong>Currencies:</strong> ${
          c.currencies
            ? Object.values(c.currencies)
                .map((x) => x.name)
                .join(', ')
            : 'N/A'
        }</p>
        <p><strong>Timezones:</strong> ${c.timezones.join(', ')}</p>
      `;
    })
    .catch((err) => {
      console.error(err);
      detailsDiv.innerHTML = '<p>Error loading country data.</p>';
    });

  // Extra facts/cards from API
  getCountryFacts(countryName).then((data) => {
    factsDiv.innerHTML = `
      <h3>More Info:</h3>
      <img src="${data.flags.png}" alt="${data.name.common} flag" />
      <p><strong>Currency:</strong> ${data.currencies}</p>
      <p><strong>Capital:</strong> ${data.capital}</p>
      <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${data.region}</p>
    `;
  });

  // Load recipes
  searchRecipes({ cuisine: countryName }).then((results) => {
    recipesDiv.innerHTML = results
      .slice(0, 6)
      .map(
        (recipe) => `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
      </div>
    `,
      )
      .join('');
  });

  // Optionally add famous foods if available
  const foods = countryFoods?.[countryName];
  if (foods) {
    detailsDiv.innerHTML += `
      <h3>Famous Foods</h3><ul>${foods.map((f) => `<li>${f}</li>`).join('')}</ul>
    `;
  }
}
