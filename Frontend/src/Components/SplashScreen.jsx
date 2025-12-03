/** @format */
import React, { useEffect, useState, useRef } from "react";
import splashVideo from "../assets/splashscreen.mp4";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(() => onFinish(), 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  // Enable sound on first user interaction
  const enableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  return (
    <div
      onClick={enableSound} // <-- first tap enables sound automatically
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src={splashVideo}
        autoPlay
        muted // autoplay requirement
        loop
        playsInline
        preload='auto'
        className='splash-video'
      />

      <div className='splash-overlay'>
        <div className='bottom-content'></div>
      </div>
    </div>
  );
};

export default SplashScreen;
