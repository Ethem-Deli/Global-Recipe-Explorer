import { fetchRandomRecipe, getRecipeById } from './api.mjs';

async function fetchInfo(recipeId) {
    const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
    const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
    );
    return res.json();
}

async function fetchRecipesForWeekly(count = 7) {
    const apiKey = 'f39143f6af2943898e57538f2d6d3de2';
    const url = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${apiKey}`;
    try {
        const { recipes } = await (await fetch(url)).json();
        const detailed = await Promise.all(recipes.map(r => fetchInfo(r.id)));
        renderWeeklyRecipes(detailed);
    } catch (e) { console.error(e); }
}

function renderWeeklyRecipes(recipes) {
    const container = document.getElementById('weekly-recipes');
    container.innerHTML = '';

    recipes.forEach(r => {
        const nutrients = r.nutrition.nutrients.reduce((acc, n) => {
            if (['Calories', 'Protein', 'Fat', 'Carbohydrates'].includes(n.name))
                acc[n.name] = `${n.amount}${n.unit}`;
            return acc;
        }, {});

        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
      <span class="favorite-btn" onclick="saveFavorite(${r.id})">❤️</span>
      <h3>${r.title}</h3>
      <img src="${r.image}" alt="${r.title}" />
      <p><strong>Calories:</strong> ${nutrients.Calories}</p>
      <p><strong>Protein:</strong> ${nutrients.Protein}</p>
      <p><strong>Fat:</strong> ${nutrients.Fat}</p>
      <p><strong>Carbs:</strong> ${nutrients.Carbohydrates}</p>
    `;
        container.appendChild(card);
    });
}

async function loadWeeklyRecipe() {
    const key = 'weeklyRecipe';
    const prev = JSON.parse(localStorage.getItem(key)) || {};
    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    if (!prev.timestamp || now - prev.timestamp > weekMs) {
        const data = await fetchRandomRecipe();
        const recipe = data.meals[0];
        localStorage.setItem(key, JSON.stringify({
            id: recipe.idMeal,
            timestamp: now
        }));
        displayWeekly(recipe);
    } else {
        const data = await getRecipeById(prev.id);
        displayWeekly(data.meals[0]);
    }
}

function displayWeekly(r) {
    const wk = document.getElementById('weekly-recipe');
    if (!wk) return;
    wk.innerHTML = `
    <h3>Weekly Pick</h3>
    <img src="${r.strMealThumb}" alt="${r.strMeal}">
    <p>${r.strMeal}</p>
    <button onclick="location.href='recipe.html?id=${r.idMeal}'">View Recipe</button>
  `;
}

// Initialize on load
loadWeeklyRecipe();