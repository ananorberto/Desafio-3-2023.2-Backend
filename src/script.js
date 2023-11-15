//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

// Daqui para baixo voce ira escrever
// o código para resolver o desafio

const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292";
let pokemons = [];
let currentPokemon = 0;

async function fetchData(url) {
  const resultData = await fetch(url);
  return await resultData.json();
}

async function fetchPokemons() {
  const resultData = await fetchData(apiUrl);
  pokemons = resultData.results;
}

async function updatePokemon() {
  const { url, name } = pokemons[currentPokemon];
  const { sprites } = await fetchData(url);
  changeImage("img_sprite_front_default", sprites.front_default);
  changeText("name", name);
}

async function previousPokemon() {
  if (pokemons.length === 0) await fetchPokemons();
  currentPokemon = (currentPokemon - 1 + pokemons.length) % pokemons.length;
  await updatePokemon();
}

async function nextPokemon() {
  if (pokemons.length === 0) await fetchPokemons();
  currentPokemon = (currentPokemon + 1) % pokemons.length;
  await updatePokemon();
}
