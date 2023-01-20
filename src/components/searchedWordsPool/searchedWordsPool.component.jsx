import { useContext } from 'react';
import { WordContext } from '../../contexts/word/word.context';
import WordButton from '../WordButton/wordButton.component';
import './searchedWordsPool.styles.scss';

const SearchedWordsPool = () =>{
    const { todaySearchedWords } = useContext(WordContext);

    return (
        <div className='searched-words-pool-container'>
            <span className='searched-words-pool-title'>You searched these words today:</span>
            <div className='searched-words-container'>
                {todaySearchedWords.map((word) => (
                    <WordButton key={word.text} word={word} />
                ))}
            </div>
        </div>
    )
}

export default SearchedWordsPool;