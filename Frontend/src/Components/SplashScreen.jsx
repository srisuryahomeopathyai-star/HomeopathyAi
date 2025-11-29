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
      setTimeout(() => setShowButton(false), 1000);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-700 
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Fullscreen Background Video */}
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

      {/* Overlay Content */}
      <div className='splash-overlay'>
        {/* Bottom content visible always */}
        <div className='bottom-content'>
          {/* Button (sound enable) */}
          {showButton && !audioEnabled && (
            <button onClick={enableAudio} className='sound-btn'>
              Tap to enable sound
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
