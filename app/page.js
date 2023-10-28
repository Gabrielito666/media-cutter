'use client'
import { useState, useRef } from 'react';
import { Title, Config, Preview, Timeline, CutButton } from '@/components/components';
export default function Home() {

  const [ autoJump, setAutoJump ] = useState( true );
  const [ cut, setCut ] = useState( 'odd' );
  const [ currentTime, setCurrentTime ] = useState( 0 );
  const [ duration, setDuration ] = useState( 0 );
  const videoRef = useRef( null );

  const configData = { autoJump, setAutoJump, cut, setCut };
  const previewData = { currentTime, setCurrentTime, duration, setDuration, videoRef };

  return <main>
    <Title/>
    <Config { ...configData } />
    <Preview { ...previewData } />
    <Timeline { ...previewData } />
    <CutButton/>
  </main>
};