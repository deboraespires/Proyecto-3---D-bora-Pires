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

const createSearch = async () => {
  try {
    const searchInput = document.getElementById("search");
    const searchQuery = searchInput.value.trim();

    if (searchQuery) {
      const gallery = document.querySelector("main");
      gallery.innerHTML = "";

      const response = await unsplash.search.getPhotos({ query: searchQuery, per_page: 50 });
      const images = response.response.results;

      images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description;
        gallery.appendChild(imgElement);
      });
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

const createFooter = () => {
  return '<h3>Proyecto 3 made by Débora Pires</h3>'
};

const printFooter = () => {
  document.querySelector("footer").innerHTML = createFooter();
};

printFooter();




