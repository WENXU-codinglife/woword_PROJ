import iconThumbsUp from '../../assets/icon/like.png';
import './wordButton.styles.scss';

const WordButton = ({ word }) => {

    return (
        <div className='word-button-container'>
            <div className='word-button-text'>{word}</div>
            <div className='word-button-state-icon'>
                { true?
                    <img className='thumbsup-icon' src={iconThumbsUp} />
                : null
                }
                
            </div>
        </div>
    )
}

export default WordButton;