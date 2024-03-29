import { useContext } from "react";
import { WordContext } from "../../contexts/word/word.context";
import { UserContext } from "../../contexts/user/user.context";
import { dictionaryAPIUrlGen } from '../../utils/api/dictionaryAPI.utils'
import { createOrUpdateWordDocument } from "../../utils/firebase/firebase.utils";
import { wordResponseValidation } from "../../utils/dataManipulation/stringManipulation";
import { dictionaryApiReponseParser } from "../../utils/dataManipulation/stringManipulation";

import './searchBar.styles.scss';

const SearchBar = () => {
    const { currentUser } = useContext(UserContext);
    const {
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
        const thisSearchedWord = searchedWord.toLowerCase();
        fetch(dictionaryAPIUrlGen(thisSearchedWord))
        .then(response => response.json().then(data => {
            console.log(data);
            if(!wordResponseValidation(data)){
                alert('Oop! Please double check the word you typed!');
                return;
            }
            setSearchedWordDefinition(dictionaryApiReponseParser(data));
            addSearchedWord(thisSearchedWord);
            createOrUpdateWordDocument(thisSearchedWord, currentUser.uid);
        }))
        .catch(error => console.log(error))
    }

    return (
        <div className='search-bar-container'>
            <input 
                className='search-input-box'
                value={searchedWord}
                placeholder='Search a word'
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