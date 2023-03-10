import { Fragment, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/logo-no-background.svg';
import { UserContext } from "../../contexts/user/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import ProfileIcon from "../../components/profileIcon/profileIcon.component";
import './navigation.styles.scss';
import { PROFILEIAMGESIZE } from "../../utils/titles/titles.utils";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
      await signOutUser();
      setCurrentUser(null);
    };
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='nav-links-container'>
                {<Link className='nav-link' to='/'>HOME</Link>}
                {<Link className='nav-link' to='/game'>GAME</Link>}
                {!currentUser?
                    <Link className='nav-link' to='/sign-up'>SIGN UP</Link>
                :
                    <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                }
                {currentUser? (
                    <ProfileIcon size={PROFILEIAMGESIZE.X_SMALL} user={currentUser}/>
                ) : (
                    <Link className='nav-link' to='/sign-in'>
                    SIGN IN
                    </Link>
                )}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;