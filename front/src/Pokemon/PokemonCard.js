import React, { useState } from 'react';
import './PokemonCard.sass';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        setIsActive(true);
        setTimeout(() => {
            navigate(`/pokemon/${pokemon.Id}`);
        }, 400);
    };

    return (
        <div className={`pokemon-card ${isActive ? 'pokemon-card-active' : ''}`} onClick={handleClick}>
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
    );
};

export default PokemonCard;