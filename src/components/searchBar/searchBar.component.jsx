import { useContext, useState } from "react";
import { WordContext } from "../../contexts/word/word.context";
import { dictionaryAPIUrlGen } from '../../utils/api/api.utils'
import { wordResponseValidation } from "../../utils/dataManipulation/stringManipulation";
import { dictionaryApiReponseParser } from "../../utils/dataManipulation/stringManipulation";
import './searchBar.styles.scss';

const SearchBar = () => {
    const { todaySearchedWords, 
        addSearchedWord, 
        searchedWord, 
        setSearchedWord,
        setSearchedWordDefinition,
    } = useContext(WordContext);
    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setSearchedWord(value);
    }
    const searchHandler = () => {
        fetch(dictionaryAPIUrlGen(searchedWord))
        .then(response => response.json().then(data => {
            if(!wordResponseValidation(data)){
                console.log('wrong word!');
                return;
            }
            setSearchedWordDefinition(dictionaryApiReponseParser(data));
            addSearchedWord(searchedWord);
        }))
        .catch(error => console.log(error))
    }

    return (
        <div className='search-bar-container'>
            <input 
                className='search-input-box'
                value={searchedWord}
                onChange={inputChangeHandler}
            />
            <button 
                className='search-button'
                type='submit' 
                onClick={searchHandler}
            > 
                Look up
            </button>
        </div>
    )
}

export default SearchBar;