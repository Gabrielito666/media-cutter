import Point from './Point/Point';
import CutSegment from './CutSegment/CutSegment';
import { useTimeline } from './useTimeline';

export const Timeline = ( { videoThings, setVideoThings, points, setPoints, config } ) => {

    const { timelineRef, mouseDown, position, keyDown, keyUp, duration } =
        useTimeline( { videoThings, setVideoThings, points, setPoints, config } )
    ;
    const { pointsList } = points;
    
    return < section
            className = 'timeline'
            ref = { timelineRef }
            onMouseDown = { mouseDown }
            onKeyDown = { keyDown }
            onKeyUp = { keyUp }
            tabIndex = "0"
        >
        <div className = 'currentTimePoint' style = { { left: `${ position.current.percentage }%` } } />
        { pointsList.map( ( p, i ) => <Point key = { p.key + 'p' } { ...{ i, points, setPoints } } />) }
        { [ ...pointsList, { percentage : 100, time : duration , key : 'lastPoint' }].map(
            ( p, i ) => <CutSegment key = { p.key + 's' } { ...{ p, i, points, config } } /> )
        }
    </section>;
};


