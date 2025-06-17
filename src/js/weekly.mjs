import { fetchRandomRecipe, getRecipeById } from './api.js';

export async function getWeeklyRecipes() {
    const categories = ["italian", "mexican", "indian", "thai", "french"];
    const promises = categories.map(cuisine => searchRecipes({ cuisine }));
    const results = await Promise.all(promises);
    return results.flat().slice(0, 7);
}

const weeklyBtn = document.getElementById('weeklyBtn');
weeklyBtn.addEventListener('click', () => fetchRecipes('', 7));

function fetchRecipes(diet = '', count = 1) {
    const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
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
function getWeeklyRecipe() {
    const lastGenerated = localStorage.getItem('weeklyGenerated');
    const now = new Date().toISOString().split('T')[0];

    if (lastGenerated !== now) {
        fetchRecipes('', 1);
        localStorage.setItem('weeklyGenerated', now);
    }
}
async function loadWeeklyRecipe() {
    const key = 'weeklyRecipe';
    const prev = JSON.parse(localStorage.getItem(key)) || {};
    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    if (!prev.timestamp || now - prev.timestamp > weekMs) {
        const data = await fetchRandomRecipe();
        const recipe = data.meals[0];
        prev.id = recipe.idMeal;
        prev.timestamp = now;
        localStorage.setItem(key, JSON.stringify(prev));
        displayWeekly(recipe);
    } else {
        const data = await getRecipeById(prev.id);
        displayWeekly(data.meals[0]);
    }
}

function displayWeekly(r) {
    const wk = document.getElementById('weekly-recipe');
    wk.innerHTML = `
      <h3>Weekly Pick</h3>
      <img src="${r.strMealThumb}" alt="${r.strMeal}" />
      <p>${r.strMeal}</p>
      <button onclick="location.href='recipe.html?id=${r.idMeal}'">View Recipe</button>
    `;
}

loadWeeklyRecipe();
