const { MongoClient } = require('mongodb');

const url = 'mongodb://jbvc91:ICy89kEfX5PaP3ij@192.168.3.200:27017/';
const dbName = 'dex'; // Replace with your database name
const client = new MongoClient(url);

async function fetchPokemonDetails(url) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();
    return {
        Id: data.id,
        Name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        Image: data.sprites.front_default,
        Type1: data.types[0]?.type.name || '',
        Type2: data.types[1]?.type.name || '',
        EvolutionFrom: data.species.url // This will be used to fetch evolution details
    };
}

async function fetchEvolutionDetails(url) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();
    const evolutionChainUrl = data.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();
    const chain = evolutionData.chain;

    let evolutionFrom = null;
    let currentSpecies = chain;

    while (currentSpecies) {
        if (currentSpecies.species.name === data.name) {
            break;
        }
        if (currentSpecies.evolves_to.length > 0) {
            evolutionFrom = currentSpecies.species.name.charAt(0).toUpperCase() + currentSpecies.species.name.slice(1);
            currentSpecies = currentSpecies.evolves_to[0];
        } else {
            currentSpecies = null;
        }
    }

    return evolutionFrom;
}

async function fetchPokemons() {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokemons = await Promise.all(data.results.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.url);
        const evolutionFrom = await fetchEvolutionDetails(details.EvolutionFrom);
        details.EvolutionFrom = evolutionFrom === details.Name ? null : evolutionFrom;
        return details;
    }));
    return pokemons;
}

async function populateDatabase() {
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('Pokemons');

        // Drop the collection if it exists
        await collection.drop().catch(err => {
            if (err.codeName !== 'NamespaceNotFound') {
                throw err;
            }
        });

        // Recreate the collection
        await db.createCollection('Pokemons');

        const pokemons = await fetchPokemons();
        const result = await collection.insertMany(pokemons);
        console.log(`${result.insertedCount} pokemons inserted`);
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        await client.close();
    }
}

populateDatabase();