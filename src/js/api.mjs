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
