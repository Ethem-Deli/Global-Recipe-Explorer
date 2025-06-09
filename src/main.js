import './js/home.mjs';
import '../src/css/styles.css';

const dietFilter = document.getElementById('dietFilter');
const weeklyBtn = document.getElementById('weeklyBtn');
const countryFilter = document.getElementById('countryFilter');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categorySelect = document.getElementById('categorySelect');

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
    if (country) {
      fetchCountryInfo(country);
      fetchCountryRecipes(country);
    }
  });
}

// Blogilates Recipe Category Dropdown
if (categorySelect) {
  categorySelect.addEventListener('change', () => {
    const selected = categorySelect.value;
    if (selected) {
      const url = `https://www.blogilates.com/category/${selected}/`;
      window.open(url, '_blank');
    }
  });
}

// Recipe Search
if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.trim();
    if (keyword) searchRecipes(keyword);
  });
}

// Fetch Recipes by diet or random
function fetchRecipes(diet = '', count = 1) {
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const url = `https://api.spoonacular.com/recipes/random?number=${count}&tags=${diet}&apiKey=${apiKey}&addRecipeNutrition=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => renderRecipes(data.recipes))
    .catch(err => console.error('Error fetching recipes:', err));
}

// Render recipes
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

// Save favorite recipe to localStorage
window.saveFavorite = id => {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Recipe saved to favorites!');
  }
};

// Toggle hamburger menu
document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.getElementById('menu')?.classList.toggle('show');
});

// Fetch country info from REST Countries API
function fetchCountryInfo(name) {
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

// Fetch recipes by cuisine mapped from selected country
function fetchCountryRecipes(country) {
  const cuisineMap = {
    afghanistan: 'middle eastern',
    algeria: 'african',
    argentina: 'latin american',
    armenia: 'middle eastern',
    australia: 'british',
    austria: 'european',
    bangladesh: 'indian',
    belgium: 'european',
    brazil: 'latin american',
    canada: 'american',
    chile: 'latin american',
    china: 'chinese',
    colombia: 'latin american',
    croatia: 'european',
    cuba: 'caribbean',
    czechia: 'european',
    denmark: 'nordic',
    dominicanrepublic: 'caribbean',
    egypt: 'middle eastern',
    england: 'british',
    finland: 'nordic',
    france: 'french',
    germany: 'german',
    greece: 'greek',
    guatemala: 'latin american',
    haiti: 'caribbean',
    honduras: 'latin american',
    hungary: 'european',
    india: 'indian',
    indonesia: 'asian',
    iran: 'middle eastern',
    iraq: 'middle eastern',
    ireland: 'british',
    israel: 'middle eastern',
    italy: 'italian',
    jamaica: 'caribbean',
    japan: 'japanese',
    jordan: 'middle eastern',
    kenya: 'african',
    korea: 'korean',
    lebanon: 'middle eastern',
    malaysia: 'asian',
    mexico: 'mexican',
    morocco: 'african',
    nepal: 'indian',
    netherlands: 'european',
    newzealand: 'british',
    nicaragua: 'latin american',
    nigeria: 'african',
    norway: 'nordic',
    pakistan: 'indian',
    peru: 'latin american',
    philippines: 'asian',
    poland: 'european',
    portugal: 'mediterranean',
    puertorico: 'caribbean',
    qatar: 'middle eastern',
    romania: 'european',
    russianfederation: 'eastern european',
    saudiarabia: 'middle eastern',
    senegal: 'african',
    serbia: 'european',
    singapore: 'asian',
    slovakia: 'european',
    slovenia: 'european',
    southafrica: 'african',
    southkorea: 'korean',
    spain: 'spanish',
    srilanka: 'indian',
    sweden: 'nordic',
    switzerland: 'european',
    syria: 'middle eastern',
    thailand: 'thai',
    tunisia: 'african',
    turkey: 'mediterranean',
    ukraine: 'eastern european',
    unitedarabemirates: 'middle eastern',
    unitedkingdom: 'british',
    unitedstates: 'american',
    uruguay: 'latin american',
    venezuela: 'latin american',
    vietnam: 'vietnamese',
    yemen: 'middle eastern',
    zimbabwe: 'african'
  };

  const cuisineKey = country.toLowerCase().replace(/\s+/g, '');
  const cuisine = cuisineMap[cuisineKey] || 'world';
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const container = document.getElementById('country-recipes');
  if (!container) return;

  fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=6&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';
      if (!data.results?.length) {
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

// Search by keyword
function searchRecipes(keyword) {
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&number=6&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('search-results');
      container.innerHTML = '';

      if (!data.results?.length) {
        container.innerHTML = '<p>No recipes found.</p>';
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
    .catch(err => console.error('Error searching recipes:', err));
}
