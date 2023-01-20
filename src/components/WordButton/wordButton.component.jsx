import { useContext } from 'react';
import { WordContext } from '../../contexts/word/word.context';
import { InteractionModeContext } from '../../contexts/interactionMode/interactionMode.context';
import { INTERACTIONMODE } from '../../utils/titles/titles.utils';
import iconThumbsUp from '../../assets/icon/like.png';
import iconCheckMark from '../../assets/icon/check.png';
import './wordButton.styles.scss';

const WordButton = ( {word} ) => {
    const { text, searchedWordsPoolSelected, searchedWordsPoolMatched } = word;
    const { todaySearchedWords, setTodaySearchedWords } = useContext(WordContext);
    const { currentMode } = useContext(InteractionModeContext);

    const onClickHandler = () => {
        console.log('button onClickHandler');
        if ( currentMode === INTERACTIONMODE.COMPOSERMODE ){
            const newArr = [];
            todaySearchedWords.forEach((wd) => {
                wd.text === word.text ? 
                newArr.push({...word, searchedWordsPoolSelected:!word.searchedWordsPoolSelected}) 
                :
                newArr.push(word);
            })
            setTodaySearchedWords(newArr);
        }
    }
    return (
        <div className='word-button-container' onClick={onClickHandler}>
            <div className='word-button-text'>{text}</div>
            {currentMode === INTERACTIONMODE.CONVERSATIONMODE && searchedWordsPoolMatched?
                <div className='word-button-state-icon'>
                    <img className='thumbsup-icon' src={iconThumbsUp} />
                </div>
            : currentMode === INTERACTIONMODE.COMPOSERMODE && searchedWordsPoolSelected?
                <div className='word-button-state-icon'>
                    <img className='thumbsup-icon' src={iconCheckMark} />
                </div>                
            :   null
            }  
        </div>
    )
}

export default WordButton;