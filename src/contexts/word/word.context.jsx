import { createContext, useContext, useState } from "react";

export const WordContext = createContext({
    todaySearchedWords: [],
    searchedWord: '',
    searchedWordDefinition: [],
    setSearchedWord: () => {},
    setSearchedWordDefinition: () =>{},
})

export const WordProvider = ({children}) => {
    const [todaySearchedWords, setTodaySearchedWords] = useState([]);
    const [searchedWord, setSearchedWord] = useState('');
    const [searchedWordDefinition, setSearchedWordDefinition] = useState([]);
    const addSearchedWord = (entry) => {
        if(entry === '' || todaySearchedWords.includes(entry))return;
        console.log(todaySearchedWords, entry);
        setTodaySearchedWords([...todaySearchedWords, entry]);
    }

    const value = {
        todaySearchedWords,
        addSearchedWord,
        searchedWord,
        setSearchedWord,
        searchedWordDefinition,
        setSearchedWordDefinition,
    }
    return <WordContext.Provider value={value}>{children}</WordContext.Provider>
}
