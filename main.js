// Befehl LoadPokemon() wird ausgeführt, sobald die Seite geladen ist.
document.addEventListener('DOMContentLoaded', function() {
    loadPokemon().then(() => {
        showSelectedPokemons();
    });
});

// Deklaration der Variablen für die Filter und Suche
// Erklärung: This JavaScript code is using the document.getElementById() method to select HTML elements by their ID and assign them to variables. This is often done so that you can later manipulate these elements or their contents using JavaScript.

const pokemonList = document.getElementById('pokemonList')
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const languageFilter = document.getElementById('languageFilter');

// Eventlistener für die Filter und Suche
searchInput.addEventListener('keyup', filterPokemon);
typeFilter.addEventListener('change', filterPokemon);

// Daten aus JSON der Pokemon in Javaskript speichern
let pokemonData = [];
const loadPokemon = () => {
    fetch('pmlist.json')
    .then(response => response.json())
        .then(data => {
            console.log(data);
            pokemonData = data; 
            pokemonData.forEach(pokemon => createPokemonCard(pokemon));
        })
        .catch(error => console.error('Error fetching Pokemon data: ', error));
};

const createPokemonCard = (pokemon) => {        
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const selectedPokemons = JSON.parse(localStorage.getItem('selectedPokemons')) || {};

    const isChecked = selectedPokemons.hasOwnProperty(pokemon.dex);
    const isSelectedClass = isChecked ? 'selected' : '';

    const currentLanguage = languageFilter.value; // Aktuell ausgewählte Sprache
    const name = pokemon.name[currentLanguage]; // Name des Pokemons in der aktuellen Sprache
    const id = pokemon.dex.toString().padStart(3, '0');

    const poke_types = pokemon.types;
    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const imagePath = `Bilder/pokemon_icon_${id}_00.png`;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="${imagePath}" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    <small class="select-label">
        <input type="checkbox" class="select-pokemon" data-dex="${pokemon.dex}"${isChecked ? ' checked' : ''}>owns
    </small>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    if(isSelectedClass){
        pokemonEl.classList.add('owned'); // Füge der Pokemon-Karte die Klasse owned hinzu
    }
    pokemonList.appendChild(pokemonEl);
};


function markAsOwned(pokemonId) {
    const card = document.querySelector(`[data-id="${pokemonId}"]`);
    localStorage.setItem(pokemonId, 'owned');
    card.classList.add('owned');
}

function filterPokemon() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.parentNode.style.display = title.includes(input) ? '' : 'none';
    });
}

// Speichere die ausgewählten Pokemon in localStorage
const saveSelectedPokemons = (dex, isSelected) => {
    let selectedPokemons = JSON.parse(localStorage.getItem('selectedPokemons')) || {};

    if (isSelected){
        selectedPokemons[dex] = isSelected;
    } else {
        delete selectedPokemons[dex];
    }
    localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons));
};

// Funktion, um die ausgewählten Pokemon zu zeigen
languageFilter.addEventListener('change', () => {
    // Wenn sich die Sprache ändert, müssen die Pokemon-Karten neu erstellt werden
    poke_container.innerHTML = '';
    pokemonData.forEach(pokemon => createPokemonCard(pokemon));
});


const showSelectedCheckbox = document.getElementById('showSelected');
showSelectedCheckbox.addEventListener('change', showSelectedPokemons);
