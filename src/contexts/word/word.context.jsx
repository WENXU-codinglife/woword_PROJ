import { createContext, useContext, useState } from "react";

export const WordContext = createContext({
    todaySearchedWords: [],
    setTodaySearchedWords: () => {},
    resetTodaySearchedWords: () => {},
    searchedWord: '',
    searchedWordDefinition: [],
    setSearchedWord: () => {},
    setSearchedWordDefinition: () => {},
})

export const WordProvider = ({children}) => {
    const [todaySearchedWords, setTodaySearchedWords] = useState([]);
    const [searchedWord, setSearchedWord] = useState('');
    const [searchedWordDefinition, setSearchedWordDefinition] = useState([]);
    const [conversationWords, setConversationWords] = useState(new Set());

    const addSearchedWord = (entry) => {
        if(entry === '' || todaySearchedWords.map(word => word.text).includes(entry))return;
        console.log(todaySearchedWords, entry);
        setTodaySearchedWords([
            ...todaySearchedWords, 
            {
                text: entry,
                searchedWordsPoolSelected: false,
                searchedWordsPoolMatched: false,
            }
        ]);
    }

    const resetTodaySearchedWords = () =>{
        const newArr = [];
        todaySearchedWords.forEach(word => {
            newArr.push({
                text: word.text,
                searchedWordsPoolSelected: false,
                searchedWordsPoolMatched: false,                
            });
        });
        setTodaySearchedWords(newArr);
    }

    const value = {
        todaySearchedWords,
        setTodaySearchedWords,
        resetTodaySearchedWords,
        addSearchedWord,
        searchedWord,
        setSearchedWord,
        searchedWordDefinition,
        setSearchedWordDefinition,
    }
    return <WordContext.Provider value={value}>{children}</WordContext.Provider>
}
