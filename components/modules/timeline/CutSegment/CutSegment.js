export default ( { p, i, points, config } ) => {

    const { pointsList } = points;
    const { autoJump, cut } = config;
    const inputCondition = ( ( cut === 'Odd' ? i % 2 === 0 : i % 2 !== 0 ) && autoJump );

    return <div
        className = "cutSection"
        style = { {
            left: `${ i === 0 ? 0 : pointsList[ i - 1 ].percentage }%`,
            width: `${ p.percentage - ( i === 0 ? 0 : pointsList[ i - 1 ].percentage ) }%`,
            backgroundColor: inputCondition ? 'rgba(0, 0, 0, 0.5)' : "transparent"
        } }
    />
};