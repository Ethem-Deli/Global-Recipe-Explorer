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
    armenia: 'middle eastern',
    australia: 'british',
    austria: 'european',
    bangladesh: 'indian',
    belgium: 'european',
    brazil: 'latin american',
    canada: 'american',
    chile: 'latin american',
    china: 'chinese',
    colombia: 'latin american',
    croatia: 'european',
    cuba: 'caribbean',
    czechia: 'european',
    denmark: 'nordic',
    dominicanrepublic: 'caribbean',
    egypt: 'middle eastern',
    england: 'british',
    finland: 'nordic',
    france: 'french',
    germany: 'german',
    greece: 'greek',
    guatemala: 'latin american',
    haiti: 'caribbean',
    honduras: 'latin american',
    hungary: 'european',
    india: 'indian',
    indonesia: 'asian',
    iran: 'middle eastern',
    iraq: 'middle eastern',
    ireland: 'british',
    israel: 'middle eastern',
    italy: 'italian',
    jamaica: 'caribbean',
    japan: 'japanese',
    jordan: 'middle eastern',
    kenya: 'african',
    korea: 'korean',
    lebanon: 'middle eastern',
    malaysia: 'asian',
    mexico: 'mexican',
    morocco: 'african',
    nepal: 'indian',
    netherlands: 'european',
    newzealand: 'british',
    nicaragua: 'latin american',
    nigeria: 'african',
    norway: 'nordic',
    pakistan: 'indian',
    peru: 'latin american',
    philippines: 'asian',
    poland: 'european',
    portugal: 'mediterranean',
    puertorico: 'caribbean',
    qatar: 'middle eastern',
    romania: 'european',
    russianfederation: 'eastern european',
    saudiarabia: 'middle eastern',
    senegal: 'african',
    serbia: 'european',
    singapore: 'asian',
    slovakia: 'european',
    slovenia: 'european',
    southafrica: 'african',
    southkorea: 'korean',
    spain: 'spanish',
    srilanka: 'indian',
    sweden: 'nordic',
    switzerland: 'european',
    syria: 'middle eastern',
    thailand: 'thai',
    tunisia: 'african',
    turkey: 'mediterranean',
    ukraine: 'eastern european',
    unitedarabemirates: 'middle eastern',
    unitedkingdom: 'british',
    unitedstates: 'american',
    uruguay: 'latin american',
    venezuela: 'latin american',
    vietnam: 'vietnamese',
    yemen: 'middle eastern',
    zimbabwe: 'african',
  };

  const cuisine =
    cuisineMap[country.toLowerCase().replace(/\s+/g, '')] || 'world';
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=6&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function searchRecipes(keyword) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&number=6&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function fetchFilteredRecipes({
  query = '',
  cuisine = '',
  diet = '',
  includeIngredients = '',
}) {
  const params = new URLSearchParams({
    ...(query && { query }),
    ...(cuisine && { cuisine }),
    ...(diet && { diet }),
    ...(includeIngredients && { includeIngredients }),
    number: 6,
    apiKey,
  });

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function fetchRandomRecipe() {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getRecipeById(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const data = await res.json();
  return data;
}
