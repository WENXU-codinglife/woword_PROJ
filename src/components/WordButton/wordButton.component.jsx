import { useContext } from 'react';
import { WordContext } from '../../contexts/word/word.context';
import { InteractionModeAndDataContext } from '../../contexts/interactionModeAndData/interactionModeAndData.context';
import { INTERACTIONMODE } from '../../utils/titles/titles.utils';
import iconThumbsUp from '../../assets/icon/like.png';
import iconCheckMark from '../../assets/icon/check.png';
import './wordButton.styles.scss';

const WordButton = ( {word} ) => {
    const { text, searchedWordsPoolSelected, searchedWordsPoolMatched } = word;
    const { todaySearchedWords, setTodaySearchedWords } = useContext(WordContext);
    const { currentMode } = useContext(InteractionModeAndDataContext);

    const onClickHandler = () => {
        console.log('button onClickHandler');
        if ( currentMode === INTERACTIONMODE.COMPOSERMODE ){
            const newArr = todaySearchedWords.map((wd) => {
                return wd.text === word.text ? 
                {...wd, searchedWordsPoolSelected:!wd.searchedWordsPoolSelected}
                :
                wd;
            })
            setTodaySearchedWords(newArr);
        }
    }

    return (
        <div className='word-button-container' onClick={onClickHandler}>
            <div className='word-button-text'>{text}</div>
            {currentMode === INTERACTIONMODE.CONVERSATIONMODE && searchedWordsPoolMatched?
                <div className='word-button-state-icon'>
                    <img className='thumbsup-icon' src={iconThumbsUp} alt='' />
                </div>
            : currentMode === INTERACTIONMODE.COMPOSERMODE && searchedWordsPoolSelected?
                <div className='word-button-state-icon'>
                    <img className='thumbsup-icon' src={iconCheckMark} alt='' />
                </div>                
            :   null
            }  
        </div>
    )
}

export default WordButton;