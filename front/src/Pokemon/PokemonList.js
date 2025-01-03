import React, { useState, useEffect, useCallback } from 'react';
import './PokemonList.sass';
import { Pokemon } from './Pokemon';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [useMysql, setUseMysql] = useState(false);
    const [useLocal, setUseLocal] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const filterPokemonsLocally = (filter) => {

        if (filter) {
            const filtered = pokemons.filter(pokemon =>
                pokemon.Name.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredPokemons(filtered);
        } else {
            setFilteredPokemons(pokemons);
        }
    };

    const fetchAndFilterPokemons = useCallback(async () => {
        let url = `${process.env.REACT_APP_BACK_API_URL}/pokemon/`;

        if (useMysql) {
            url += filterText ? `filter/${filterText}` : 'list';
        } else {
            url += filterText ? `filterMongo/${filterText}` : 'listMongo';
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            const pokemonInstances = data.map(item => new Pokemon({
                Id: item.Id || item.id,
                Name: item.Name || item.name,
                Image: item.Image || item.image,
                Type1: item.Type1 || item.type1,
                Type2: item.Type2 || item.type2,
                EvolutionFrom: item.EvolutionFrom || item.evolutionfrom
            }));
            setPokemons(pokemonInstances);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [useMysql, filterText]);

    useEffect(() => {


        if (!useLocal) {
            fetchAndFilterPokemons();
        }
    }, [useLocal, fetchAndFilterPokemons]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            if (name === 'local') {
                setUseLocal(checked);
                if (checked) {
                    filterPokemonsLocally(filterText);
                } else {
                    fetchAndFilterPokemons();
                }
            }
        } else if (type === 'text') {
            setFilterText(value);
            if (useLocal) {
                filterPokemonsLocally(value);
            }
        }
    };

    const handleToggle = () => {
        setUseMysql(!useMysql);
    };

    return (
        <div className="list">
            <button onClick={handleToggle}>
                {useMysql ? 'Usar MongoDB' : 'Usar MySQL'}
            </button>
            <input className='filtro' name="filter" type="text" placeholder="Filtra pokémon por nombre" onChange={handleChange} />
            <input type='checkbox' name="local" id="local" onChange={handleChange} />
            <label htmlFor="local">Filtrar resultados por JS</label>
            <div className='pokemon-grid-container'>
                {(useLocal ? filteredPokemons : pokemons).map(pokemon => (
                    <div key={pokemon.Id}> <PokemonCard pokemon={pokemon} /> </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;

