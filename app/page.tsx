'use client'

import React, { useEffect } from 'react';
import WebRTC from '../webrtc'; // Import the WebRTC class

const Home = () => {
  let peerId = 'fc7c42de-3d89-4d21-b509-92a4187b0d3e'
  useEffect(() => {
    const rtc = new WebRTC(); // Initialize the WebRTC class

    // For demonstration purposes, initiate a call after 2 seconds
    setTimeout(() => {
      rtc.initiateCall(peerId); // Replace with the actual peer ID
    }, 2000);
  }, [peerId]);

  return (
    <div className='relative'>
      <h1>WebRTC Video Call Demo</h1>
      <video id="localVideo" autoPlay muted className='w-[200px] h-auto fixed bottom-2 right-2 rounded-lg border border-gray-100/20 shadow-sm'></video>
      <video draggable="true" id="remoteVideo" autoPlay className='h-screen w-auto'></video>
    </div>
  );
};

export default Home;
