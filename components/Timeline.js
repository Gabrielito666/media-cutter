import React, { useState, useRef } from 'react';

export const Timeline = ( { currentTime, duration, setCurrentTime, videoRef } ) => {

    const percentage = ( currentTime / duration ) * 100;
    const [ isDragging, setIsDragging ] = useState( false );
    const timelineRef = useRef( null );

    document.body.style.cursor = isDragging ? 'ew-resize' : 'auto';
    
    const handleMouseDown = ( e ) => {
        setIsDragging( true );
        handleDrag( e );
    };
    
    const handleMouseUp = () => {
        setIsDragging( false );
    };
    
    const handleDrag = ( e ) => {
        if ( !isDragging ) return;
    
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const newPercentage = ( x / width ) * 100;
        
        const newTime = ( newPercentage / 100 ) * duration;
        setCurrentTime( newTime );
        if( videoRef.current ) videoRef.current.currentTime = newTime;
    };

    return < section
            className = 'timeline'
            ref = { timelineRef }
            onMouseDown = { handleMouseDown }
            onMouseUp = { handleMouseUp }
            onMouseMove = { handleDrag }
            onMouseLeave = { handleMouseUp }
        >
        <div className = 'currentTimePoint' style ={ { left: `${ percentage }%` } } />
    </section>;
};