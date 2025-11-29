/** @format */

import React, { useEffect, useState } from "react";
import splashVideo from "../assets/splashscreen.mp4";

import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(() => onFinish(), 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 transition-opacity duration-700 flex items-center justify-center 
        ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background Video */}
      <video
        src={splashVideo}
        autoPlay
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
      />
    </div>
  );
};

export default SplashScreen;
