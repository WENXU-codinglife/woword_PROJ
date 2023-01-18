import { useContext, useState } from "react";
import { WordContext } from "../../contexts/word/word.context";
import { dictionaryAPIUrlGen } from '../../utils/api/api.utils'

const SearchBar = () => {
    const [searchedWord, setSearchedWord] = useState('');
    const { todaySearchedWords, addSearchedWord } = useContext(WordContext);
    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setSearchedWord(value);
    }
    const searchHandler = () => {
        fetch(dictionaryAPIUrlGen(searchedWord))
        .then(response => response.json().then(data => {
            console.log(data);
            addSearchedWord(searchedWord);
            console.log(todaySearchedWords)
        }))
        .catch(error => console.log(error))
    }

    return (
        <div>
            <input 
                value={searchedWord}
                onChange={inputChangeHandler}
            />
            <button 
                type='submit' 
                onClick={searchHandler}
            > 
                Look up
            </button>
        </div>
    )
}

export default SearchBar;