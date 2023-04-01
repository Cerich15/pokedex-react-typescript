import React from 'react';
import { 
    // Button, 
    TextField } from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search';
import { useStyle } from '../hooks/useStyle';
import "./module.css";

interface SearchbarProps{
    name: string;
    handleSearch:(e: React.MouseEvent<HTMLButtonElement>) => void ;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void ;
}

const Searchbar: React.FC<SearchbarProps> = ({name,handleChange,handleSearch}:SearchbarProps) => {
    const classes = useStyle();
    return (
        <div className={classes.inputDiv}>
                <TextField className={classes.searchInput} variant={'outlined'} onChange={handleChange} value={name} label={'Search Pokemon'}/>
                <button 
                    className="search-btn" 
                    onClick={handleSearch}
                >
                        <SearchIcon/>
                </button>
        </div>
    )
}

export default Searchbar
