/** @format */

import React, { useEffect, useState, useRef } from "react";
import splashVideo from "../assets/splashscreen.mp4";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fade out and finish timers
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(() => onFinish(), 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const enableAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setAudioEnabled(true);

      // Hide button after 1 second
      setTimeout(() => setShowButton(false), 1000);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 
    ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={splashVideo}
        autoPlay
        muted
        playsInline
        loop
        preload='auto'
        className='splash-video'
      />

      {/* Overlay content */}
      <div className='splash-overlay'>
        <p className='fade-in-text mt-4'>Welcome to Sri Surya Homeopathy AI</p>

        {/* Tap to enable audio */}
        {showButton && !audioEnabled && (
          <button
            onClick={enableAudio}
            className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Tap to enable sound
          </button>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
