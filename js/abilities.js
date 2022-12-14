const pokemonAbilities = document.querySelector('#pokemonAbilities');

const mostrarHabilidades = (pokemon) => {
  pokemonAbilities.innerHTML= /*html*/`
  <div class="card border-danger bg-danger text-white" style="width: 18rem;">
  <img src="${mostrarImagenPokemon(pokemon.sprite)}" class="card-img-top" alt="Pokemon actual">
  <div class="card-body">
    <h5 class="card-title">${pokemon.Name.toUpperCase()}</h5>
  </div>
  <ul class="list-group list-group-flush">
    ${pokemon.Abilities.map(el=>listarHabilidades(el)).join('')}
  </ul>
    <div class="card-body bg-dark d-flex justify-content-evenly">
      <a href="./index.html" class="card-link text-decoration-none link-light fw-bold"><i class="bi bi-house-door"></i> Inicio</a>
    </div>
  </div>
  `
}

const mostrarImagenPokemon = (spriteData) => {
  if (!spriteData.dream_world.front_default && !spriteData.home.front_default) {
    return spriteData['official-artwork'].front_default;
  } else if(!spriteData.home.front_default){
    return spriteData.home.front_default
  } else {
    return spriteData.dream_world.front_default;
  }
}

const listarHabilidades = (habilidad) => {
  const nombreHabilidad = habilidad.ability.name;
  return `<li class="list-group-item border-danger list-group-item-action fw-bold">${nombreHabilidad}</li>`
}

const NoPokemonModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
  keyboard: false
})

if(localStorage.getItem("pokedesk")) {
  const pokemonLocal = localStorage.getItem("pokedesk");
  mostrarHabilidades(JSON.parse(pokemonLocal));
} else {
  NoPokemonModal.show()
}