const results = document.querySelector('#results');
const LoadingComponent = document.querySelector('#LoadingComponent');
const searchForm = document.querySelector('#searchForm');
const search = document.querySelector('#search');

const URL = `https://pokeapi.co/api/v2/pokemon/`;

class pokeResult {
  
  constructor(name,type,abilities,movements,stats,sprite){
    this.Name = name
    this.Type = type
    this.Abilities = abilities
    this.Movements = movements
    this.Stats = stats
    this.sprite = sprite
  }
}

const showPokemon = (resPokemon) => {
  results.innerHTML = /*html*/`
  <img src=${mostrarImagenPokemon(resPokemon.sprite)} class="card-img-top" alt="Pokemon actual">
  <div class="card-body">
    <h4 class="card-title text-center" id="name">${resPokemon.Name.toUpperCase()}</h4>
  </div>
  <ul class="list-group list-group-flush" id="stats">
    <li class="list-group-item border-danger d-flex justify-content-around align-items-start fw-bold">Tipo <span class="badge rounded-pill bg-dark">${resPokemon.Type}</span></li>
    ${resPokemon.Stats.map(el=>mostrarStats(el)).join('')}
  </ul>
  <div class="card-body bg-dark d-flex justify-content-evenly">
    <a href="./moves.html" class="card-link text-decoration-none link-light fw-bold"><i class="bi bi-person-lines-fill"></i> Movimientos</a>
    <a href="./abilities.html" class="card-link text-decoration-none link-light fw-bold">Habilidades <i class="bi bi-stars"></i></a>
  </div>
  `

}

const mostrarImagenPokemon = (spriteData) => {
  if (spriteData.dream_world.front_default) {
    return spriteData.dream_world.front_default;
  }
  return spriteData.home.front_default;
}

const mostrarStats = (listaStats) => {
  const nombreStat = listaStats.stat.name;
  const valorStat = listaStats.base_stat;
  return `<li class="list-group-item border-danger d-flex justify-content-between align-items-start fw-bold">
            ${nombreStat}: <span class="fw-light">${valorStat}</span>
          </li>`
}

if(localStorage.getItem("pokedesk")) {
  const pokemonLocal = localStorage.getItem("pokedesk");
  showPokemon(JSON.parse(pokemonLocal));
}

const pokeSearch = async (search) => {

  const endpoint = `${URL}${search}`;
  
  try {
    LoadingComponent.classList.remove('d-none');
    results.classList.add('d-none');
    const response = await fetch(endpoint);
    if(response.ok){
      const data = await response.json();
      const resPokemon = new pokeResult(
        data.name,
        data['types'][0]['type'].name,
        data['abilities'],
        data['moves'],
        data['stats'],
        data["sprites"]["other"]
      )
      localStorage.setItem("pokedesk",JSON.stringify(resPokemon))
      showPokemon(resPokemon)
      return resPokemon;
    }
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      LoadingComponent.classList.add('d-none');
      results.classList.remove('d-none');
    }, 1000);
  }
  
}



const NombreExp = /((^\d{1,4}$)|(^[A-Za-z]{3,})$)/;

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(search.value.trim()==='')return;
  if(!NombreExp.test(search.value)) return;
  pokeSearch(search.value);
});