// src/js/recipe.mjs
import { fetchRecipeById } from './api.mjs';

(async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const res = await fetchRecipeById(id);
    const container = document.getElementById('recipe-container');

    container.innerHTML = `
    <h1>${res.title}</h1>
    <img src="${res.image}" alt="${res.title}" />
    <h2>Ingredients:</h2>
    <ul>${res.extendedIngredients.map(i => `<li>${i.original}</li>`).join('')}</ul>
    <h2>Instructions:</h2>
    <p>${res.instructions}</p>
  `;
})();
