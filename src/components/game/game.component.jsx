import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user/user.context';
import ProfileIcon from '../../components/profileIcon/profileIcon.component';
import { GAMEPLAY, PROFILEIAMGESIZE } from '../../utils/titles/titles.utils';
import { dictionaryAPIUrlGen } from '../../utils/api/dictionaryAPI.utils';
import { wordResponseValidation } from '../../utils/dataManipulation/stringManipulation';
import { db, findOrCreateGame, pushMyWordAndNextWord } from '../../utils/firebase/firebase.utils';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import './game.styles.scss';
import { async } from '@firebase/util';

const Game = ({player, endGame, gameDocId}) => {
    const [nextWord, setNextWord] = useState('abcd');
    const [nextWordArray, setNextWordArray] = useState([]);
    const [myWord, setMyWord] = useState('wordo');
    const [myWordArray, setMyWordArray] = useState([]);
    const [commingWord, setCommingWord] = useState('woword');
    const [myWordLocked, setMyWordLocked] = useState(false);
    const [nextWordLocked, setNextWordLocked] = useState(false);
    const [values, loading, error] = useDocumentData(doc(db, 'games', gameDocId));
    const [opponent, setOpponent] = useState('/');


    const recievedWord = 'worwo'

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
        setMyWordArray(myWordArray.map((letter) => {
            if(letter.isFocused === 'focused')
                return {...letter, char:event.target.value};
            return {...letter}            
        }))
        setNextWordArray(nextWordArray.map((letter) => {
            if(letter.isFocused === 'focused')
                return {...letter, char:event.target.value};
            return {...letter}            
        }))
    };

    const myWordSubmitHandler = (event) => {
        event.preventDefault();
        const newMyWord = myWordArray.reduce((word, letter) => (
            word + letter.char
        ), '');
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
        const newNextWord = nextWordArray.reduce((word, letter) => (
            word + letter.char
        ), '');
        fetch(dictionaryAPIUrlGen(newNextWord.toLowerCase()))
        .then(response => response.json().then(data => {
            if(!wordResponseValidation(data)){
                alert('Oop! This seems like an unexistent word!');
                return;
            }
            setNextWord(true);
            setNextWord(newNextWord)
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
        setMyWordArray(myWord.split('').map((char, index) => ({
            char:' ',
            isFocused: 'unfocused',
            position: index,
        }))); 
    }, [myWord]);
    useEffect(() => {
        setNextWordArray(nextWord.split('').map((char, index) => ({
            char:'',
            isFocused: 'unfocused',
            position: index,
        }))); 
    }, [nextWord]);
    useEffect(() => {
        console.log(gameDocId);
        pushMyWordAndNextWord(myWord, nextWord, player, gameDocId);
    }, [nextWord]);
    useEffect(() => {
        if(values){
            if(values.guest !== opponent){ // 2 players matched, start the game
                console.log(opponent);
                setOpponent(values.guest);
            }else if(opponent !== '/'){ // during the game
                console.log(values);
                if((player === GAMEPLAY.HOST && values.history_player[values.history_player.length-1] === GAMEPLAY.GUEST) || (player === GAMEPLAY.GUEST && values.history_player[values.history_player.length-1] === GAMEPLAY.HOST)){
                    console.log(values.history_myWord[values.history_myWord.length-1], values.history_nextWord[values.history_nextWord.length-1]);
                    setCommingWord(values.history_myWord[values.history_myWord.length-1]);
                    setMyWord(values.history_nextWord[values.history_nextWord.length-1]);
                    setMyWordLocked(false);
                    setNextWordLocked(false);
                }
            }
        }
    },[values])
    return (
        opponent === '/'?
        <div>Waiting For Your Opponent</div>
        :
        <div className='game-container'>
            <div className='profiles-word-history-container'>
                <div className='profiles-container'>
                    <ProfileIcon size={PROFILEIAMGESIZE.X_LARGE}/>
                    <button className='operation-button' onClick={endGame}>Leave the Game</button>
                    <ProfileIcon size={PROFILEIAMGESIZE.X_LARGE}/>
                </div>
                <div className='word-history-container'>
                    {/* {wordHistory.map((word) => (
                        <div className='history-word'>{word}</div>
                    ))
                    } */}
                </div>
            </div>
            <div className='playground-container'>
                <div className='comming-word-row'>
                    <div className='comming-word'>
                        {
                            commingWord.split('').map((char, index) => 
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