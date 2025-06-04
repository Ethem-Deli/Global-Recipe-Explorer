const API_KEY = 'your_spoonacular_key';
export async function getRecipesByQuery(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}
