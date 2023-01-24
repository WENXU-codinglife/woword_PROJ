import { Outlet } from 'react-router-dom';
import { InteractionModeAndDataProvider } from '../../contexts/interactionModeAndData/interactionModeAndData.context';
import SearchZone from "../../components/searchZone/searchZone.component";
import InteractionZone from "../../components/interactionZone/interactionZone.component";

import './home.styles.scss';

const Home = () => {
    return (
        <div className='home-wrapper'>
            <div className='home-container'>
                <SearchZone />
                <InteractionModeAndDataProvider>
                    <InteractionZone />            
                </InteractionModeAndDataProvider>
            </div>
        {/* <Outlet /> */}
        </div>
    )
}
export default Home;