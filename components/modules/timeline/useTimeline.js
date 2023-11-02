import { useState, useRef, useEffect } from "react";
import { getFamilySetters, getPosition } from "@/components/tools";
import { renderWave, slideVideo, spacePlayPause, mooveWidthFrames, pushPoint, moovePoint, jumpSection, selectAnotherPoint, shiftSelectMode } from './tools';
export const useTimeline = ( { videoThings, setVideoThings, points, setPoints, config } ) => {

    //VIDEO THINGS
    const { videoRef, currentTime, duration, isDragging, videoSrc } = videoThings;      //getters
    const [ setCurrentTime, setIsDragging ] =                                           //setters
        getFamilySetters( [ 'currentTime', 'isDragging' ], setVideoThings )
    ;
    //POINTS THINGS
    const { pointsList, selectedMode, lastSelectedPoint } = points;                     //getter
    const [ setPointsList, setSelectedMode, setLastSelectedPoint ] =                                          //setter
        getFamilySetters( [ 'pointsList', 'selectedMode', 'lastSelectedPoint' ], setPoints );
    ;
    //CONFIG THINGS
    const { autoJump, cut } = config; 
    //TIME LINE THINGS
    const [ mouseX, setMouseX ] = useState( null );
    const [ shiftPress, setShiftPress ] = useState( false );
    const [ ctrlPress, setCtrlPress ] = useState( false );
    const timelineRef = useRef( null );
    const waveform = useRef( null );
    const position = useRef( null );
    position.current =  getPosition( currentTime, duration )

    //HANDLERS
    
    const onArrows = advance => ctrlPress ? 
        selectAnotherPoint( { setLastSelectedPoint, advance, pointsList, setCurrentTime, videoRef } ) :
        mooveWidthFrames( { setCurrentTime, advance, videoRef, shiftPress, ctrlPress } )
    ;
    const keyDown = ( e ) => {
        if( e.code === 'Space' ) spacePlayPause( videoRef );
        else if( e.code === 'KeyP' ) pushPoint( { position : position.current, setPointsList } );
        else if( e.code === 'ArrowLeft' ) onArrows( false );       //false <----
        else if( e.code === 'ArrowRight' ) onArrows( true );       // true ---->
        else if( e.code === 'ShiftLeft' ) setShiftPress( true );
        else if( e.code === 'KeyS' ) shiftSelectMode( { setSelectedMode, lastSelectedPoint, videoRef, setCurrentTime, pointsList } );
        else if( e.code === 'ControlLeft' ) setCtrlPress( true )
    };
    const keyUp = ( e ) => {
        if( e.code === 'ShiftLeft' ) setShiftPress( false )
        else if( e.code === 'ControlLeft' ) setCtrlPress( false )
    };
    const mouseUp = () => { setIsDragging( false ) };
    const mouseMove = ( e ) => { setMouseX( e.clientX ) };
    const mouseDown = ( e ) => { setIsDragging( true ); setMouseX( e.clientX ); };
    const loadedMetadata = () => { renderWave( waveform, timelineRef, videoSrc ) };
    
    //EFFECTS
    //onDrag
    useEffect( () => {

        if ( isDragging ) {
            document.body.style.cursor = 'ew-resize';
            document.body.addEventListener( 'mouseup', mouseUp );
            document.body.addEventListener( 'mousemove', mouseMove );
        }else{
            document.body.style.cursor = 'auto';
        }

        return () => {
            document.body.removeEventListener( 'mouseup', mouseUp );
            document.body.removeEventListener( 'mousemove', mouseMove );
            document.body.style.cursor = 'auto';
        }
    }, [ isDragging ] );
    //on mouseMoove
    useEffect( () => {
        if ( isDragging ) slideVideo( timelineRef, mouseX, duration, videoRef, setCurrentTime )
    }, [ mouseX ]
    );
    //on Change video
    useEffect( () => {
        if( videoRef.current ) {
            videoRef.current.addEventListener( 'loadedmetadata', loadedMetadata );
            return () => {
                videoRef.current.removeEventListener( 'loadedmetadata', loadedMetadata );
                waveform.current.destroy();
            };
        }
    }, [ videoSrc ] )
    //on Select Point
    useEffect( () => {
        if( selectedMode ) moovePoint( { setPointsList, lastSelectedPoint, position } )
        if( videoRef.current ) jumpSection(
            { videoRef, autoJump, pointsList, currentTime, cut, setCurrentTime, duration }
        )
    } ,[ currentTime ] )

    return { timelineRef, mouseDown, position, keyDown, keyUp, duration }
}