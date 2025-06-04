export async function getNutritionInfo(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`;
    const res = await fetch(url);
    return await res.json();
}
