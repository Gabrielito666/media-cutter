import React, { useRef, useEffect } from 'react';
import { setVideo } from './modules/preview/tools';
export const Preview = ( { setDuration, setCurrentTime, videoRef, videoSrc, setVideoSrc } ) => {
    
    const fileInputRef = useRef( null );

    const handlers = {
        timeUpdate : () => { if( videoRef.current ) setCurrentTime( videoRef.current.currentTime ) },
        videoDurationChange : () => { if( videoRef.current ) setDuration( videoRef.current.duration ) },
        onDrop : ( e ) => { setVideo( { e, drop : true, setVideoSrc } ) },
        onFileChange : ( e ) => { setVideo( { e, drop : false, setVideoSrc } ) }
    };

    const Screen = <video
        controls
        src = { videoSrc }
        ref = { videoRef }
        width = "320"
        height = "240"
        onTimeUpdate = { handlers.timeUpdate }
        onLoadedMetadata = { handlers.videoDurationChange }
    />;
    const Default = <div>Drag a video here or select one with the button</div>;

    const InputFile = () => <>
        <input
            type = "file"
            ref = { fileInputRef }
            style = { { display : 'none' }}
            onChange = { handlers.onFileChange }
            accept = "video/*"
        />
        <button onClick = { () => fileInputRef.current.click() }>Examinar</button>
    </>;

    return < section
            className = "preview"
            onDrop = { handlers.onDrop }
            onDragOver = { ( e ) => e.preventDefault() }
        >
            { videoSrc ? Screen : Default }
            <InputFile/>
        </section>
    ;
};