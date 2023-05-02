const PokeApi={}

function convertPokeApiDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number=pokeDetail.id
    pokemon.name= pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types=types
    pokemon.type=type

    pokemon.photo=pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=>response.json())
        .then(convertPokeApiDetail)
}

PokeApi.getPokemons = (offset=0, limit=5)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    return fetch(url)
        .then((res)=>res.json())
        .then((jsonBody)=> jsonBody.results)
        .then((pokemons)=>pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequest)=> Promise.all(detailRequest))
        .then((pokemonDetail)=> pokemonDetail)}
