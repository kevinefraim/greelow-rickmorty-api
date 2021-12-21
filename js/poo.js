const cardsContainer = document.querySelector("#cardsContainer");
const personajesArr = [];
const finder = document.querySelector("#finder");

//Clase personaje
class Personaje {
  constructor(nombre, status, especie, location, imagen) {
    this.nombre = nombre;
    this.status = status;
    this.especie = especie;
    this.location = location;
    this.imagen = imagen;
  }
  //Metodo para insertar datos en HTML
  mostrarPersonajes() {
    cardsContainer.innerHTML += `
                  <div class="card" style="width: 18rem">
            <img class="card-img-top" src="${this.imagen}" alt="${this.nombre}" />
            <div class="card-body">
              <h5 class="card-title">${this.nombre}</h5>
              <p class="card-text">${this.status} - ${this.especie}</p>
              <p class="card-text">Última ubicación conocida:<br><span class="fw-bold"> ${this.location}</span></p>
              
            </div>
            </div>
                  `;
  }
}
//Funcion de llamar metodo de la clase de objetos
const mostrarObj = (characters) =>
  characters.map((character) => character.mostrarPersonajes());

//Consumiendo API
const rickApi = async () => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/1,23,34,89,73,12,57,38,183"
  );
  const personajes = await response.json();
  personajes.map((personaje) => {
    //Instanciando objeto de personajes
    const characters = new Personaje(
      personaje.name,
      personaje.status,
      personaje.species,
      personaje.location.name,
      personaje.image
    );
    personajesArr.push(characters); //Insertando personajes en el array vacío
  });
  mostrarObj(personajesArr); //Llamando funcion que llama metodo de insertar en HTML
};

//funcion busqueda

const manejoBusqueda = () => {
  const charactersFilt = personajesArr.filter((personajeArr) =>
    personajeArr.nombre.toLowerCase().includes(finder.value.toLowerCase())
  );
  if (charactersFilt.length === 0) {
    return (cardsContainer.innerHTML = `<h3 class="text-center text-danger"> No existe un personaje con ese nombre</h3>`);
  }
  cardsContainer.innerHTML = "";
  mostrarObj(charactersFilt);
};

//Evento
window.onload = rickApi;
finder.addEventListener("keyup", manejoBusqueda);
