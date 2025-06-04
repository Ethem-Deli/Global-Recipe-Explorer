export function saveFavorite(recipe) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
