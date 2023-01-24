import { useContext } from 'react';

import { UserContext } from '../../contexts/user/user.context';
import { InteractionModeAndDataContext } from '../../contexts/interactionModeAndData/interactionModeAndData.context';
import { INTERACTIONMODE } from '../../utils/titles/titles.utils';
import { INTERACTOINWINDOWTABS } from '../../utils/titles/titles.utils';
import { openaiReply } from '../../utils/api/openaiAPI.utils';
import './interactionWindow.styles.scss';
import InteractionDisplayBox from '../interactionDisplayBox/interactionDisplayBox.compomnent';
const InteractionWindow = () => {
    const { currentMode, setCurrentMode } = useContext(InteractionModeAndDataContext);
    
    const tabClickHandler = (mode) => {
        if (mode === INTERACTOINWINDOWTABS.AICONVERSATION)
            setCurrentMode(INTERACTIONMODE.CONVERSATIONMODE);
        else if (mode === INTERACTOINWINDOWTABS.AICOMPOSER)
            setCurrentMode(INTERACTIONMODE.COMPOSERMODE);
        else if (mode === INTERACTOINWINDOWTABS.AIOPTIMIZER)
            setCurrentMode(INTERACTIONMODE.OPTIMIZERMODE);
        else
            console.error('Interaction Mode Selection Error');
    }

    const isSelectedTab = (tab) => {
        if (
            (tab === INTERACTOINWINDOWTABS.AICONVERSATION && currentMode === INTERACTIONMODE.CONVERSATIONMODE)
            || (tab === INTERACTOINWINDOWTABS.AICOMPOSER && currentMode === INTERACTIONMODE.COMPOSERMODE)
            || (tab === INTERACTOINWINDOWTABS.AIOPTIMIZER && currentMode === INTERACTIONMODE.OPTIMIZERMODE)
        ) return 'selected';
        return 'unselected';
    }

    return (
        <div className='interaction-window-container'>
            <div className='interaction-window-tabs-container'>
            {Object.values(INTERACTOINWINDOWTABS).map((tab) => {
                return (
                    <div 
                        key={`${tab}`}
                        className={`tab-container ${isSelectedTab(tab)} `}
                        onClick={() => {
                            tabClickHandler(tab);
                        }}
                    >
                        {tab}
                    </div>
                );
            })}
            </div>
            <div className='interaction-display-input-wrapper'>
                <InteractionDisplayBox />
            </div>
            
        </div>
    )
}

export default InteractionWindow;