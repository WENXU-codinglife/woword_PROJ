import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { WordContext } from "../../contexts/word/word.context";
import { InteractionModeAndDataContext } from "../../contexts/interactionModeAndData/interactionModeAndData.context";
import ProfileIcon from "../profileIcon/profileIcon.component";
import { openaiReply, openaiCorrection } from "../../utils/api/openaiAPI.utils";
import { INTERACTIONMODE } from "../../utils/titles/titles.utils";
import { INTERACTIONSPEAKER } from "../../utils/titles/titles.utils";
import './interactionDisplayBox.styles.scss';
import InteractionInputBox from "../interactionInputBox/interactionInputBox.component";

const InteractionDisplayBox = () => {
    const { currentMode } = useContext(InteractionModeAndDataContext);
    const { conversationMsgs } = useContext(InteractionModeAndDataContext);
    const { currentUser } = useContext(UserContext); 
    const { addConversationMsgs, resetConversationMsgs } = useContext(InteractionModeAndDataContext);

    const conversationOkClickHandler = async (msgText) => {
        if(!msgText) return;
        const aiCorrentionText = await openaiCorrection(msgText);
        console.log(msgText, aiCorrentionText);
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

    const conversationClearClickHandler = () => {
        resetConversationMsgs();
    }
    const conversationSection = () => {
        return (
            <div>
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
            </div>
        )        
    }

    console.log(conversationMsgs);
    let k = 0;
    return (
        <div className='interaction-display-container'>
            {
            currentMode === INTERACTIONMODE.CONVERSATIONMODE?
             conversationSection()
            : currentMode === INTERACTIONMODE.COMPOSERMODE?
            <div>composer</div>
            :
            <div>optimizer</div>
            }
            <InteractionInputBox 
                okClickHandler = {conversationOkClickHandler}
                clearClickHandler = {conversationClearClickHandler}
            />
        </div>
    )
}


export default InteractionDisplayBox;