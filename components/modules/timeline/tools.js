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
export  const mooveVideo = ( timelineRef, mouseX, duration, videoRef, setCurrentTime ) => {
    const newTime = calcNewTime( timelineRef, mouseX, duration );
    setCurrentTime( newTime );
    if( videoRef.current ) videoRef.current.currentTime = newTime;
}

export const spacePlayPause = ( videoRef ) => {
    if ( videoRef.current.paused ) videoRef.current.play();
    else videoRef.current.pause();
}