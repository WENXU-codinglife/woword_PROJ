import { useContext } from "react";
import { WordContext } from "../../contexts/word/word.context";
import './interactionZone.styles.scss';

const InteractionZone = () => {
    const { todaySearchedWords, addSearchedWord } = useContext(WordContext);

    return (
        <div className='interaction-zone-container'>
            {todaySearchedWords.map((word) => <span>{word}</span>)}
        </div>
    )
}

export default InteractionZone;