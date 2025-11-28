/** @format */

import React, { useEffect, useState } from "react";
import splashVideo from "../assets/SplashScreen.mp4";
import "./SplashScreen.css"; // <-- Add this line

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Glow behind video */}
      <div className='absolute w-80 h-80 rounded-full bg-blue-500 blur-[90px] opacity-40'></div>

      {/* Center animated video */}
      <div className='relative animate-scaleSmooth flex items-center justify-center'>
        <video
          src={splashVideo}
          autoPlay
          muted
          playsInline
          className='w-[220px] h-[220px] object-contain drop-shadow-2xl'
        />
      </div>
    </div>
  );
};

export default SplashScreen;
