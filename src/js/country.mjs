// src/js/country.mjs

import { searchRecipes } from './api.mjs';
import { getCountryFacts } from './api.mjs';

const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

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
