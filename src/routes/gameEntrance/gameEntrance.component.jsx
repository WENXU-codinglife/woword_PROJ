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
                <button className='operation-button' onClick={startHandler}>Start A Game</button>
            
        // </div>
    )
}

export default GameEntrance;