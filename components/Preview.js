import React, { useState, useRef } from 'react';

export const Preview = ( { setDuration, setCurrentTime, videoRef } ) => {
    const [ videoSrc, setVideoSrc ] = useState( null );
    const fileInputRef = useRef( null );

    const onDrop = ( event ) => {
            event.preventDefault();
            if ( event.dataTransfer.items && event.dataTransfer.items[ 0 ] ) {
            const file = event.dataTransfer.items[ 0 ].getAsFile();
            const url = URL.createObjectURL( file );
            setVideoSrc( url );
        }
    };

    const onFileChange = ( event ) => {
        if ( event.target.files && event.target.files[ 0 ] ) {
            const file = event.target.files[ 0 ];
            const url = URL.createObjectURL( file );
            setVideoSrc( url );
        }
    };

    const handleTimeUpdate = () => { if( videoRef.current ) setCurrentTime( videoRef.current.currentTime ); };
    const handleVideoDurationChange = () => { if( videoRef.current ) setDuration( videoRef.current.duration ); };    

    const Screen = <video
        controls
        src = { videoSrc }
        ref = { videoRef }
        width = "320"
        height = "240"
        onTimeUpdate = { handleTimeUpdate }
        onLoadedMetadata = { handleVideoDurationChange }
    />;
    const Default = <div>Drag a video here or select one with the button</div>;

    const InputFile = () => <>
        <input
            type = "file"
            ref = { fileInputRef }
            style = { { display : 'none' }}
            onChange = { onFileChange }
            accept = "video/*"
        />
        <button onClick = { () => fileInputRef.current.click() }>Examinar</button>
    </>;

    return <section className = "preview" onDrop = { onDrop } onDragOver = { ( e ) => e.preventDefault() }>
        { videoSrc ? Screen : Default }
        <InputFile/>
    </section>
};