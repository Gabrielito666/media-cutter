import { setVideo } from './tools';
import { getFamilySetters } from '../../tools';
import { useRef } from 'react';

export const usePreview = ( { videoThings, setVideoThings } ) =>{

    const [ setDuration, setCurrentTime, setVideoSrc ] =
        getFamilySetters( [ 'duration', 'currentTime', 'videoSrc' ], setVideoThings )
    ;
    const { videoRef, videoSrc } = videoThings;

    const fileInputRef = useRef( null );

    const timeUpdate = () => { if( videoRef.current ) setCurrentTime( videoRef.current.currentTime ) };
    const videoDurationChange = () => { if( videoRef.current ) setDuration( videoRef.current.duration ) };
    const onDrop = ( e ) => { setVideo( { e, drop : true, setVideoSrc } ) };
    const onFileChange = ( e ) => { setVideo( { e, drop : false, setVideoSrc } ) };

    return { timeUpdate, videoDurationChange, onDrop, onFileChange, videoSrc, videoRef, fileInputRef }
};