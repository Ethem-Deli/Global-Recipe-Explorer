const fs = require('fs');
const path = require('path');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Country - Global Recipe Explorer</title>
  <link rel="stylesheet" href="/src/css/styles.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</head>
<body>
  <header>
    <nav class="main-nav">
      <div class="logo">
        <a href="index.html">Global Recipe Explorer</a>
      </div>
      <ul id="menu" class="menu">
        <li><a href="/index.html">Home</a></li>
        <li><a href="/countries.html">Countries</a></li>
        <li><a href="/login.html">Login</a></li>
      </ul>
    </nav>
  </header>
  <section class="country-header">
    <h1 id="countryName"></h1>
    <p id="countryIntro"></p>
    <img id="countryFlag" class="flag-img" />
  </section>
  <section class="country-facts">
    <h2>About <span id="countryTitle"></span></h2>
    <p><strong>Capital:</strong> <span id="capital"></span></p>
    <p><strong>Continent:</strong> <span id="continent"></span></p>
    <p><strong>Popular Dishes:</strong> <span id="dishes"></span></p>
  </section>
  <section id="recipes">
    <h2>Popular Recipes</h2>
    <div id="recipeGrid" class="recipe-grid"></div>
  </section>
  <script>
    async function loadCountry() {
      const filename = window.location.pathname.split("/").pop().toLowerCase().replace(".html", "");
      const res = await fetch('../data/countries.json');
      const countries = await res.json();
      const country = countries.find(c => c.code === filename);

      if (!country) {
        document.body.innerHTML = '<h1>Country not found.</h1>';
        return;
      }

      document.title = \`\${country.name} - Global Recipe Explorer\`;
      document.getElementById('countryName').textContent = country.name;
      document.getElementById('countryTitle').textContent = country.name;
      document.getElementById('countryIntro').textContent = \`Explore traditional \${country.name} cuisine, ingredients, and nutritional facts.\`;
      document.getElementById('countryFlag').src = country.flag;
      document.getElementById('countryFlag').alt = \`Flag of \${country.name}\`;
      document.getElementById('capital').textContent = country.capital;
      document.getElementById('continent').textContent = country.continent;
      document.getElementById('dishes').textContent = country.dishes.join(', ');

      const recipeGrid = document.getElementById('recipeGrid');
      country.recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card animate__animated animate__fadeInUp';
        card.innerHTML = \`
          <img src="\${recipe.image}" alt="\${recipe.title}">
          <h3>\${recipe.title}</h3>
          <p>\${recipe.description}</p>
          <a href="\${recipe.link}">View Recipe</a>
        \`;
        recipeGrid.appendChild(card);
      });
    }

    loadCountry();
  </script>
</body>
</html>`;

const dir = '.';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filepath = path.join(dir, file);
        fs.writeFileSync(filepath, htmlTemplate, 'utf8');
        console.log(`✅ Updated: ${file}`);
    }
});
