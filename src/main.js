import './js/home.mjs';
import '../src/css/styles.css';
import './js/weekly.mjs';
import { fetchRecipes, fetchCountryInfo, fetchCountryRecipes, fetchFilteredRecipes } from './js/api.mjs';

const dietFilter = document.getElementById('dietFilter');
const weeklyBtn = document.getElementById('weeklyBtn');
const countryFilter = document.getElementById('countryFilter');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categorySelect = document.getElementById('categorySelect');
const filterForm = document.getElementById('filterForm');

dietFilter?.addEventListener('change', () => fetchAndRenderRecipes(dietFilter.value));

weeklyBtn?.addEventListener('click', () => fetchAndRenderRecipes('', 7));

countryFilter?.addEventListener('change', async () => {
  const country = countryFilter.value;
  if (!country) return;
  try {
    const countryInfo = await fetchCountryInfo(country);
    renderCountryInfo(countryInfo);
    const countryRecipes = await fetchCountryRecipes(country);
    renderCountryRecipes(countryRecipes);
  } catch (err) {
    console.error('Error loading country data:', err);
  }
});

categorySelect?.addEventListener('change', () => {
  const selected = categorySelect.value;
  if (selected) {
    const url = `https://www.blogilates.com/category/${selected}/`;
    window.open(url, '_blank');
  }
});

searchBtn?.addEventListener('click', async () => {
  const keyword = searchInput.value.trim();
  if (!keyword) return alert('Please enter a search keyword');
  const results = await fetchFilteredRecipes({ query: keyword });
  displayRecipes(results);
});

filterForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  const cuisine = countryFilter.value;
  const diet = dietFilter.value;
  const includeIngredients = document.getElementById('inclIngredients')?.value.trim();

  if (!query && !cuisine && !diet && !includeIngredients) {
    alert('Please provide at least one filter to search.');
    return;
  }

  try {
    const recipes = await fetchFilteredRecipes({ query, cuisine, diet, includeIngredients });
    displayRecipes(recipes);
  } catch (err) {
    console.error('Error fetching filtered recipes:', err);
  }
});

// Fetch & Render Random or Diet Recipes
async function fetchAndRenderRecipes(diet = '', count = 1) {
  try {
    const recipes = await fetchRecipes(diet, count);
    renderRecipes(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipes');
  if (!container) return;
  container.innerHTML = '';

  recipes.forEach((r) => {
    const nutrients = {};
    r.nutrition?.nutrients?.forEach((n) => {
      nutrients[n.name] = `${n.amount || 'N/A'}${n.unit || ''}`;
    });

    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <span class="favorite-btn" onclick="saveFavorite(${r.id})">❤️</span>
      <h3>${r.title}</h3>
      <img src="${r.image}" alt="${r.title}" width="100%">
      <p><strong>Calories:</strong> ${nutrients.Calories || 'N/A'}</p>
      <p><strong>Protein:</strong> ${nutrients.Protein || 'N/A'}</p>
      <p><strong>Fat:</strong> ${nutrients.Fat || 'N/A'}</p>
      <p><strong>Carbs:</strong> ${nutrients.Carbohydrates || 'N/A'}</p>
      <button onclick="viewRecipe(${r.id})">View Recipe</button>
    `;
    container.appendChild(card);
  });
}

function displayRecipes(recipes) {
  const container = document.getElementById('search-results');
  if (!container) return;
  container.innerHTML = '';

  if (!recipes?.length) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>${r.title}</h3>
      <img src="${r.image}" alt="${r.title}" width="100%">
      <button onclick="viewRecipe(${r.id})">View Recipe</button>
    `;
    container.appendChild(card);
  });
}

window.saveFavorite = (id) => {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Recipe saved to favorites!');
  }
};

window.viewRecipe = (id) => {
  localStorage.setItem('selectedRecipeId', id);
  window.location.href = 'recipe.html';
};

document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.getElementById('menu')?.classList.toggle('show');
});

function renderCountryInfo(country) {
  const details = document.getElementById('country-details');
  if (!details) return;
  details.innerHTML = `
    <h4>${country.name.common}</h4>
    <img src="${country.flags.png}" alt="${country.name.common}" width="200">
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
  `;
}

function renderCountryRecipes(recipes) {
  const container = document.getElementById('country-recipes');
  if (!container) return;
  container.innerHTML = '';

  if (!recipes?.length) {
    container.innerHTML = '<p>No recipes found for this country.</p>';
    return;
  }

  recipes.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>${r.title}</h3>
      <img src="${r.image}" alt="${r.title}" width="100%">
      <button onclick="viewRecipe(${r.id})">View Recipe</button>
    `;
    container.appendChild(card);
  });
}
