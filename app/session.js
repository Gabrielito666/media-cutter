import { useState, useRef, useEffect } from "react";

class Session{
    constructor(){
        this._name;
        this._url;
        this._points;
    }
}




const [ autoJump, setAutoJump ] = useState( true );
const [ cut, setCut ] = useState( 'odd' );
const [ currentTime, setCurrentTime ] = useState( 0 );
const [ isDragging, setIsDragging ] = useState( false );
const [ duration, setDuration ] = useState( 0 );
const [ videoSrc, setVideoSrc ] = useState( null );
const [ points, setPoints ] = useState( [] );
const putPoint = ( position ) => {
  setPoints(  ( actualPoints ) => [ ...actualPoints, { position, key : actualPoints.length } ] )
}
const videoRef = useRef( null );

const [ config, setConfig ] = useState( {
    autoJump : true,
    cut : 'odd'
} )

const [ video, setVideo ] = useState( {
        currentTime : 0,
        isDragging : false,
        duration : 0,
        videoSrc: null
    } )




/*
    en modo añadir punto no debe mover el currentTimePoint
*/