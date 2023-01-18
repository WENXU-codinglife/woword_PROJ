import { useContext } from "react";
import { WordContext } from "../../contexts/word/word.context";

const InteractionZone = () => {
    const { todaySearchedWords, addSearchedWord } = useContext(WordContext);

    return (
        <div>
            {todaySearchedWords.map((word) => <span>{word}</span>)}
        </div>
    )
}

export default InteractionZone;