import { getFamilySetters } from "../../tools";

export const Config = ( { config, setConfig } ) => {

    const { cut, autoJump } = config;
    const [ setCut, setAutoJump ] = getFamilySetters( [ 'cut', 'autoJump' ], setConfig );

    //RADIO BUTTON
    const RadioButtonSection = () => <>
    <label><h2>Do you want to cut the:</h2></label>
        <RadioButton option = 'Odd' />
        <RadioButton option = 'Even' />
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
    <h2>Preview with jumps</h2>
    < input
        type = 'checkbox'
        name = 'preview'
        checked = { autoJump }
        onChange = { ( e ) => { setAutoJump( e.target.checked ) } }
    />
    </label>
    //ALL CONFIG
    return <section className = 'config'>
        <RadioButtonSection/>
        <PreviewCheckbox/>
    </section>
}