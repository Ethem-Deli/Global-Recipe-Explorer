// src/js/api.mjs
const API_KEY = 'f39143f6af2943898e57538f2d6d3de2';

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

export function clearRecipesContainer() {
    const container = document.getElementById('recipes-container');
    if (container) {
        container.innerHTML = '';
    }
}
export async function fetchRecipes(query) {
    const res = await fetch(`/api/recipes?q=${query}`);
    const data = await res.json();
    return data;
}
export async function renderRecipeCard(query) {
    if (!query) {
        console.error('Query is required to render a recipe card.');
        return;
    }

    const res = await fetch(`/api/recipes?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    const container = document.getElementById('recipes-container');
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    data.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" />
        `;
        container.appendChild(card);
    });
}

/* …existing exports… */

/**
 * Return basic information about a country.
 * Uses the free REST Countries v3 API (no key required).
 * @param {string} country  Full name (“Italy”) or ISO code (“IT”).
 * @returns {Promise<object>}  Facts to show in the UI.
 */
export async function getCountryFacts(country) {
    if (!country) throw new Error('Country name or code is required');

    const endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(
        country
    )}?fullText=true`;

    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error(`Could not fetch facts for “${country}”`);
    }

    // The API returns an array; take the first match
    const [data] = await res.json();
 
    return {
        name: data.name?.common ?? country,
        flag: data.flags?.svg || data.flags?.png,
        capital: data.capital?.[0] ?? '—',
        region: data.region,
        subregion: data.subregion,
        population: data.population,
        currencies: data.currencies
            ? Object.values(data.currencies).map(c => c.name)
            : [],
        languages: data.languages
            ? Object.values(data.languages)
            : [],
    };
}
/**
 * Fetch a single recipe by ID from Spoonacular API
 * @param {number|string} id - The ID of the recipe
 * @returns {Promise<object>} - Recipe details
 */
export async function fetchRecipeById(id) {
    if (!id) throw new Error('Recipe ID is required');

    const url = new URL(`https://api.spoonacular.com/recipes/${id}/information`);
    url.searchParams.append('apiKey', API_KEY);

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch recipe with ID ${id}`);
    }

    const data = await res.json();
    return data;
}
