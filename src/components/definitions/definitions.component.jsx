import { useContext } from "react";
import { WordContext } from "../../contexts/word/word.context";
import DefinitionPart from "../definitionPart/definitionPart.component";
import './definitions.styles.scss';
const Definitions = () => {
    const { searchedWordDefinition } = useContext(WordContext);
    let key = 1;
    return (
        <div className='definitions-container'>
            {
                searchedWordDefinition.map((part) => {
                    return (<DefinitionPart key={key++} data={part}/>);
                })
            }
        </div>
    )
}

export default Definitions;