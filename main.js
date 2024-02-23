document.addEventListener('DOMContentLoaded', function() {
    loadPokemon();
});

function loadPokemon() {
    fetch('pmlist.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // This line will print the data to the console

            const pokemonList = document.getElementById('pokemonList');
            data.forEach(pokemon => {
                const col = document.createElement('div');
                col.className = 'col-md-3';

                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-id', pokemon.dex);

                const img = document.createElement('img');
                img.className = 'card-img-top';
                img.src = `pokemon/pokemon_icon_${pokemon.dex}_00.png`;

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const title = document.createElement('h5');
                title.className = 'card-title';
                title.textContent = `#${pokemon.dex} - ${pokemon.name.en}`; 

                const text = document.createElement('p');
                text.className = 'card-text';
                text.textContent = `Family: ${pokemon.family}`; 

                const button = document.createElement('button');
                button.className = 'btn btn-primary';
                button.textContent = 'Save / Unsave';
                button.onclick = function() { markAsOwned(pokemon.dex); };

                cardBody.appendChild(title);
                cardBody.appendChild(text);
                cardBody.appendChild(button);

                card.appendChild(img);
                card.appendChild(cardBody);

                col.appendChild(card);

                pokemonList.appendChild(col);
            });
        });
}

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