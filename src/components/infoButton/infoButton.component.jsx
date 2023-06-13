import { useState } from 'react';
import infoIcon from '../../assets/icon/info.png';
import './infoButton.styles.scss';

const InfoButton = ({ infoContent }) => {
    const [infoIsShown, setInfoIsShown] = useState(false);
    const handleMouseEnter = () => {
        setInfoIsShown(true);
        console.log(true);
    }
    
    const handleMouseLeave = () => {
        setInfoIsShown(false);
        console.log(false);
    }
    return (
            <div 
                className = 'info-button-container'
                onMouseEnter = {handleMouseEnter}
                onMouseLeave = {handleMouseLeave}
            >
                <img src={infoIcon} alt=''/>
                {infoIsShown && 
                    <div className='info-content'>
                        {infoContent}
                    </div>
                }
            </div>
    )
}


export default InfoButton;