const createPokemonCard = (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon__card")

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("pokemon__info");

    const name = document.createElement("h2");
    name.classList.add("pokemon__name");
    name.textContent = pokemon.name;

    const typesDiv = document.createElement("div");
    typesDiv.classList.add("pokemon__types");

    const typesTitle = document.createElement("span");
    typesTitle.classList.add("types__title");
    typesTitle.textContent = "Types";

    pokemon.types.forEach(type => {
        const typeSpan = document.createElement("span");
        typeSpan.classList.add("pokemon__type", type.type.name);
        typeSpan.textContent = type.type.name;
        typesDiv.appendChild(typeSpan);
    });

    const abilitiesTitle = document.createElement("span");
    abilitiesTitle.classList.add("abilities__title");
    abilitiesTitle.textContent = "Abilities";

    const abilitiesDiv = document.createElement("div");
    abilitiesDiv.classList.add("pokemon__abilities");

    pokemon.abilities.forEach(ability => {
        const abilitySpan = document.createElement("span");
        abilitySpan.classList.add("pokemon__abilities", ability.ability.name);
        abilitySpan.textContent = ability.ability.name;
        abilitiesDiv.appendChild(abilitySpan);
    });

    infoDiv.appendChild(name);
    infoDiv.appendChild(typesTitle);
    infoDiv.appendChild(typesDiv);
    infoDiv.appendChild(abilitiesTitle)
    infoDiv.appendChild(abilitiesDiv);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("pokemon__imageContainer");

    const image = document.createElement("img");
    image.classList.add("pokemon__image");
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;

    imageContainer.appendChild(image);

    card.appendChild(infoDiv);
    card.appendChild(imageContainer)

    return card;
}

const loadPokemons = async () => {
    const pokemonGrid = document.getElementById("pokemon__grid");
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit: 50}});
        const pokemons = response.data.results;

        pokemonGrid.innerHTML = "";

        for(const pokemon of pokemons) {
            const detailsResponse = await axios.get(pokemon.url);
            const pokemonCard = createPokemonCard(detailsResponse.data);
            pokemonGrid.appendChild(pokemonCard);
        }
    } catch (error) {
        console.log("Error de Fetch:", error);
    }
}

document.addEventListener("DOMContentLoaded",loadPokemons);

const searchPokemon = async () => {
    const pokemonName = document.getElementById("pokemon__search").value.toLowerCase();
    console.log(`El nombre del pokemos es ${pokemonName}`)
    if(pokemonName) {
        console.log(pokemonName)
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonGrid = document.getElementById("pokemon__grid");
            pokemonGrid.innerHTML = "";
            const pokemonCard = createPokemonCard(response.data);
            pokemonGrid.appendChild(pokemonCard);
        } catch (error) {
            console.log("Error al buscar el Pokemon:", error);
        }
    }
};

document.getElementById("search__button").addEventListener("click", searchPokemon);
document.getElementById("pokemon__search").addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
        searchPokemon();
    }
})


