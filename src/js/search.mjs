import { getRecipesByQuery } from './api.mjs';
import { renderRecipes } from './recipe.mjs';
import './weekly.mjs';

export async function handleSearch(query) {
  const results = await getRecipesByQuery(query);
  renderRecipes(results);
}
