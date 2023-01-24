import { useState } from "react";

import './interactionInputBox.styles.scss';

const InteractionInputBox = ({ okClickHandler, clearClickHandler, caption }) => {

    const [msgText, setMsgText] = useState('');
    const msgChangeHandler = (event) =>{
        const { value } = event.target;
        setMsgText(value);
    }
    const resetMsgText = () => {
        setMsgText('')
    }
    
    const localOkClickHander = () => {
        okClickHandler(msgText);
        resetMsgText();
    }

    return (
        <div className='interaction-input-box-container'>
            <div className='input-box-caption'>{caption}</div>
            <div className='input-box-wrapper'>
                <input 
                    className='msg-input'
                    onChange={msgChangeHandler}
                    value={msgText}
                />
                <button
                    className='msg-button'
                    onClick={localOkClickHander}
                >
                    OK
                </button>
                <button
                    className='msg-button'
                    onClick={clearClickHandler}            
                >
                    Clear
                </button>
            </div>
        </div>
    ) 
}

export default InteractionInputBox;