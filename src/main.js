import './js/home.mjs';
import '../src/css/styles.css';

const dietFilter = document.getElementById('dietFilter');
const weeklyBtn = document.getElementById('weeklyBtn');
const countryFilter = document.getElementById('countryFilter');
// countryDropdown is not used—optional

// Diet Filter
if (dietFilter) {
  dietFilter.addEventListener('change', () => {
    fetchRecipes(dietFilter.value);
  });
}

// Weekly Generator
if (weeklyBtn) {
  weeklyBtn.addEventListener('click', () => fetchRecipes('', 7));
}

// Country Filter
if (countryFilter) {
  countryFilter.addEventListener('change', () => {
    const country = countryFilter.value;
    console.log('[Country Selected]:', country);
    if (country) {
      fetchCountryInfo(country);
      fetchCountryRecipes(country);
    }
  });
}

// Fetch Random or Diet Recipes
function fetchRecipes(diet = '', count = 1) {
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const url = `https://api.spoonacular.com/recipes/random?number=${count}&tags=${diet}&apiKey=${apiKey}&addRecipeNutrition=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => renderRecipes(data.recipes))
    .catch(err => console.error('Error fetching recipes:', err));
}

// Render Recipes
function renderRecipes(recipes) {
  const container = document.getElementById('recipes');
  if (!container) return;
  container.innerHTML = '';

  recipes.forEach(r => {
    const calories = r.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 'N/A';
    const protein = r.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 'N/A';
    const fat = r.nutrition?.nutrients.find(n => n.name === 'Fat')?.amount || 'N/A';
    const carbs = r.nutrition?.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 'N/A';

    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <span class="favorite-btn" onclick="saveFavorite(${r.id})">❤️</span>
      <h3>${r.title}</h3>
      <img src="${r.image}" alt="${r.title}" width="100%">
      <p><strong>Calories:</strong> ${calories}</p>
      <p><strong>Protein:</strong> ${protein}g</p>
      <p><strong>Fat:</strong> ${fat}g</p>
      <p><strong>Carbs:</strong> ${carbs}g</p>
    `;
    container.appendChild(card);
  });
}

// Save Favorites
window.saveFavorite = id => {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Recipe saved to favorites!');
  }
};

// Mobile menu toggle
document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.getElementById('menu')?.classList.toggle('show');
});

// Fetch Country Info
function fetchCountryInfo(name) {
  console.log('[Fetch Country Info]:', name);
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(data => {
      const c = data[0];
      const details = document.getElementById('country-details');
      if (!details) return;
      details.innerHTML = `
        <h4>${c.name.common}</h4>
        <img src="${c.flags.png}" alt="${c.name.common}" width="200">
        <p><strong>Capital:</strong> ${c.capital}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
      `;
    })
    .catch(err => console.error('Error loading country info:', err));
}

// Fetch Country Recipes
function fetchCountryRecipes(country) {
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const container = document.getElementById('country-recipes');
  if (!container) {
    console.error('[ERROR] Missing container with id "country-recipes"');
    return;
  }

  console.log('[Fetch Recipes for Country]:', country);
  fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${country}&number=6&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      console.log('[Country Recipes Data]:', data);
      container.innerHTML = '';
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(3, 1fr)';
      container.style.gap = '1.5rem';

      if (!data.results || data.results.length === 0) {
        container.innerHTML = '<p>No recipes found for this country.</p>';
        return;
      }

      data.results.forEach(r => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <h3>${r.title}</h3>
          <img src="${r.image}" alt="${r.title}" width="100%">
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading country recipes:', err));
}
