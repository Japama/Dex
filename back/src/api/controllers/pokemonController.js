const pokemonRepository = require('../../repositories/pokemonRepository');
const pokemonMongoRepository = require('../../repositories/pokemonMongoRepository');


const getPokemon = async (req, res) => {
    try {
        const pokemonId = req.params.id;
        const pokemon = await pokemonRepository.getPokemonById(pokemonId);
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).send('Pokémon no encontrado');
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener Pokémon', error: err });
    }
};

const getPokemons = async (req, res) => {
    try {
        const pokemons = await pokemonRepository.getPokemonList();
        res.json(pokemons);
    } catch (err) {
        console.error('Error al obtener pokemons:', err);
        res.status(500).json({ message: 'Error al obtener pokemons' });
    }
};

const filterPokemons = async (req, res) => {
    try {
        const filter = req.params.filter;
        const pokemons = await pokemonRepository.getPokemonFilter(filter);
        res.json(pokemons);
    } catch (err) {
        console.error('Error al obtener pokemons:', err);
        res.status(500).json({ message: 'Error al obtener pokemons' });
    }
};

const getPokemonMongo = async (req, res) => {
    try {
        const pokemonId = req.params.id;
        const pokemons = await pokemonMongoRepository.getPokemonById(pokemonId);
        res.json(pokemons);
    } catch (err) {
        console.error('Error al obtener pokemons:', err);
        res.status(500).json({ message: 'Error al obtener pokemons' });
    }
};

const getPokemonsMongo = async (req, res) => {
    try {
        const pokemons = await pokemonMongoRepository.getPokemonList();
        res.json(pokemons);
    } catch (err) {
        console.error('Error al obtener pokemons:', err);
        res.status(500).json({ message: 'Error al obtener pokemons' });
    }
};

const filterPokemonsMongo = async (req, res) => {
    try {
        const filter = req.params.filter;
        const pokemons = await pokemonMongoRepository.getPokemonFilter(filter);
        res.json(pokemons);
    } catch (err) {
        console.error('Error al obtener pokemons:', err);
        res.status(500).json({ message: 'Error al obtener pokemons' });
    }
};

module.exports = { getPokemons, getPokemon, filterPokemons, getPokemonsMongo, getPokemonMongo, filterPokemonsMongo };