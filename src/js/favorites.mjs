export function addFavorite(recipe) {
    let saved = JSON.parse(localStorage.getItem("favorites")) || [];
    saved.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(saved));
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}
