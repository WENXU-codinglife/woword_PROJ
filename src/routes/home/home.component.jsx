import { Outlet } from 'react-router-dom';
import SearchZone from "../../components/searchZone/searchZone.component";
import InteractionZone from "../../components/interactionZone/interactionZone.component";

const Home = () => {
    return (
        <div>
        <div>
            <SearchZone />
            <InteractionZone />            
        </div>
        <Outlet />
        </div>
    )
}
export default Home;