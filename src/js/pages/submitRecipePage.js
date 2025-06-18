import { requireAuth } from '../auth/protect.js';
import { getLoggedInUser } from '../auth/auth.js';

requireAuth();

document.getElementById('recipeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipeName').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;

  const recipe = {
    name,
    ingredients: ingredients.split(',').map((i) => i.trim()),
    instructions,
    user: getLoggedInUser().email,
  };

  const recipes = JSON.parse(localStorage.getItem('customRecipes') || '[]');
  recipes.push(recipe);
  localStorage.setItem('customRecipes', JSON.stringify(recipes));

  document.getElementById('submitMsg').textContent =
    'Recipe submitted successfully!';
  document.getElementById('recipeForm').reset();
});
