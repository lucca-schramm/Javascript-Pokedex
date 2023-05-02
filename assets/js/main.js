const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const limit=5;
let offset=0;

function loadPokemonItems(offset, limit){
    PokeApi.getPokemons(offset, limit).then((pokemons= [])=>{
        const newHtml=pokemons.map((pokemon)=>`
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">${pokemon.types.map((res) => {return `<li class="type ${res}">${res}</li>`}).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>`)
            .join('')
        pokemonList.innerHTML+=newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click',()=>{
    offset += limit
    loadPokemonItems(offset, limit)
})