
import profileDemo from '../../assets/image/profileDemo.jpg';
import profileRobot from '../../assets/image/profileRobot.jpg';

import './profileIcon.styles.scss';


const ProfileIcon = ({ user = null, isClickable = false }) => {

    const icon  = !user? profileRobot : profileDemo;
    return (
        <div className='profile-image-container'>
            <img className ='image' src = {icon}/>
        </div>
    )
} 

export default ProfileIcon;