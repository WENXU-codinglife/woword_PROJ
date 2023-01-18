import Definitions from '../definitions/definitions.component';
import SearchBar from '../searchBar/searchBar.component'
import './searchZone.styles.scss';

const SearchZone = () => {
    return (
        <div className='search-zone-container'>
            <SearchBar />
            <Definitions />
        </div>
    )
}

export default SearchZone;