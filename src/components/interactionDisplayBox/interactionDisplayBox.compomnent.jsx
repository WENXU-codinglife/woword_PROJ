import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { WordContext } from "../../contexts/word/word.context";
import { InteractionModeAndDataContext } from "../../contexts/interactionModeAndData/interactionModeAndData.context";
import ProfileIcon from "../profileIcon/profileIcon.component";
import { openaiReply, openaiCorrection, openaiComposer } from "../../utils/api/openaiAPI.utils";
import { INTERACTIONMODE, INTERACTIONSPEAKER } from "../../utils/titles/titles.utils";
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

    const addConversationMsgs = (Msgs) => {
        setConversationMsgs(conversationMsgs.concat(Msgs));
    }
    const resetConversationMsgs = () => {
        setConversationMsgs([{speaker: INTERACTIONSPEAKER.AI, text:'Hello! How can I help you?'}]);
    }

    const conversationOkClickHandler = async (msgText) => {
        if(!msgText) return;
        const aiCorrentionText = await openaiCorrection(msgText);
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

    const ClearClickHandler = () => {
        resetConversationMsgs();
        resetComposerContent();
    }
    const conversationSection = () => {
        return (
            <div className='interaction-display-container'>
                <div className='info-button-wrapper'>
                    <InfoButton infoContent={CAPTIONS.INTERACTIONINPUTCAPTIONS.CONVERSATIONMODE}/>
                </div>
                {conversationMsgs.map((msg) => (
                    <div
                        key = {k++}
                        className={`conversation-message-wrapper ${msg.speaker}`}
                    >
                        {msg.speaker === INTERACTIONSPEAKER.AI? <ProfileIcon /> : null}
                        <div 
                            className={`conversation-message-container ${msg.speaker}`}
                        >
                            {msg.text}
                        </div>
                        {msg.speaker === INTERACTIONSPEAKER.AI? null : <ProfileIcon user = {currentUser}/>}
                    </div>
                ))}
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
                {composerContent}
                <InteractionInputBox 
                    okClickHandler = {composerOkClickHandler}
                    clearClickHandler = {ClearClickHandler}
                    caption = {CAPTIONS.INTERACTIONINPUTCAPTIONS.COMPOSERMODE}
                />
            </div>
        )
    }
    let k = 0;
    return (
        currentMode === INTERACTIONMODE.CONVERSATIONMODE?
            conversationSection()
        : currentMode === INTERACTIONMODE.COMPOSERMODE?
            composerSection()
        :
        <div>optimizer</div>
    )
}


export default InteractionDisplayBox;