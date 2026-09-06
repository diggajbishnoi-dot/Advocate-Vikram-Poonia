import React, { useEffect, useState, useRef } from 'react';
import { content } from '../content';

function StatCounter({ target, label }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 1200;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Cubic ease-out
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeOut * target);
          setCount(currentVal);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div className="stat-card reveal in" ref={cardRef}>
      <span className="stat-num">{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About({ lang }) {
  const { about } = content;

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-grid">
          {/* Chamber / Office Placeholder */}
          <div className="office-placeholder reveal in">
            <div className="placeholder-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M10 3l2-1 2 1v4h-4V3z"></path>
              </svg>
              <span>{about.chamberPlaceholder[lang]}</span>
            </div>
          </div>

          {/* About Text Body */}
          <div className="about-body">
            <div className="section-head" style={{ marginBottom: '24px' }}>
              <div className="section-kicker">
                <span className="kicker-rule"></span>
                <span className="kicker-text">{about.kicker[lang]}</span>
              </div>
              <h2>{about.heading[lang]}</h2>
            </div>

            <p>{about.p1[lang]}</p>
            <p>{about.p2[lang]}</p>

            {/* Stat Row */}
            <div className="stat-row">
              {about.stats.map((item, idx) => (
                <StatCounter
                  key={idx}
                  target={item.num}
                  label={item.label[lang]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
