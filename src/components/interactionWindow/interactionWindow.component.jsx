import { useContext } from 'react';

import { UserContext } from '../../contexts/user/user.context';
import { InteractionModeContext } from '../../contexts/interactionMode/interactionMode.context';
import { INTERACTIONMODE } from '../../utils/titles/titles.utils';
import { INTERACTOINWINDOWTABS } from '../../utils/titles/titles.utils';
import './interactionWindow.styles.scss';

const InteractionWindow = () => {
    const { currentMode, setCurrentMode } = useContext(InteractionModeContext);
    
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


    return (
        <div className='interaction-window-container'>
            {Object.values(INTERACTOINWINDOWTABS).map((tab) => {
                return (
                    <div 
                        key={`${tab}`}
                        className='tab-container'
                        onClick={() => {
                            console.log(tab, ' is clicked');
                            tabClickHandler(tab);
                        }}
                    >
                        {tab}
                    </div>
                );
            })
            }
        </div>
    )
}

export default InteractionWindow;