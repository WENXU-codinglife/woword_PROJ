import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user/user.context';
import ProfileIcon from '../../components/profileIcon/profileIcon.component';
import { PROFILEIAMGESIZE } from '../../utils/titles/titles.utils';
import { dictionaryAPIUrlGen } from '../../utils/api/dictionaryAPI.utils';
import { wordResponseValidation } from '../../utils/dataManipulation/stringManipulation';
import { db, findOrCreateGame, pushMyWordAndNextWord } from '../../utils/firebase/firebase.utils';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import './gameEntrance.styles.scss';
import { async } from '@firebase/util';
import Game from '../../components/game/game.component';

const GameEntrance = () => {
    const { currentUser } = useContext(UserContext)
    const [gameDocId, setGameDocId] = useState('');
    const [player, setPlayer] = useState('');


    const startHandler = async (event) => {
        event.preventDefault();
        const { player, gameId } = await findOrCreateGame(currentUser.uid);
        setPlayer(player);
        setGameDocId(gameId);
    }

    const endGameHandler = () => {
        setGameDocId('');
    }
    return (
        // <div className='game-container'>
            gameDocId?
                <Game
                    player={player}
                    gameDocId={gameDocId}
                    endGame = {endGameHandler}
                />
            :
                <div className='game-entrance-container'>
                    <button className='operation-button' onClick={startHandler} disabled={!currentUser}>Start A Game</button>
                    <span>
                        This is a simple word game that has 2 player involved: a host and a guest. Each player has a
                        a turn to come up a new word based on the previous word that is given by the opponent. The new
                        word has to have exactly 1 letter different from the given one. The game is like this:
                        <li>A player recieves a word and 2 lines of empty boxes for 2 derived words. 
                            The first derived word should fit the number of boxes and have exactyly 
                            1 letter different from the given one. For example, the recieved word is 'SOUTH', 
                            and the first line has 5 boxes. You can fill them up with 'SHOOT'. That is, you replace 
                            the letter 'U' in 'SOUTH' with 'O' and rearrange the letters to build a new word 'SHOOT'. 
                            If the first line has 4 boxes, you can type the new word to be 'SHUT'. That is, you remove 
                            'U' and rearrange the letters to have a new word. Also, if 6 boxes, you can come up with a 
                            new word 'SHOUTS'.
                        </li>
                        <li>
                            Then, the player should give out the new change (INCREMENT, DECREMENT OR REPLACE) and provide 
                            a candidate word to the opponent.
                        </li>
                    </span>
                    {!currentUser && <span>You have to log in then you can play this game!</span>}
                </div>
            
        // </div>
    )
}

export default GameEntrance;