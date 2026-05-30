const adicionarPokemonForm = document.getElementById("adicionar-pokemon-form");
const cardsPokemon = document.getElementById("cards-pokemon");
const erroMensagem = document.getElementById("erro-mensagem");

adicionarPokemonForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nomePokemon = adicionarPokemonForm.nomePokemon.value
    .trim()
    .toLowerCase();

  if (nomePokemon === "") {
    erroMensagem.innerHTML = "Digite um nome válido";
    return;
  }

  const pokemon = await obterPokemon(nomePokemon);

  if (pokemon === null) {
    erroMensagem.innerHTML = "Pokémon não encontrado";
    return;
  }

  const cardPokemon = `
    <div>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}" />
    </div>
  `;

  cardsPokemon.innerHTML += cardPokemon;
  erroMensagem.innerHTML = "";
});

async function obterPokemon(nomePokemon) {
  const rotaApi = "https://pokeapi.co/api/v2/pokemon/" + nomePokemon;

  try {
    const resposta = await fetch(rotaApi, {
      method: "GET",
    });

    if (!resposta.ok) {
      return null;
    }

    const pokemon = await resposta.json();

    return pokemon;
  } catch (erro) {
    return null;
  }
}

/*
async function obterPokemons() {
  const rotaApi = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  try {
    const resposta = await fetch(rotaApi, {
      method: "GET",
    });

    if (!resposta.ok) {
      return null;
    }

    const pokemon = await resposta.json();

    return pokemon;
  } catch (erro) {
    return null;
  }
}
*/
