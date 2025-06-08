//src/main.js
import './js/home.mjs';
import './css/styles.css';

const dietFilter = document.getElementById('dietFilter');
const weeklyBtn = document.getElementById('weeklyBtn');

if (dietFilter) {
  dietFilter.addEventListener('change', () => {
    const diet = dietFilter.value;
    fetchRecipes(diet);
  });
}

if (weeklyBtn) {
  weeklyBtn.addEventListener('click', () => fetchRecipes('', 7));
}

function fetchRecipes(diet = '', count = 1) {
  const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
  const url = `https://api.spoonacular.com/recipes/random?number=${count}&tags=${diet}&apiKey=${apiKey}&addRecipeNutrition=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => renderRecipes(data.recipes))
    .catch(err => console.error('Error fetching recipes:', err));
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipes');
  if (!container) return;

  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const calories = recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A';
    const protein = recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 'N/A';
    const fat = recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 'N/A';
    const carbs = recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 'N/A';

    card.innerHTML = `
      <span class="favorite-btn" onclick="saveFavorite(${recipe.id})">❤️</span>
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="100%">
      <p><strong>Calories:</strong> ${calories}</p>
      <p><strong>Protein:</strong> ${protein}g</p>
      <p><strong>Fat:</strong> ${fat}g</p>
      <p><strong>Carbs:</strong> ${carbs}g</p>
    `;

    container.appendChild(card);
  });
}

window.saveFavorite = function (recipeId) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.includes(recipeId)) {
    favs.push(recipeId);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert('Recipe saved to favorites!');
  }
}

document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.getElementById('menu')?.classList.toggle('show');
});
