'use client'
import { useState, useRef } from 'react';
import { Title, Config, Preview, Timeline, CutButton } from '@/components/components';
export default function Home() {

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

  const configData = { autoJump, setAutoJump, cut, setCut };
  const previewData = { currentTime, setCurrentTime, duration, setDuration, videoRef, isDragging, setIsDragging, videoSrc, setVideoSrc, points, putPoint };

  return <main>
    <Title/>
    <Config { ...configData } />
    <Preview { ...previewData } />
    <Timeline { ...previewData } />
    <CutButton/>
  </main>
};