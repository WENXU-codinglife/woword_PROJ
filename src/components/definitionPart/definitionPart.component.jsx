import './definitionPart.styles.scss';

const DefinitionPart = ({ data }) => {
    const { part, dts } = data;
    return (
        <div className='part-container'>
            <div className='word-part'>{part}</div>
            {
            dts.map((df) => (
            <div id={df.text} className='part-definition-container'>
                <li className='listed-definition'>{df.text}</li>
                {df.vis? <div className='listed-example'>Example: {df.vis}</div> : null}
            </div>
            ))
            }
        </div>
    )
}

export default DefinitionPart;