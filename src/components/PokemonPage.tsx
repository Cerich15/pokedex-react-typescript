import { Button, Container } from '@material-ui/core';
import React from 'react'
import { useStyle } from '../hooks/useStyle'
import { useTypedSelector } from '../hooks/useTypeSelector';
import { PokemonState } from '../state/reducer/pokemonReducer';
import { useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import ModalPage from './ModalPage';
import "./module.css"
import { Link } from 'react-router-dom';
import pikachuGif from "../images/loading.gif"

const PokemonPage: React.FC = () => {
    const { searchPokemon }  = useActions();
    const classes : any = useStyle();
    const state : PokemonState = useTypedSelector((state)=> state.pokemon);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [abilityUrl, setAbilityUrl] = useState<string>('');


    const handelBackButton = (e : React.MouseEvent<HTMLButtonElement>) => {
        if(localStorage.getItem('selectedPokemon')){
            localStorage.removeItem('selectedPokemon');
            window.location.replace(`/`);
        }else{
            window.location.replace(`/`);
        }
    }

    const handleOpenModal = (e: React.MouseEvent<HTMLDivElement>) =>{
        const element = e.currentTarget as HTMLDivElement
        const id = element.id;
        console.log(id);
        setAbilityUrl(id);
        setOpenModal(true);
    }

    const handleCloseModal = () =>{
        setAbilityUrl('');
        setOpenModal(false)
    }

    useEffect(() => {
        if(localStorage.getItem('selectedPokemon')){
            const name: string | null = localStorage.getItem('selectedPokemon');
            searchPokemon(name);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    type classTypeProps = {
        name: string;
    }

    const pokemonTypes = ['grass', 'fire', 'water', 'poison', 'ground', 'rock', 'steel', 'ice', 'electric', 'dragon', 'ghost', 'psychic', 'fighting', 'bug', 'flying', 'dark', 'fairy', 'normal']

    const getClassType = (types: classTypeProps) => {
        const selectedTypes = {name: ''}
        pokemonTypes.map(p => types.name === p &&
            Object.assign(selectedTypes , {name:(`pokemonTypeCard${types.name.charAt(0).toUpperCase() + types.name.substring(1)}`)}))
        
        return selectedTypes.name && selectedTypes.name
    }
    
    return (
        <>
        <Container className={classes.container} maxWidth={'lg'}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
                <Link className='tm-logo' to='/'>
                    <span className={classes.logo}>
                        PokeDex
                    </span>
                </Link>
                <img src={pikachuGif} alt='' style={{width: "40px", height: "40px"}}/>
            </div>
            <Button onClick={handelBackButton} id="back-btn" className={classes.pokemonBackBtn} >BACK</Button>
        </div>
        
         <div className={classes.pokemonHeader}>
                 <h1 className={classes.pokemonPokemon}>{state.data.name.toUpperCase()}</h1>
                 <div className={classes.pokemonTypeCards}>
                     {
                         state.data.types.map((type) =>{ 
                             return(
                                
                                 <div key={type.slot} className={
                                    classes[getClassType(type.type)]
                                }>
                                     <h3>{type.type.name.toUpperCase()}</h3>
                                     {console.log(getClassType(type.type), "<<<<<here")}
                                 </div>
                             )
                         })
                     }
                 </div>
         </div>
         <div id={'imgCon'} className={classes.pokemonImgContainer}>
             <img alt="" id={'img'} className={classes.pokemonImg} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.data.id}.png`}/>
             <div className={classes.pokemonBody}>
                 {
                     state.data.stats.map((stat , index)=>{
                         return(
                             <div key={index} className={classes.pokemonBodyStatsCard}>
                                 <div className={classes.pokemonBodyStatsCardTitle}>
                                     {stat.stat.name.toUpperCase()}
                                 </div>
                                 <div className={classes.pokemonBodyStatsCardBody}>
                                     {stat.base_stat}
                                 </div>
                             </div>
                         )
                     })
                 }
             </div>
         </div>
         <div className={classes.pokemonFooter}>
                 <div className={classes.pokemonFooterTitle}>
                     ABILITIES
                 </div>
                 <div className={classes.pokemonCardsCon}>
                 {state.data.abilities.map((ability) => {
                     return(
                         <div key={ability.slot} onClick={handleOpenModal} id={ability.ability.url} className={classes.pokemonCards}>
                                 {ability.ability.name.toUpperCase()}
                         </div>
                     )
                 })}
                 </div>
         </div>
        </Container>
        {
            openModal && <ModalPage openModal={openModal} abilityUrl={abilityUrl} handleCloseModal={handleCloseModal} />
        }
        </>
    )
}

export default PokemonPage
