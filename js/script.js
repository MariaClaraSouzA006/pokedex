const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return null;
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.style.display = 'block';
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        pokemonImage.src = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = input.value.trim().toLowerCase();
    if (!isNaN(inputValue) || /^[a-zA-Z]+$/.test(inputValue)) {
        renderPokemon(inputValue);
    } else {
        pokemonName.innerHTML = 'Invalid input :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);