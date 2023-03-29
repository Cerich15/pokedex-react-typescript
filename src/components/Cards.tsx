import React
// {useEffect} 
from 'react';
import { useStyle } from '../hooks/useStyle';
import { pokemonsList, 
    // PokemonState 
} from '../state/reducer/pokemonReducer';
import { Link } from 'react-router-dom';
// import { useTypedSelector } from '../hooks/useTypeSelector';
import { useActions } from '../hooks/useActions';


export const Cards: React.FC<pokemonsList> = (results : pokemonsList) => {
    const classes = useStyle();
    // const state : PokemonState = useTypedSelector((state)=> state.pokemon);
    const { searchPokemon }  = useActions();
    

    const handleOpenPokemonPage = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.currentTarget as HTMLDivElement
        const id = element.id;
        searchPokemon(id);
        localStorage.setItem('selectedPokemon', id);
    };

    type PokemonProps = {
        url: string;
        name?: string;
    }

    const getID = (pokemon: PokemonProps) => {
        const {url} = pokemon
        return url && url.split("/")[6]
    }

    const getPokemonImage = (id: string) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }
    

    return (
       <>
        <div className={classes.cards} style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1em "}}>
                {
                    results.results?.map((pokemon, index) => {
                       return (
                        <div 
                            onClick={handleOpenPokemonPage}  
                            id={pokemon.name} key={index} className={classes.card} 
                            style={{display: "flex", flexDirection: "row", justifyContent: "center", position: "relative"}}>
                            <Link className={classes.cardLink} to={`/pokemon/${pokemon.name}`} >
                                <div className={classes.cardTitle}>
                                    {pokemon.name.toUpperCase()}
                                    <img alt="" id={'img'} 
                                        style={{width: "2.5em", height: "2.5em", position: "absolute", right: "1em", bottom: "0.9em"}} 
                                        src={getPokemonImage(getID(pokemon))}
                                    />
                                </div>
                            </Link>
                        </div>
                       )
                    })
                }
        </div>
       </>
    )
}
