import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pokemon } from './Pokemon';
import './PokemonDetail.sass';

const PokemonDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACK_API_URL}/pokemon/mongo/${id}`);
                const data = await response.json();
                const pokemonInstances = new Pokemon(data);
                setPokemon(pokemonInstances);
                console.log(pokemonInstances);
            } catch (error) {
                console.error('Error al cargar pokemons:', error);
            }
        };

        fetchPokemon();
    }, [id]);

    const handleClick = () => {
        navigate(`/pokemon/list`);
    };

    if (!pokemon) {
        return <div>Cargando el pokemon con el id {id}... </div>;
    }
    return (
        <div>
            <div className="pokemon-details respirable">
                <div className="pokemon-image-container">
                    <img src={pokemon.Image} alt={pokemon.Name} className="pokemon-image" />
                    <div className="pokemon-id">ID / {pokemon.Id}</div>
                </div>
                <div className="pokemon-info-container">
                    <div className="pokemon-info">
                        <h2>{pokemon.Name}</h2>
                        <p><span className={"type " + pokemon.Type1}><b>{pokemon.Type1.toUpperCase()}</b> </span> <span className={"type " + pokemon.Type2}><b>{pokemon.Type2.toUpperCase()}</b></span></p>
                        <div className='evolution-container'>
                            {pokemon.EvolutionFrom ? (
                                <p className='evolution'>Evoluciona de: <br /> <b> {pokemon.EvolutionFrom} </b></p>
                            ) : (
                                <p className='evolution'><b> Forma base</b> </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <button className='back-to-list' onClick={handleClick}>Volver al listado</button>
        </div>
    );
};

export default PokemonDetails;