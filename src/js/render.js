export function renderRecipes(containerId, recipes) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  recipes.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <h3>${r.title}</h3>
        <img src="${r.image}" alt="${r.title}" width="100%">
      `;
    container.appendChild(card);
  });
}

export function renderSpinner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '<div class="spinner">Loading...</div>';
}
