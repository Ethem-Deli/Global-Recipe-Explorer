// src/js/api.mjs
const apiKey = 'f39143f6af2943898e57538f2d6d3de2';

export async function fetchRecipes(diet = '', count = 1) {
    const url = `https://api.spoonacular.com/recipes/random?number=${count}&tags=${diet}&apiKey=${apiKey}&addRecipeNutrition=true`;
    const res = await fetch(url);
    const data = await res.json();
    return data.recipes;
}

export async function fetchCountryInfo(name) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    return data[0];
}

export async function fetchCountryRecipes(country) {
    const cuisineMap = {
        afghanistan: 'middle eastern',
        algeria: 'african',
        argentina: 'latin american',
        france: 'french',
        japan: 'japanese',
        mexico: 'mexican',
        // ... (other mappings)
    };
    const cuisine = cuisineMap[country.toLowerCase()] || 'world';
    const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=6&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

export async function searchRecipes(keyword) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&number=6&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}
