fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    const grid = document.getElementById('flagGrid');
    if (!grid) return;

    const sortedCountries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common),
    );

    sortedCountries.forEach((country) => {
      const flag = document.createElement('a');
      flag.href = `country.html?name=${country.name.common}`;
      flag.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common}" title="${country.name.common}" class="flag" />`;
      grid.appendChild(flag);
    });
  })
  .catch((err) => console.error('Error loading countries:', err));
