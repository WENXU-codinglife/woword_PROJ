import { createContext, useState, useEffect, useContext } from "react";
import { INTERACTIONMODE, INTERACTIONSPEAKER } from '../../utils/titles/titles.utils';
import { WordContext } from "../word/word.context";


export const InteractionModeAndDataContext = createContext({
    currentMode: INTERACTIONMODE.DEFAULT,
    setCurrentMode: () => {},
    conversationMsgs: [],
    addConversationMsgs: (msg) => {},
    resetConversationMsgs: () => {},
  });

  const DEFAULT_PROMPT = {
      speaker: INTERACTIONSPEAKER.AI,
      text: 'Hi, how can I help you!',
  };
  
  export const InteractionModeAndDataProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState(INTERACTIONMODE.DEFAULT);
    const [conversationMsgs, setConversationMsgs] = useState([DEFAULT_PROMPT]);
    const { resetTodaySearchedWords } = useContext(WordContext);
    
    const addConversationMsgs = (msgs) => {
      setConversationMsgs(conversationMsgs.concat(msgs));
    } 
    const resetConversationMsgs = () => {
      setConversationMsgs([DEFAULT_PROMPT]);
    }
    
    
    const value = { 
      currentMode, 
      setCurrentMode, 
      conversationMsgs, 
      setConversationMsgs, 
      addConversationMsgs, 
      resetConversationMsgs 
    };
    useEffect(() => {
        resetTodaySearchedWords();
        resetConversationMsgs();
    }, [currentMode]);


  
    return <InteractionModeAndDataContext.Provider value={value}>{children}</InteractionModeAndDataContext.Provider>;
  };