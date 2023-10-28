export const Config = ( { autoJump, setAutoJump, cut, setCut } ) => {
    //RADIO BUTTON
    const RadioButtonSection = () => <>
    <label><h2>Do you want to cut the:</h2></label>
        <RadioButton option = 'Odd' cut = { cut } setCut = { setCut } />
        <RadioButton option = 'Even' cut = { cut } setCut = { setCut } />
    </>
    const RadioButton = ( { option } ) => <label>
    { `${ option } parts` }
    < input
        type = "radio"
        name = "choice"
        value = { option }
        checked = { cut === option }
        onChange = { ( e ) => { setCut( e.target.value ) } }
    />
    </label>
    //CHECKBOX
    const PreviewCheckbox = () => <label>
    <h2>Preview whidth jumps</h2>
    < input
        type = 'checkbox'
        name = 'preview'
        checked = { autoJump }
        onChange = { ( e ) => { setAutoJump( e.target.checked ); } }
    />
    </label>
    //ALL CONFIG
    return <section className = 'config'>
        <RadioButtonSection cut = { cut } setCut = { setCut } />
        <PreviewCheckbox autoJump = { autoJump } setAutoJump = { setAutoJump } />
    </section>
}