/**
 * Renders a list of recipe cards into the specified container.
 * @param {Array} recipes - Array of recipe objects to display.
 * @param {HTMLElement} container - The DOM element to append the recipe cards to.
 */
export function renderRecipeCards(recipes, container) {
  container.innerHTML = ''; // Clear existing content

  recipes.forEach((recipe) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const calories =
      recipe.nutrition?.nutrients.find((n) => n.name === 'Calories')?.amount ||
      'N/A';
    const protein =
      recipe.nutrition?.nutrients.find((n) => n.name === 'Protein')?.amount ||
      'N/A';
    const fat =
      recipe.nutrition?.nutrients.find((n) => n.name === 'Fat')?.amount ||
      'N/A';
    const carbs =
      recipe.nutrition?.nutrients.find((n) => n.name === 'Carbohydrates')
        ?.amount || 'N/A';

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

/**
 * Displays a single weekly recipe in the designated section.
 * @param {Object} recipe - The recipe object to display.
 */
export function displayWeeklyRecipe(recipe) {
  const wk = document.getElementById('weekly-recipe');
  if (!wk) return;

  const calories =
    recipe.nutrition?.nutrients.find((n) => n.name === 'Calories')?.amount ||
    'N/A';
  const protein =
    recipe.nutrition?.nutrients.find((n) => n.name === 'Protein')?.amount ||
    'N/A';
  const fat =
    recipe.nutrition?.nutrients.find((n) => n.name === 'Fat')?.amount || 'N/A';
  const carbs =
    recipe.nutrition?.nutrients.find((n) => n.name === 'Carbohydrates')
      ?.amount || 'N/A';

  wk.innerHTML = `
      <h3>Weekly Pick</h3>
      <img src="${recipe.image}" alt="${recipe.title}" />
      <p>${recipe.title}</p>
      <p><strong>Calories:</strong> ${calories}</p>
      <p><strong>Protein:</strong> ${protein}g</p>
      <p><strong>Fat:</strong> ${fat}g</p>
      <p><strong>Carbs:</strong> ${carbs}g</p>
      <button onclick="location.href='recipe.html?id=${recipe.id}'">View Recipe</button>
    `;
}
