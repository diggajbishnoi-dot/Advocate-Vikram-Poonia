import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Elegant quick 1.1s intro, then smooth fade-out
    const timer1 = setTimeout(() => {
      setFadingOut(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${fadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-center">
        {/* Animated SVG Seal Drawing */}
        <svg className="preloader-seal" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="27" className="draw-path circle-outer" />
          <circle cx="30" cy="30" r="22" className="draw-path circle-inner" />
          <path d="M30 15v30M19 24l11-8 11 8" className="draw-path beam-path" />
          <path d="M15 29h8M37 29h8" className="draw-path pans-bar" />
          <path d="M16 36c2 2.5 4.5 4 6.5 4s4.5-1.5 6.5-4" className="draw-path pan-left" />
          <path d="M31 36c2 2.5 4.5 4 6.5 4s4.5-1.5 6.5-4" className="draw-path pan-right" />
          <circle cx="30" cy="19" r="2" className="draw-path dot-accent" />
        </svg>

        <div className="preloader-brand">
          <span className="preloader-name">Vikram Poonia</span>
          <span className="preloader-tag">Law Chamber · Sri Ganganagar</span>
        </div>

        <div className="preloader-progress-track">
          <div className="preloader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
