import { Outlet } from 'react-router-dom';
import { InteractionModeProvider } from '../../contexts/interactionMode/interactionMode.context';
import SearchZone from "../../components/searchZone/searchZone.component";
import InteractionZone from "../../components/interactionZone/interactionZone.component";

import './home.styles.scss';

const Home = () => {
    return (
        <div>
            <div className='home-container'>
                <SearchZone />
                <InteractionModeProvider>
                    <InteractionZone />            
                </InteractionModeProvider>
            </div>
        <Outlet />
        </div>
    )
}
export default Home;