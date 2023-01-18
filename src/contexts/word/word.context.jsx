import { createContext, useContext, useState } from "react";

export const WordContext = createContext({
    todaySearchedWords: [],
})

export const WordProvider = ({children}) => {
    const [todaySearchedWords, setTodaySearchedWords] = useState([]);
    const addSearchedWord = (entry) => {
        if((todaySearchedWords.includes(entry)))return;
        console.log(todaySearchedWords, entry);
        setTodaySearchedWords([...todaySearchedWords, entry]);
    }

    const value = {
        todaySearchedWords,
        addSearchedWord,
    }
    return <WordContext.Provider value={value}>{children}</WordContext.Provider>
}
