
const Definitions = () => {
    const currentWordDefinition = [
        {
            word: 'cancel',
            id: 1,
            part: 'verb',
            definitions: [
                {
                    id:'a',
                    definition: 'to decide not to conduct or perform (something planned or expected) usually without expectation of conducting or performing it at a later time'
                },
                {
                    id:'b',
                    definition: 'to destroy the force, effectiveness, or validity of '
                },
                {
                    id:'c',
                    definition:'to match in force or effect'
                }
            ]
        },
        {
            word: 'cancel',
            id: 2,
            part: 'noun',
            definitions: [
                {
                    id:'a',
                    definition: 'to remove (a common divisor) from numerator and denominator'
                },
                {
                    id:'b',
                    definition: 'to remove (equivalents) on opposite sides of an equation or account '
                },
                {
                    id:'c',
                    definition:'to match in force or effect'
                }
            ]            
        }
    ]
    return (
        <div className='definitions-container'>
            {
            currentWordDefinition.map((part) => {
                <DefinitionPart data={part}/>
            })
            }
        </div>
    )
}