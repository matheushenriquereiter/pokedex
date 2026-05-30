const adicionarPokemonForm = document.getElementById("adicionar-pokemon-form");
const cardsPokemon = document.getElementById("cards-pokemon");
const erroMensagem = document.getElementById("erro-mensagem");
const nomePokemonInput = document.getElementById("nome-pokemon-input");
const datalist = document.getElementById("sugestoes-pokemon");

const nomesPokemonsAdicionados = [];

async function carregarSugestoes() {
  const pokemons = await obterPokemons();

  for (pokemon of pokemons.results) {
    const nomePokemon = pokemon.name;

    const option = document.createElement("option");
    option.value = nomePokemon;
    datalist.appendChild(option);
  }
}
carregarSugestoes();

adicionarPokemonForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nomePokemon = adicionarPokemonForm.nomePokemon.value
    .trim()
    .toLowerCase();

  if (nomePokemon === "") {
    erroMensagem.innerHTML = "Digite um nome válido.";
    return;
  }

  adicionarPokemonForm.reset();

  if (nomesPokemonsAdicionados.includes(nomePokemon)) {
    erroMensagem.innerHTML = "Pokémon já adicionado.";
    return;
  }

  const pokemon = await obterPokemon(nomePokemon);

  if (pokemon === null) {
    erroMensagem.innerHTML = "Pokémon não encontrado.";
    return;
  }

  const pokemonId = "0000" + pokemon.id;

  const cardPokemon = `
    <div class="card-pokemon">
        <h1 class="nome-pokemon">${pokemon.name}</h1>
        <img class="imagem-pokemon" src="${pokemon.sprites.front_default}" />
        <p class="id-pokemon">N° ${pokemonId.slice(pokemonId.length - 4)}</p>
    </div>
  `;

  nomesPokemonsAdicionados.push(nomePokemon);
  cardsPokemon.innerHTML += cardPokemon;
  erroMensagem.innerHTML = "&nbsp;";
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
