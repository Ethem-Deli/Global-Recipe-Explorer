export async function getWeeklyRecipes() {
    const categories = ["italian", "mexican", "indian", "thai", "french"];
    const promises = categories.map(cuisine => searchRecipes({ cuisine }));
    const results = await Promise.all(promises);
    return results.flat().slice(0, 7);
}
  