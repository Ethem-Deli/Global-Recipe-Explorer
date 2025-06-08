(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(o){if(o.ep)return;o.ep=!0;const c=e(o);fetch(o.href,c)}})();fetch("https://restcountries.com/v3.1/all").then(r=>r.json()).then(r=>{const t=document.getElementById("flagGrid");r.sort((n,o)=>n.name.common.localeCompare(o.name.common)).forEach(n=>{const o=document.createElement("a");o.href=`country.html?name=${n.name.common}`,o.innerHTML=`<img src="${n.flags.png}" alt="${n.name.common}" title="${n.name.common}" class="flag" />`,t.appendChild(o)})}).catch(r=>console.error("Error loading countries:",r));const m="f39143f6af2943898e57538f2d6d3de2";async function g({query:r,cuisine:t,diet:e}){const n=new URL("https://api.spoonacular.com/recipes/complexSearch");return n.searchParams.append("apiKey",m),r&&n.searchParams.append("query",r),t&&n.searchParams.append("cuisine",t),e&&n.searchParams.append("diet",e),n.searchParams.append("number",12),(await(await fetch(n)).json()).results}async function h(r){var o,c,s,l;if(!r)throw new Error("Country name or code is required");const t=`https://restcountries.com/v3.1/name/${encodeURIComponent(r)}?fullText=true`,e=await fetch(t);if(!e.ok)throw new Error(`Could not fetch facts for “${r}”`);const[n]=await e.json();return{name:((o=n.name)==null?void 0:o.common)??r,flag:((c=n.flags)==null?void 0:c.svg)||((s=n.flags)==null?void 0:s.png),capital:((l=n.capital)==null?void 0:l[0])??"—",region:n.region,subregion:n.subregion,population:n.population,currencies:n.currencies?Object.values(n.currencies).map(d=>d.name):[],languages:n.languages?Object.values(n.languages):[]}}async function f(r){if(!r)throw new Error("Recipe ID is required");const t=new URL(`https://api.spoonacular.com/recipes/${r}/information`);t.searchParams.append("apiKey",m);const e=await fetch(t);if(!e.ok)throw new Error(`Failed to fetch recipe with ID ${r}`);return e.json()}const v=new URLSearchParams(window.location.search),i=v.get("name"),a=document.getElementById("country-details"),y=document.getElementById("country-facts"),$=document.getElementById("country-recipes");if(!i)a.innerHTML="<p>Country not specified.</p>";else{document.getElementById("country-title").textContent+=i,fetch(`https://restcountries.com/v3.1/name/${i}?fullText=true`).then(t=>t.json()).then(t=>{var n;const e=t[0];a.innerHTML=`
        <h2>${e.name.common}</h2>
        <img src="${e.flags.svg}" alt="${e.name.common} Flag" id="country-flag" />
        <p><strong>Capital:</strong> ${((n=e.capital)==null?void 0:n[0])||"N/A"}</p>
        <p><strong>Region:</strong> ${e.region}</p>
        <p><strong>Population:</strong> ${e.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${e.languages?Object.values(e.languages).join(", "):"N/A"}</p>
        <p><strong>Currencies:</strong> ${e.currencies?Object.values(e.currencies).map(o=>o.name).join(", "):"N/A"}</p>
        <p><strong>Timezones:</strong> ${e.timezones.join(", ")}</p>
      `}).catch(t=>{console.error(t),a.innerHTML="<p>Error loading country data.</p>"}),h(i).then(t=>{y.innerHTML=`
      <h3>More Info:</h3>
      <img src="${t.flags.png}" alt="${t.name.common} flag" />
      <p><strong>Currency:</strong> ${t.currencies}</p>
      <p><strong>Capital:</strong> ${t.capital}</p>
      <p><strong>Population:</strong> ${t.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${t.region}</p>
    `}),g({cuisine:i}).then(t=>{$.innerHTML=t.slice(0,6).map(e=>`
      <div class="recipe-card">
        <h3>${e.title}</h3>
        <img src="${e.image}" alt="${e.title}" />
      </div>
    `).join("")});const r=countryFoods==null?void 0:countryFoods[i];r&&(a.innerHTML+=`
      <h3>Famous Foods</h3><ul>${r.map(t=>`<li>${t}</li>`).join("")}</ul>
    `)}(async function(){const t=new URLSearchParams(window.location.search).get("id");if(!t)return;const e=await f(t),n=document.getElementById("recipe-container");n.innerHTML=`
    <h1>${e.title}</h1>
    <img src="${e.image}" alt="${e.title}" />
    <h2>Ingredients:</h2>
    <ul>${e.extendedIngredients.map(o=>`<li>${o.original}</li>`).join("")}</ul>
    <h2>Instructions:</h2>
    <p>${e.instructions}</p>
  `})();const w="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='32'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20256'%3e%3cpath%20fill='%23F7DF1E'%20d='M0%200h256v256H0V0Z'%3e%3c/path%3e%3cpath%20d='m67.312%20213.932l19.59-11.856c3.78%206.701%207.218%2012.371%2015.465%2012.371c7.905%200%2012.89-3.092%2012.89-15.12v-81.798h24.057v82.138c0%2024.917-14.606%2036.259-35.916%2036.259c-19.245%200-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157%208.421%2011.859%2014.607%2023.715%2014.607c9.969%200%2016.325-4.984%2016.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044%2013.747-31.792%2035.228-31.792c15.294%200%2026.292%205.328%2034.196%2019.247l-18.732%2012.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046%200-11.514%204.468-11.514%2010.31c0%207.217%204.468%2010.14%2014.778%2014.608l6.014%202.577c20.45%208.765%2031.963%2017.7%2031.963%2037.804c0%2021.654-17.012%2033.51-39.867%2033.51c-22.339%200-36.774-10.654-43.819-24.574'%3e%3c/path%3e%3c/svg%3e",L="/vite.svg";function E(r){let t=0;const e=n=>{t=n,r.innerHTML=`count is ${t}`};r.addEventListener("click",()=>e(t+1)),e(0)}document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${L}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${w}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;E(document.querySelector("#counter"));document.querySelector(".hamburger").addEventListener("click",()=>{document.getElementById("menu").classList.toggle("show")});const p=document.getElementById("dietFilter"),u=document.getElementById("dietary-recipes-container");p.addEventListener("change",async()=>{const r=p.value;if(u.innerHTML="",!r)return;(await g({diet:r})).slice(0,3).forEach(e=>{u.innerHTML+=`
          <div class="recipe-card">
            <h3>${e.title}</h3>
            <img src="${e.image}" alt="${e.title}" />
          </div>
        `})});
