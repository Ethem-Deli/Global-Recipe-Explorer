// src/js/api.mjs
const API_KEY = 'f39143f6af2943898e57538f2d6d3de2';

/**
 * Search recipes via Spoonacular complexSearch endpoint.
 * Accepts optional query, cuisine, and diet filters.
 * Returns up to 12 results.
 */
export async function searchRecipes({ query, cuisine, diet }) {
    const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
    url.searchParams.append('apiKey', API_KEY);
    if (query) url.searchParams.append('query', query);
    if (cuisine) url.searchParams.append('cuisine', cuisine);
    if (diet) url.searchParams.append('diet', diet);
    url.searchParams.append('number', 12);

    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

/** Remove all recipe cards from the page. */
export function clearRecipesContainer() {
    const container = document.getElementById('recipes-container');
    if (container) container.innerHTML = '';
}

/** Fetch recipes from your own backend proxy endpoint. */
export async function fetchRecipes(query) {
    const res = await fetch(`/api/recipes?q=${encodeURIComponent(query)}`);
    return res.json();
}

/** Render recipe cards into #recipes-container based on a query string. */
export async function renderRecipeCard(query) {
    if (!query) throw new Error('Query is required to render a recipe card.');

    const data = await fetchRecipes(query);
    const container = document.getElementById('recipes-container');
    if (!container) return;

    container.innerHTML = '';
    data.forEach(({ title, image }) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
      <h3>${title}</h3>
      <img src="${image}" alt="${title}">
    `;
        container.appendChild(card);
    });
}

/**
 * Get basic country facts from the REST Countries API.
 * Accepts full name (“Italy”) or ISO code (“IT”).
 */
export async function getCountryFacts(country) {
    if (!country) throw new Error('Country name or code is required');

    const endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Could not fetch facts for “${country}”`);

    const [data] = await res.json();
    return {
        name: data.name?.common ?? country,
        flag: data.flags?.svg || data.flags?.png,
        capital: data.capital?.[0] ?? '—',
        region: data.region,
        subregion: data.subregion,
        population: data.population,
        currencies: data.currencies ? Object.values(data.currencies).map(c => c.name) : [],
        languages: data.languages ? Object.values(data.languages) : [],
    };
}

/**
 * Fetch a single recipe by ID from Spoonacular.
 */
export async function fetchRecipeById(id) {
    if (!id) throw new Error('Recipe ID is required');

    const url = new URL(`https://api.spoonacular.com/recipes/${id}/information`);
    url.searchParams.append('apiKey', API_KEY);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch recipe with ID ${id}`);

    return res.json();
}
