import SearchedWordsPool from "../searchedWordsPool/searchedWordsPool.component";
import InteractionWindow from "../interactionWindow/interactionWindow.component";
import './interactionZone.styles.scss';

const InteractionZone = () => {

    return (
        <div className='interaction-zone-container'>
            <SearchedWordsPool />
            <InteractionWindow />
        </div>
    )
}

export default InteractionZone;