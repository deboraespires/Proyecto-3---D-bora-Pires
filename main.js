import './style.css'
import { createButton } from './src/components/button/button';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'SPcdH9_1hs9dPaLLUDozPlrNBjbPHChskzZEuZCCli8'
});

const createHeader = () => {
  return `
  <div>
    <img src="/public/assets/logo.png" alt="logo">
    ${createButton ({ text: "Explorar", bgColor: "var(--blue)" })}
    ${createButton({ text: "Limpiar búsqueda", bgColor: "var(--blue)", id: "clearButton" })}
  </div>
  <div>
    <input type="text" placeholder="¿Qué estás buscando?" id="search" class="buscador">
    <button class="search-button"><img src="/public/assets/lupa.png" alt="lupa"></button>
  </div>
  <div>
  ${createButton ({ text: "Login", bgColor: "var(--purple)" })}
  ${createButton ({ text: "Registrarse", bgColor: "var(--purple)" })}
  </div>
  `
};

const printHeader = () => {
  document.querySelector("header").innerHTML = createHeader();
};

printHeader();

const createGallery = async () => {
  try {
    const response = await unsplash.photos.list({ per_page: 50 });
    const images = response.response.results;

    const gallery = document.querySelector("main");

    images.forEach(image => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.regular;
      imgElement.alt = image.alt_description;
      gallery.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

createGallery();

const createErrorMessage = () => {
  const messageElement = document.createElement("p");
  messageElement.textContent = "😲 No se han encontrado resultados 😞";
  messageElement.classList.add("no-results");
  return messageElement;
};

const createSearch = async () => {
  try {
    const searchInput = document.getElementById("search");
    const searchQuery = searchInput.value.trim();
    const gallery = document.querySelector("main");
    gallery.innerHTML = "";

    if (searchQuery) {
      const response = await unsplash.search.getPhotos({ query: searchQuery, per_page: 50 });
      const images = response.response.results;

      if (images.length === 0) {
        gallery.appendChild(createErrorMessage());
      } else {
        images.forEach(image => {
          const imgElement = document.createElement("img");
          imgElement.src = image.urls.regular;
          imgElement.alt = image.alt_description;
          gallery.appendChild(imgElement);
        });
      }
    } else {
      createGallery();
    }
  } catch (error) {
    console.error("Error", error);
  }
};

const search = () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", createSearch);
};

search();

const clearSearch = () => {
  const clearSearchButton = document.querySelector("#clearButton");
  clearSearchButton.addEventListener("click", () => {
    location.reload();
  });
};

clearSearch();

const createFooter = () => {
  return '<h3>Proyecto 3 made by Débora Pires</h3>'
};

const printFooter = () => {
  document.querySelector("footer").innerHTML = createFooter();
};

printFooter();




