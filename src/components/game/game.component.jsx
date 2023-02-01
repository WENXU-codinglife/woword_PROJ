import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user/user.context';
import ProfileIcon from '../../components/profileIcon/profileIcon.component';
import { GAMEPLAY, PROFILEIAMGESIZE } from '../../utils/titles/titles.utils';
import { dictionaryAPIUrlGen } from '../../utils/api/dictionaryAPI.utils';
import { oneLetterDiff, wordResponseValidation } from '../../utils/dataManipulation/stringManipulation';
import { db, findOrCreateGame, pushMyWordAndNextWord } from '../../utils/firebase/firebase.utils';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import './game.styles.scss';
import { async } from '@firebase/util';
import { randomWordGen } from '../../utils/api/openaiAPI.utils';

const Game = ({player, endGame, gameDocId}) => {
    const [nextWord, setNextWord] = useState('WAIT');
    const [nextWordArray, setNextWordArray] = useState([]);
    const [myWord, setMyWord] = useState('WAIT');
    const [myWordArray, setMyWordArray] = useState([]);
    const [comingWord, setComingWord] = useState('');
    const [myWordLocked, setMyWordLocked] = useState(false);
    const [nextWordLocked, setNextWordLocked] = useState(false);
    const [values, loading, error] = useDocumentData(doc(db, 'games', gameDocId));
    const [opponent, setOpponent] = useState('/');
    const [wordHistory, setWordHistory] = useState([]);

    const letterKeys = [
        { char: 'A' },
        { char: 'B' },
        { char: 'C' },
        { char: 'D' },
        { char: 'E' },
        { char: 'F' },
        { char: 'G' },
        { char: 'H' },
        { char: 'I' },
        { char: 'J' },
        { char: 'K' },
        { char: 'L' },
        { char: 'M' },
        { char: 'N' },
        { char: 'O' },
        { char: 'P' },
        { char: 'Q' },
        { char: 'R' },
        { char: 'S' },
        { char: 'T' },
        { char: 'U' },
        { char: 'V' },
        { char: 'W' },
        { char: 'X' },
        { char: 'Y' },
        { char: 'Z' },
    ]

    const myWordClickHandler = (event) => {
        event.preventDefault();
        if(myWordLocked)return;
        const letterObj = JSON.parse(event.target.dataset.object);
        setMyWordArray(myWordArray.map((letter, index) => {
            if(index !== letterObj.position)
                return {...letter, isFocused:'unfocused'};
            return {...letter, isFocused:'focused'}
        }))
        setNextWordArray(nextWordArray.map((letter) => (
            {
                ...letter,
                isFocused:'unfocused',
            }
        )));
    };
    const nextWordClickHandler = (event) => {
        event.preventDefault();
        if(nextWordLocked)return;
        const letterObj = JSON.parse(event.target.dataset.object);
        setNextWordArray(nextWordArray.map((letter, index) => {
            if(index !== letterObj.position)
                return {...letter, isFocused:'unfocused'};
            return {...letter, isFocused:'focused'}
        }))
        setMyWordArray(myWordArray.map((letter) => (
            {
                ...letter,
                isFocused:'unfocused',
            }
        )));
    };
    const keyOnClickHandler = (event) => {
        event.preventDefault();
        let index = -1;
        setMyWordArray(myWordArray.map((letter, idx) => {
            if(letter.isFocused === 'focused' && index === -1){
                index = idx + 1;
                return {...letter, char:event.target.value, isFocused:'unfocused'};
            }else if (idx === index){
                return {...letter, isFocused: 'focused'}
            }
            return {...letter}            
        }))
        index = -1;
        setNextWordArray(nextWordArray.map((letter, idx) => {
            if(letter.isFocused === 'focused'){
                index = idx + 1;
                return {...letter, char:event.target.value, isFocused:'unfocused'};
            }else if (idx === index) {
                return {...letter, isFocused: 'focused'}
            }
            return {...letter}            
        }))
    };

    const myWordSubmitHandler = (event) => {
        event.preventDefault();
        if(myWordLocked)return;
        const newMyWord = myWordArray.reduce((word, letter) => (
            word + letter.char
            ), '');
        console.log(newMyWord, comingWord);
        if(!oneLetterDiff(comingWord, newMyWord)){
            console.log(comingWord, newMyWord);
            alert(`Your word should have exactly one letter difference than the coming one!\n${comingWord}, ${newMyWord}`);
            return;
        }
        fetch(dictionaryAPIUrlGen(newMyWord.toLowerCase()))
        .then(response => response.json().then(data => {
            if(!wordResponseValidation(data)){
                alert('Oop! This seems like an unexistent word!');
                return;
            }
            setMyWordLocked(true);
            setMyWord(newMyWord);
        }))
        .catch(error => console.log(error))
    }
    const nextWordSubmitHandler = (event) => {
        event.preventDefault();
        if(nextWordLocked)return;
        const newNextWord = nextWordArray.reduce((word, letter) => (
            word + letter.char
        ), '');
        if(!oneLetterDiff(myWord, newNextWord)){
            alert('Your word should have exactly one letter difference than the previous one!');
            return;
        }
        fetch(dictionaryAPIUrlGen(newNextWord.toLowerCase()))
        .then(response => response.json().then(data => {
            if(!wordResponseValidation(data)){
                alert('Oop! This seems like an unexistent word!');
                return;
            }
            setNextWord(true);
            setNextWord(newNextWord);
            setNextWordLocked(true);
            pushMyWordAndNextWord(myWord, newNextWord, player, gameDocId);
        }))
    }

    const incrementHandler = (event) => {
        event.preventDefault();
        setNextWordArray((myWord+' ').split('').map((char, index) => ({
            char:' ',
            isFocused: 'unfocused',
            position: index,            
        })));
    }

    const decrementHandler = (event) => {
        event.preventDefault();
        setNextWordArray(myWord.slice(0,-1).split('').map((char, index) => ({
            char:' ',
            isFocused: 'unfocused',
            position: index,            
        })));        
    }

    const replaceHandler = (event) => {
        event.preventDefault();
        setNextWordArray(myWord.split('').map((char, index) => ({
            char:' ',
            isFocused: 'unfocused',
            position: index,            
        })));          
    }


    useEffect(() => {
        if(values){
            if(values.guest !== opponent){ // 2 players matched, start the game
                console.log(opponent);
                setOpponent(values.guest);
            }
            console.log(values);
            if(wordHistory[wordHistory.length-1] !== values.history_player[values.history_player.length-1])
                setWordHistory(wordHistory.concat([{
                    player: values.history_player[values.history_player.length-1],
                    word: values.history_myWord[values.history_myWord.length-1],
                }]));            
            if((player === GAMEPLAY.HOST && values.history_player[values.history_player.length-1] === GAMEPLAY.GUEST) || (player === GAMEPLAY.GUEST && values.history_player[values.history_player.length-1] === GAMEPLAY.HOST)){
                console.log(values.history_myWord[values.history_myWord.length-1], values.history_nextWord[values.history_nextWord.length-1]);
                setComingWord(values.history_myWord[values.history_myWord.length-1]);
                setMyWord(values.history_nextWord[values.history_nextWord.length-1]);
                setMyWordArray(values.history_nextWord[values.history_nextWord.length-1].split('').map((char, index) => ({
                    char:' ',
                    isFocused: 'unfocused',
                    position: index,
                })));
                setMyWordLocked(false);
                setNextWordArray(nextWord.split('').map((char, index) => ({
                    char:'',
                    isFocused: 'unfocused',
                    position: index,
                }))); 
                setNextWordLocked(false);
            }
            
        }
    },[values])
    return (
        opponent === '/'?
        <span>Waiting For Your Opponent</span>
        :
        <div className='game-container'>
            <div className='profiles-word-history-container'>
                <div className='profiles-container'>
                    <ProfileIcon size={PROFILEIAMGESIZE.X_LARGE}/>
                    <button className='operation-button' onClick={endGame}>Leave the Game</button>
                    <ProfileIcon size={PROFILEIAMGESIZE.X_LARGE}/>
                </div>
                <div className='word-history-container'>
                    <div className='host-word-history'>
                        {
                            wordHistory.map((word) => {
                                if(word.player === GAMEPLAY.HOST)return <div>{word.word}</div>;
                            })
                        }
                    </div>
                    <span>{values.history_player[values.history_player.length-1] === GAMEPLAY.GUEST? GAMEPLAY.HOST.toUpperCase():GAMEPLAY.GUEST.toUpperCase()}'s turn</span>
                    <div className='guest-word-history'>
                    {
                            wordHistory.map((word) => {
                                if(word.player === GAMEPLAY.GUEST)return <div>{word.word}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='playground-container'>
                <div className='coming-word-row'>
                    <div className='coming-word'>
                        {
                            comingWord.split('').map((char, index) => 
                            <button
                                key={index}
                                className = 'letter-key unfocused unkey'
                                value={char}                            
                            >
                                {char}
                            </button>)
                        }
                    </div>
                    <div>00:30</div>
                </div>
                <div className='my-word-row'>
                    <div className='my-word'>
                    {
                        myWordArray.map((letter , index) => 
                        <button
                            key={index}
                            className = {`letter-key ${letter.isFocused} unkey`}
                            data-object={JSON.stringify(letter)} 
                            onClick={myWordClickHandler}
                            disabled={myWordLocked}
                        >
                            {letter.char}
                        </button>)
                    }
                    </div>
                    <button className='operation-button' onClick={myWordSubmitHandler}>Submit</button>
                </div>
                <div className='operation-buttons-row'>
                    <button className='operation-button' onClick={incrementHandler}>Increment</button>
                    <button className='operation-button' onClick={decrementHandler}>Decrement</button>
                    <button className='operation-button' onClick={replaceHandler}>Replace</button>
                </div>
                <div className='next-word-row'>
                    <div className='next-word'>
                        {
                            nextWordArray.map((letter , index) => 
                            <button
                                key={index}
                                className = {`letter-key ${letter.isFocused} unkey`}
                                data-object={JSON.stringify(letter)} 
                                onClick={nextWordClickHandler}
                                disabled={nextWordLocked}
                            >
                                {letter.char}
                            </button>)
                        }
                        
                    </div>
                    <button className='operation-button' onClick={nextWordSubmitHandler}>Submit</button>
                </div>
                <div className='keyboard'>
                    {
                        letterKeys.map((char) => 
                        <button
                            key={char.char}
                            className = 'letter-key unfocused key'
                            value={char.char}
                            onClick={keyOnClickHandler}
                        >
                            {char.char}
                        </button>)
                    }
                </div>
            </div>

        </div>
        
    )
}

export default Game;