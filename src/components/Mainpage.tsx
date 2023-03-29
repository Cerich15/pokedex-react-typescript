import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useStyle } from '../hooks/useStyle';
import { useTypedSelector } from '../hooks/useTypeSelector';
import React from 'react';
import {Cards} from './Cards';
import { pokemons, PokemonState } from '../state/reducer/pokemonReducer';
import Buttons from './Buttons';
import Searchbar from './Searchbar';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import pikachuGif from "../images/loading.gif"
import Footer from './Footer';

const Mainpage : React.FC = () => {
    const classes = useStyle();
    const [name, setName] = useState<string>('');
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isPrev, setIsPrev] = useState<boolean>(false);
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<string | null>('https://pokeapi.co/api/v2/pokemon/');
    const [results, setResults] = useState<[{ name: string, url: string}]>();
    const [openLoading, setOpenLoading] = useState<boolean>(false);
    const { searchPokemon }  = useActions();
    const state : PokemonState = useTypedSelector((state)=> state.pokemon);

    const getPokemonsData = async() =>{
        const {data}: pokemons = await axios.get(`${currentPage}`);
        setResults(data.results);
        if(data.next){
            setIsNext(true);
            setNextPage(data.next);
        }else{
            setIsNext(false);
        }

        if(data.previous){
            setIsPrev(true);
            setPrevPage(data.previous);
        }else{
            setIsPrev(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
    }
    
    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) =>{
        if (!name) {
            
        } else {
            searchPokemon(name);
        }

        if(state.loading === true || state.loading === false){
            setOpenLoading(true);
        }
    }

    const handleCloseLoading = () => {
        setOpenLoading(false);
        setName('');
    };

    const handlePages = (e: React.MouseEvent<HTMLButtonElement>) => {
        const element = e.currentTarget as HTMLButtonElement
        const id = element.id
        if(id === 'next'){
            setCurrentPage(`${nextPage}`);
            localStorage.setItem('currentPage', nextPage);
        }else{
            setCurrentPage(`${prevPage}`);
            localStorage.setItem('currentPage', prevPage);
        }
    }


    useEffect(()=>{
        if(localStorage.getItem('currentPage')){
            const locationPage = localStorage.getItem('currentPage')
            setCurrentPage(locationPage);
        }

        getPokemonsData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])
    return (
        <>
            <Container className={classes.container} maxWidth={'lg'}>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <span className={classes.logo}>PokeDex</span>
                  <img src={pikachuGif} alt='' style={{width: "40px", height: "40px"}}/>
                </div>
                <Searchbar name={name} handleChange={handleChange} handleSearch={handleSearch}/>

                <div className={classes.cardsContainer}>
                    {
                        results && (
                            <Cards results={results}/>
                        )
                    }
                </div>
                <Buttons isNext={isNext} isPrev={isPrev} handlePages={handlePages} />
                <Footer text="Reach me out @" url='https://www.linkedin.com/in/spencer-castro-65288715b/'/>
            </Container>
            <LoadingPage openLoading={openLoading} handleCloseLoading={handleCloseLoading}/>
        </>
    )
}

export default Mainpage;
