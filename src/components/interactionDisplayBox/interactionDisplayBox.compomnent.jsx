import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { WordContext } from "../../contexts/word/word.context";
import { InteractionModeAndDataContext } from "../../contexts/interactionModeAndData/interactionModeAndData.context";
import ProfileIcon from "../profileIcon/profileIcon.component";
import { openaiReply, openaiComposer, openaiOptimizer } from "../../utils/api/openaiAPI.utils";
import { INTERACTIONMODE, INTERACTIONSPEAKER, PROFILEIAMGESIZE } from "../../utils/titles/titles.utils";
import InteractionInputBox from "../interactionInputBox/interactionInputBox.component";
import { CAPTIONS } from "../../utils/titles/titles.utils";
import './interactionDisplayBox.styles.scss';
import InfoButton from "../infoButton/infoButton.component";

const InteractionDisplayBox = () => {
    const { currentMode } = useContext(InteractionModeAndDataContext);
    const [conversationMsgs, setConversationMsgs] = useState([{speaker: INTERACTIONSPEAKER.AI, text:'Hello! How can I help you?'}]);
    const { currentUser } = useContext(UserContext); 
    const { todaySearchedWords, setTodaySearchedWords } = useContext(WordContext);
    const [composerContent, setComposerContent] = useState('');
    const [optimizerContent, setOptimizerContent] = useState([]);

    const addConversationMsgs = (Msgs) => {
        setConversationMsgs(conversationMsgs.concat(Msgs));
    }
    const resetConversationMsgs = () => {
        setConversationMsgs([{speaker: INTERACTIONSPEAKER.AI, text:'Hello! How can I help you?'}]);
    }

    const conversationOkClickHandler = async (msgText) => {
        if(!msgText) return;
        // const aiCorrentionText = await openaiCorrection(msgText);
        addConversationMsgs([
            {
                speaker: INTERACTIONSPEAKER.USER, 
                text: msgText
            },
        ]);

        const newTodaySearchedWords = todaySearchedWords.map((word) => {
            const msg = msgText.toLowerCase().split(' ');
            for (let piece of msg) {
                if (piece.includes(word.text)){
                    return {
                        ...word,
                        searchedWordsPoolMatched: true
                    }
                }
            }
            return word;
        })
        setTodaySearchedWords(newTodaySearchedWords);


        // if (!stringComparison(msgText, aiCorrentionText)){
        //     addConversationMsgs([
        //         {
        //             speaker: INTERACTIONSPEAKER.USER, 
        //             text: msgText,
        //             isCorrect: 'Oops! You have some mistake(s) in the above message.',

        //         }
        //     ]);
        // }else{
        const aiResponseText = await openaiReply(msgText);
        addConversationMsgs([
            {
                speaker: INTERACTIONSPEAKER.USER, 
                text: msgText
            },
            {
                speaker: INTERACTIONSPEAKER.AI,
                text: aiResponseText
            }
        ]);
        // }
    }

    const composerOkClickHandler = async () => {
        console.log(todaySearchedWords);
        const selected = todaySearchedWords.reduce((selectedWords, word) => {
            if (word.searchedWordsPoolSelected){
                return selectedWords += '\''+ word.text + '\', ';
            }
            return selectedWords;
        }, '');
        console.log(selected);
        const aiComposerResponseText = await openaiComposer(selected);
        setComposerContent(aiComposerResponseText);
    }

    const resetComposerContent = () => {
        setComposerContent('');
    }
    const resetOptimizerContent = () => {
        setComposerContent([]);
    }

    const ClearClickHandler = () => {
        resetConversationMsgs();
        resetComposerContent();
        resetOptimizerContent();
    }

    const optimizerOkClickHandler = async (msgText) => {
        if(!msgText)return;
        setOptimizerContent(optimizerContent.concat([msgText]));
        const aiOptimizerResponseText = await openaiOptimizer(msgText);
        setOptimizerContent(optimizerContent.concat([aiOptimizerResponseText]));
    }
    const conversationSection = () => {
        return (
            <div className='interaction-display-container'>
                <div className='info-button-wrapper'>
                    <InfoButton infoContent={CAPTIONS.INTERACTIONINPUTCAPTIONS.CONVERSATIONMODE}/>
                </div>
                <div className='message-box'>
                {conversationMsgs.map((msg,index) => (
                    <div
                        key = {index}
                        className={`conversation-message-wrapper ${msg.speaker}`}
                    >
                        {msg.speaker === INTERACTIONSPEAKER.AI? <ProfileIcon size={PROFILEIAMGESIZE.X_SMALL}/> : null}
                        <div 
                            className={`conversation-message-container ${msg.speaker}`}
                        >
                            {msg.text}
                        </div>
                        {msg.speaker === INTERACTIONSPEAKER.AI? null : <ProfileIcon size={PROFILEIAMGESIZE.X_SMALL} user = {currentUser}/>}
                    </div>
                ))}
                </div>
                <InteractionInputBox 
                    okClickHandler = {conversationOkClickHandler}
                    clearClickHandler = {ClearClickHandler}
                    caption = {CAPTIONS.INTERACTIONINPUTCAPTIONS.CONVERSATIONMODE}
                />
            </div>
        )        
    }
    const composerSection = () => {
        return (
            <div className='interaction-display-container'>
                <div className='info-button-wrapper'>
                    <InfoButton infoContent={CAPTIONS.INTERACTIONINPUTCAPTIONS.COMPOSERMODE}/>
                </div>
                <div className='message-box'>{composerContent}</div>
                <InteractionInputBox 
                    okClickHandler = {composerOkClickHandler}
                    clearClickHandler = {ClearClickHandler}
                    caption = {CAPTIONS.INTERACTIONINPUTCAPTIONS.COMPOSERMODE}
                />
            </div>
        )
    }
    const optimizerSection = () => {
        return (
            <div className='interaction-display-container'>
                <div className='info-button-wrapper'>
                    <InfoButton infoContent={CAPTIONS.INTERACTIONINPUTCAPTIONS.OPTIMIZERMODE}/>
                </div>
                <div className='message-box'>
                    {optimizerContent.map((msg,index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <InteractionInputBox 
                    okClickHandler = {optimizerOkClickHandler}
                    clearClickHandler = {ClearClickHandler}
                    caption = {CAPTIONS.INTERACTIONINPUTCAPTIONS.OPTIMIZERMODE}
                />
            </div>            
        )
    }
    return (
        currentMode === INTERACTIONMODE.CONVERSATIONMODE?
            conversationSection()
        : currentMode === INTERACTIONMODE.COMPOSERMODE?
            composerSection()
        : currentMode === INTERACTIONMODE.OPTIMIZERMODE?
            optimizerSection()
        : null
    )
}


export default InteractionDisplayBox;