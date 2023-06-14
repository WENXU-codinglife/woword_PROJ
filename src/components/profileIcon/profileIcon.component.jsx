
import profileDemo from '../../assets/image/profileDemo.jpg';
import profileRobot from '../../assets/image/profileRobot.jpg';

import { PROFILEIAMGESIZE } from '../../utils/titles/titles.utils';

import './profileIcon.styles.scss';


const ProfileIcon = ({ user = null, isClickable = false, size = PROFILEIAMGESIZE.NORMAL, isWithUsername = false  }) => {

    const icon  = !user? profileRobot : profileDemo;
    return (
        <div className='profile-image-container'>
            <img className ={`image ${size}`} src = {icon} alt='' />
        </div>
    )
} 

export default ProfileIcon;