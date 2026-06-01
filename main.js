const adicionarPokemonForm = document.getElementById("adicionar-pokemon-form");
const cardsPokemon = document.getElementById("cards-pokemon");
const mensagem = document.getElementById("mensagem");
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

  adicionarPokemonForm.reset();

  if (nomePokemon === "") {
    mensagem.innerHTML = "Digite um nome válido.";
    mensagem.classList.add("erro");
    mensagem.classList.remove("sucesso");
    return;
  }

  if (nomesPokemonsAdicionados.includes(nomePokemon)) {
    mensagem.innerHTML = "Pokémon já adicionado.";
    mensagem.classList.add("erro");
    mensagem.classList.remove("sucesso");
    return;
  }

  const pokemon = await obterPokemon(nomePokemon);

  if (pokemon === null) {
    mensagem.innerHTML = "Pokémon não encontrado.";
    mensagem.classList.add("erro");
    mensagem.classList.remove("sucesso");
    return;
  }

  const pokemonId = "0000" + pokemon.id;
  let stats = "";

  for (pokemonStat of pokemon.stats) {
    stats += `<p class="capitalize">${pokemonStat.stat.name}: ${pokemonStat.base_stat}</p>`;
  }

  const cardPokemon = `
    <div class="card-pokemon">
        <h1 class="nome-pokemon">${pokemon.name}</h1>
        <img class="imagem-pokemon" src="${pokemon.sprites.front_default}" />
        ${stats}
        <p class="id-pokemon">N° ${pokemonId.slice(pokemonId.length - 4)}</p>
    </div>
  `;

  nomesPokemonsAdicionados.push(nomePokemon);

  cardsPokemon.innerHTML += cardPokemon;

  mensagem.innerHTML = "Pokémon adicionado com sucesso.";
  mensagem.classList.remove("erro");
  mensagem.classList.add("sucesso");
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
