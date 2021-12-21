const cardsContainer = document.querySelector("#cardsContainer");
const finder = document.querySelector("#finder");

//Funcion mostrar personajes
const mostrarPersonajes = (characters) => {
  characters.map((personaje) => {
    cardsContainer.innerHTML += `
          <div class="card" style="width: 18rem">
    <img class="card-img-top" src="${personaje.image}" alt="${personaje.name}" />
    <div class="card-body">
      <h5 class="card-title">${personaje.name}</h5>
      <p class="card-text">${personaje.status} - ${personaje.species}</p>
      <p class="card-text">Última ubicación conocida:<br><span class="fw-bold"> ${personaje.location.name}</span></p>
      
    </div>
    </div>
          `;
  });
};

//Consumiendo API
const rickApi = async () => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/2,1,3,9,4,7,5,8,6"
  );
  const personajes = await response.json();
  mostrarPersonajes(personajes);
};

rickApi();
