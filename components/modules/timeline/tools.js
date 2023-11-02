import WaveSurfer from 'wavesurfer.js';
const calcNewTime = ( timelineRef, mouseX, duration )=>{
    const rect = timelineRef.current.getBoundingClientRect();
    const x = mouseX - rect.left;
    const width = rect.width;
    const newPercentage = ( x / width ) * 100;
    const newTime = ( newPercentage / 100 ) * duration;
    return newTime;
};
export const renderWave = ( waveform, timelineRef, videoSrc ) => {
    waveform.current = WaveSurfer.create( {
        container: timelineRef.current,
        waveColor: '#4F4A85',
        url: videoSrc,
        fillParent : true,
        interact: false,
        cursorWidth: 0 
    } );
    waveform.current.load( videoSrc )
};
export const mooveVideo = ( { newTime, videoRef, setCurrentTime } ) => {
    setCurrentTime( newTime );
    if( videoRef.current ) videoRef.current.currentTime = newTime;
}
export const slideVideo = ( timelineRef, mouseX, duration, videoRef, setCurrentTime ) => {
    const newTime = calcNewTime( timelineRef, mouseX, duration );
    mooveVideo( { newTime, videoRef, setCurrentTime } );
}

export const shiftSelectMode = ( { setSelectedMode, lastSelectedPoint, videoRef, setCurrentTime, pointsList } ) =>{
    setSelectedMode( prev => {
        if ( !prev ) mooveVideo( { newTime : pointsList[ lastSelectedPoint ].time, videoRef, setCurrentTime } )
        return !prev
    } );
}

export const frameDuration = 1 / 24;
const mooveFrameLeftOrRigth = ( advance, prev, gap ) => prev + ( ( advance ? gap : -gap ) * frameDuration );

export const mooveWidthFrames = ( { setCurrentTime, advance, videoRef, shiftPress } ) => {
    const gap = shiftPress ? 10 : 1;
    const newTime = mooveFrameLeftOrRigth( advance, videoRef.current.currentTime, gap );
    mooveVideo( { newTime, videoRef, setCurrentTime } );
}
export const selectAnotherPoint = ( { setLastSelectedPoint, advance, pointsList, setCurrentTime, videoRef } ) => {
    setLastSelectedPoint( ( prev ) => {
        const newPoint = ( +prev + ( advance ? 1 : -1 ) );
        if ( pointsList[ newPoint ] ) {
            mooveVideo( { newTime : pointsList[ newPoint ].time, videoRef, setCurrentTime } )
            return `${ newPoint }` //as string like id
        }
        else return prev
    } )
}
export const spacePlayPause = ( videoRef ) => {
    if ( videoRef.current.paused ) videoRef.current.play();
    else videoRef.current.pause();
}
const generateHexKey = () => {
    const randomValue = Math.floor( Math.random() * ( 0xFFFF + 1 ) );
    return randomValue.toString( 16 ).padStart( 4, '0' );
}
const getKey = ( actualKeysArray ) => {
    const actualKeys = new Set( actualKeysArray );
    const proposeKey = generateHexKey();
    return actualKeys.has(proposeKey) ? getKey([...actualKeys]) : proposeKey;
}
const orderPoints = points => [...points].sort( ( a, b ) => a.time - b.time );

export const pushPoint = ( { position, setPointsList } ) => {
    setPointsList( ( prev ) =>
        orderPoints( [ ...prev, { ...position, key : getKey( prev.map( x => x.key ) ) } ]
    ) )
};

export const moovePoint = ( { setPointsList, lastSelectedPoint, position } )=>{
    setPointsList(
        ( prev ) => orderPoints( 
            prev.map( ( p, i ) => `${i}` === lastSelectedPoint ? { ...p, ...position.current } : p )
        )
    )
}

export const jumpSection = ( { videoRef, autoJump, pointsList, currentTime, cut, setCurrentTime, duration } )=>{

    if( !videoRef.current.paused && autoJump ){
        const allSegments = [ { time : 0 }, ...pointsList, { time : duration } ];
        const numSegment = [ ...allSegments ].findIndex(
            ( p, i ) => (
                ( allSegments[ i ].time <= currentTime )
                &&
                ( currentTime <= allSegments[ (i + 1) ].time )
            )              
        );
        const typeSegment = ( numSegment + 1 ) % 2 === 0 ? 'Even' : 'Odd';
        if( typeSegment === cut ) mooveVideo(
            {
                newTime : allSegments[ numSegment + 1 ].time,
                videoRef,
                setCurrentTime
            }
        )
    }
}