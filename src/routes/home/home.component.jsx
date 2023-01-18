import { Outlet } from 'react-router-dom';
import SearchZone from "../../components/searchZone/searchZone.component";
import InteractionZone from "../../components/interactionZone/interactionZone.component";
import './home.styles.scss';

const Home = () => {
    return (
        <div>
            <div className='home-container'>
                <SearchZone />
                <InteractionZone />            
            </div>
        <Outlet />
        </div>
    )
}
export default Home;