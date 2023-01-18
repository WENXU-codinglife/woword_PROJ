

const DefinitionPart = ({ data }) => {
    const { part, dts } = data;
    console.log(part, dts);
    return (
        <div className='part-container'>
            <span>{part}</span>
            {
            dts.map((df) => (
            <div>text: {df.text} vis:{df.vis}</div>
            ))
            }
        </div>
    )
}

export default DefinitionPart;