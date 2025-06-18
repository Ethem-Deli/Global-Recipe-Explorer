const API_KEY = 'f39143f6af2943898e57538f2d6d3de2';

async function fetchInfo(recipeId) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`,
  );
  return res.json();
}

async function fetchWeeklyRecipes(count = 7) {
  const url = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${API_KEY}`;
  try {
    const { recipes } = await (await fetch(url)).json();
    const detailed = await Promise.all(recipes.map((r) => fetchInfo(r.id)));
    renderWeeklyRecipes(detailed);
  } catch (e) {
    console.error('Failed to fetch weekly recipes:', e);
  }
}

function renderWeeklyRecipes(recipes) {
  const container = document.getElementById('weekly-recipes');
  if (!container) return;
  container.innerHTML = '';

  recipes.forEach((recipe) => {
    const nutrients = recipe.nutrition.nutrients.reduce((acc, n) => {
      if (['Calories', 'Protein', 'Fat', 'Carbohydrates'].includes(n.name)) {
        acc[n.name] = `${n.amount}${n.unit}`;
      }
      return acc;
    }, {});

    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <span class="favorite-btn" data-id="${recipe.id}">❤️</span>
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <p><strong>Calories:</strong> ${nutrients.Calories || 'N/A'}</p>
      <p><strong>Protein:</strong> ${nutrients.Protein || 'N/A'}</p>
      <p><strong>Fat:</strong> ${nutrients.Fat || 'N/A'}</p>
      <p><strong>Carbs:</strong> ${nutrients.Carbohydrates || 'N/A'}</p>
      <button class="view-btn" data-id="${recipe.id}">View Recipe</button>
    `;
    container.appendChild(card);
  });

  // Attach button handlers
  container
    .querySelectorAll('.favorite-btn')
    .forEach((btn) =>
      btn.addEventListener('click', () => saveFavorite(btn.dataset.id)),
    );
  container
    .querySelectorAll('.view-btn')
    .forEach((btn) =>
      btn.addEventListener('click', () => viewRecipe(btn.dataset.id)),
    );
}

function saveFavorite(id) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarkedRecipes')) || [];
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarks));
  }
  alert('Recipe bookmarked!');
}

function viewRecipe(id) {
  localStorage.setItem('selectedRecipeId', id);
  window.location.href = `recipe.html?id=${id}`;
}

async function loadRecipeOfTheWeek() {
  const key = 'recipeOfTheWeek';
  const lastSaved = localStorage.getItem('recipeOfTheWeekDate');
  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  let recipe;

  const isStale = !lastSaved || new Date(lastSaved) < oneWeekAgo;

  if (isStale) {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`,
      );
      const { recipes } = await res.json();
      recipe = recipes[0];
      localStorage.setItem(key, JSON.stringify(recipe));
      localStorage.setItem('recipeOfTheWeekDate', today.toISOString());
    } catch (e) {
      console.error('Failed to fetch Recipe of the Week:', e);
      return;
    }
  } else {
    recipe = JSON.parse(localStorage.getItem(key));
  }

  const section = document.getElementById('weeklyRecipe');
  if (section && recipe) {
    section.innerHTML = `
      <h2>Recipe of the Week</h2>
      <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <a href="recipe.html?id=${recipe.id}">View Recipe</a>
      </div>
    `;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadRecipeOfTheWeek();
  fetchWeeklyRecipes();
});
