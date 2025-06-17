// src/js/recipe.mjs
import { fetchRecipeById } from './api.mjs';

(async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const res = await fetchRecipeById(id);
    const container = document.getElementById('recipe-container');

    container.innerHTML = `
    <h1>${res.title}</h1>
    <img src="${res.image}" alt="${res.title}" />
    <h2>Ingredients:</h2>
    <ul>${res.extendedIngredients.map(i => `<li>${i.original}</li>`).join('')}</ul>
    <h2>Instructions:</h2>
    <p>${res.instructions}</p>
  `;
})();
window.onload = () => {
  const id = localStorage.getItem('selectedRecipeId');
  if (!id) return;

  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('recipe-title').textContent = data.title;
      document.getElementById('recipe-img').src = data.image;
      document.getElementById('recipe-ingredients').innerHTML = data.extendedIngredients.map(i => `<li>${i.original}</li>`).join('');
      document.getElementById('recipe-instructions').innerHTML = data.instructions;

      // Country Facts & Flag
      if (data.cuisines?.length) {
        const country = mapCuisineToCountry(data.cuisines[0]);
        if (country) fetchCountryInfo(country);
      }
    });
};

function mapCuisineToCountry(cuisine) {
  const reverseMap = {
    italian: 'italy',
    mexican: 'mexico',
    indian: 'india',
    french: 'france',
    // extend as needed
  };
  return reverseMap[cuisine.toLowerCase()] || null;
}

function fetchCountryInfo(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => {
      const c = data[0];
      document.getElementById('country-facts').innerHTML = `
        <h4>${c.name.common}</h4>
        <img src="${c.flags.png}" width="200" alt="flag">
        <p><strong>Capital:</strong> ${c.capital}</p>
        <p><strong>Region:</strong> ${c.region}</p>
      `;
    });
}