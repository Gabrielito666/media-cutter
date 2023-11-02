'use client'
import { useState } from 'react';
import { Session } from './session';
import { Title, Config, Preview, Timeline, CutButton } from '@/components/components';
export default function Home() {

  const session = new Session();
  const [ config, setConfig ] = useState( session._default.config );
  const [ videoThings, setVideoThings ] = useState( session._default.video );
  const [ points, setPoints ] = useState( session._default.points );

  return <main>
    <Title/>
    <Config { ...{ config, setConfig } } />
    <Preview { ...{ videoThings, setVideoThings } } />
    <Timeline { ...{ videoThings, setVideoThings, points, setPoints, config  } } />
    <CutButton/>
  </main>
};