import { getRecipeById } from './api.mjs';

function getIngredients(recipe) {
  return Array.from({ length: 20 })
    .map((_, i) => {
      const ing = recipe[`strIngredient${i + 1}`];
      const meas = recipe[`strMeasure${i + 1}`];
      return ing ? `${ing} — ${meas}` : null;
    })
    .filter(Boolean);
}

async function load() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) {
    document.getElementById('recipe-detail').textContent = 'No recipe ID.';
    return;
  }

  const data = await getRecipeById(id);
  const r = data.meals?.[0];
  if (!r) {
    document.getElementById('recipe-detail').textContent = 'Recipe not found.';
    return;
  }

  document.getElementById('recipe-detail').innerHTML = `
    <h2>${r.strMeal}</h2>
    <img src="${r.strMealThumb}" alt="${r.strMeal}" />
    <p><strong>Category:</strong> ${r.strCategory}</p>
    <p><strong>Area:</strong> ${r.strArea}</p>
    <h3>Ingredients</h3>
    <ul>${getIngredients(r)
      .map((i) => `<li>${i}</li>`)
      .join('')}</ul>
    <h3>Instructions</h3>
    <p>${r.strInstructions}</p>
    <div id="country-facts"></div>
  `;

  await loadCountryFacts(r.strArea);
}

async function loadCountryFacts(area) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${area}?fields=capital,region,population,flags`,
    );
    const [c] = await res.json();
    document.getElementById('country-facts').innerHTML = `
      <h3>🇺🇳 From ${area}</h3>
      <img src="${c.flags.svg}" alt="Flag of ${area}" width="100"/>
      <p><strong>Capital:</strong> ${c.capital?.[0] || '–'}</p>
      <p><strong>Region:</strong> ${c.region}</p>
      <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
    `;
  } catch (e) {
    console.warn('Country facts failed:', e);
  }
}

load();
