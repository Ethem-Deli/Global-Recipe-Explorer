import { renderRecipes } from './render.js';

window.addEventListener('DOMContentLoaded', () => {
  const containerId = 'favorites-list';
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favs.length === 0) {
    document.getElementById(containerId).innerHTML =
      '<p>No favorites saved.</p>';
    return;
  }

  Promise.all(
    favs.map((id) =>
      fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${'f39143f6af2943898e57538f2d6d3de2'}`,
      ).then((res) => res.json()),
    ),
  )
    .then((recipes) => renderRecipes(containerId, recipes))
    .catch((err) => {
      console.error('Error loading favorite recipes:', err);
      document.getElementById(containerId).innerHTML =
        '<p>Error loading favorites.</p>';
    });
});
