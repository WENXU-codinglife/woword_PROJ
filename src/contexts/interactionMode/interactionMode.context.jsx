import { createContext, useState, useEffect, useContext } from "react";
import { INTERACTIONMODE } from '../../utils/titles/titles.utils';
import { WordContext } from "../word/word.context";


export const InteractionModeContext = createContext({
    setCurrentMode: () => {},
    currentMode: INTERACTIONMODE.DEFAULT,
  });
  
  export const InteractionModeProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState(INTERACTIONMODE.DEFAULT);
    const { resetTodaySearchedWords } = useContext(WordContext);
    const value = { currentMode, setCurrentMode };
  
    useEffect(() => {
        resetTodaySearchedWords();
    }, [currentMode]);
  
    return <InteractionModeContext.Provider value={value}>{children}</InteractionModeContext.Provider>;
  };