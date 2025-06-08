//src/main.js
import './js/home.mjs';        // country flags
import './js/nutrition.mjs';   // diet filters
import './js/country.mjs';     // country explorer
import './js/recipe.mjs';      // recipe detail (optional)
import '../src/css/styles.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

document.querySelector('.hamburger').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('show');
});
const dietFilter = document.getElementById('dietFilter');
dietFilter.addEventListener('change', () => {
  const diet = dietFilter.value;
  fetchRecipes(diet);
});
function saveFavorite(recipeId) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(recipeId)) {
    favs.push(recipeId);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Recipe saved to favorites!');
  }
}
const weeklyBtn = document.getElementById('weeklyBtn');
weeklyBtn.addEventListener('click', () => fetchRecipes('', 7));

function fetchRecipes(diet = '', count = 1) {
  const apiKey = 'YOUR_SPOONACULAR_API_KEY';
  const url = `https://api.spoonacular.com/recipes/random?number=${count}&tags=${diet}&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => renderRecipes(data.recipes))
    .catch(err => console.error('Error fetching recipes:', err));
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipes');
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    card.innerHTML = `
      <span class="favorite-btn" onclick="saveFavorite(${recipe.id})">❤️</span>
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="100%">
      <p><strong>Calories:</strong> ${recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'}</p>
      <p><strong>Protein:</strong> ${recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 'N/A'}g</p>
      <p><strong>Fat:</strong> ${recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 'N/A'}g</p>
      <p><strong>Carbs:</strong> ${recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 'N/A'}g</p>
    `;

    container.appendChild(card);
  });
}