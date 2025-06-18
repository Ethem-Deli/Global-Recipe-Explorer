import {
  fetchRecipes,
  renderRecipeCard,
  clearRecipesContainer,
} from './api.mjs';

export async function getNutritionInfo(id) {
  // Clear previous
  clearRecipesContainer();

  // Load 3 vegetarian recipes
  const vegetarianRecipes = await fetchRecipes({
    diet: 'vegetarian',
    limit: 3,
  });
  vegetarianRecipes.slice(0, 3).forEach((recipe) => {
    renderRecipeCard(recipe); // ensure this function appends inside the correct container
  });

  // Existing nutrition widget fetch
  const url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}
