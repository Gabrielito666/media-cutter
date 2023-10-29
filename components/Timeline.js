import React, { useState, useRef, useEffect } from 'react';
import { renderWave, mooveVideo, spacePlayPause, } from './modules/timeline/tools';

export const Timeline = ( { currentTime, duration, setCurrentTime, videoRef, isDragging, setIsDragging, videoSrc, points, putPoint } ) => {

    const [ mouseX, setMouseX ] = useState( null );
    const percentage = ( currentTime / duration ) * 100;
    const timelineRef = useRef( null );
    const waveform = useRef( null );

    const percentageRef = useRef( null );

    const handlers = {
        keyDown : ( e ) => {
            if( e.code === 'Space' ) spacePlayPause( videoRef );
            else if( e.code === 'KeyP' ) putPoint( percentageRef.current );
        },
        mouseUp : () => { setIsDragging( false ) },
        mouseMove : ( e ) => { setMouseX( e.clientX ) },
        mouseDown : ( e ) => { setIsDragging( true ); setMouseX( e.clientX ) },
        loadedMetadata : () => { renderWave( waveform, timelineRef, videoSrc ) }
    }

    useEffect( () => {

        if ( isDragging ) {
            document.body.style.cursor = 'ew-resize';
            document.body.addEventListener( 'mouseup', handlers.mouseUp );
            document.body.addEventListener( 'mousemove', handlers.mouseMove );
        }else{
            document.body.style.cursor = 'auto';
        }

        return () => {
            document.body.removeEventListener( 'mouseup', handlers.mouseUp );
            document.body.removeEventListener( 'mousemove', handlers.mouseMove );
            document.body.style.cursor = 'auto';
        }
    }, [ isDragging ] );

    useEffect( () => {
        if ( isDragging ) mooveVideo( timelineRef, mouseX, duration, videoRef, setCurrentTime ) },
        [ mouseX ]
    );

    useEffect( () => {
        if( videoRef.current ) {
            videoRef.current.addEventListener( 'loadedmetadata', handlers.loadedMetadata );
            return () => {
                videoRef.current.removeEventListener( 'loadedmetadata', handlers.loadedMetadata );
                waveform.current.destroy();
            };
        }
    }, [ videoSrc ] )

    useEffect(
        () => { percentageRef.current = ( ( currentTime / duration ) * 100 ) }, [ currentTime, duration ]
    );

    useEffect( () =>{
        document.addEventListener( 'keydown', handlers.keyDown );
        return () => document.removeEventListener( 'keydown', handlers.keyDown );
    }, [] )
    
    return < section className = 'timeline' ref = { timelineRef } onMouseDown = { handlers.mouseDown }>
        <div className = 'currentTimePoint' style = { { left: `${ percentage }%` } } />
        { points.map( ( p ) => <div className = 'point' style = { { left: `${ p.position }%` } }/> ) }
    </section>;
};