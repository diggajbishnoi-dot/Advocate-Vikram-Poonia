import React, { useEffect, useState, useRef } from 'react';
import { content } from '../content';

// Animated Count-up Component with Cubic Easing
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400;
          const startTime = performance.now();

          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={elRef} className="metric-num-omara">
      {count}{suffix}
    </span>
  );
}

export default function CourtRecord({ lang }) {
  const { courtRecord } = content;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="court-record-omara" id="court-record" ref={sectionRef}>
      <div className="wrap">
        <div style={{ maxWidth: '680px', marginBottom: '44px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--green-emerald-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {courtRecord.tag[lang]}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', color: '#ffffff', margin: '8px 0 12px' }}>
            {courtRecord.heading[lang]}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
            {courtRecord.intro[lang]}
          </p>
        </div>

        {/* 3 Metric Cards with Animated Number Counters (NO PENDING CASES) */}
        <div className="metric-strip-omara">
          {courtRecord.metrics.map((m, idx) => (
            <div key={idx} className="metric-box-omara card-hover-tilt">
              <AnimatedCounter target={m.num} suffix="+" />
              <span className="metric-label-omara">{m.label[lang]}</span>
            </div>
          ))}
        </div>

        {/* Case Type Proportional Breakdown with Fill Animation */}
        <div style={{ background: 'var(--bg-dark-2)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '36px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '24px' }}>
            {lang === 'en' ? 'Matters by Classification on Record' : 'प्रकारानुसार दर्ज विधिक मामले'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {courtRecord.bars.map((item, idx) => (
              <div key={idx} className="bar-row-omara">
                <div className="bar-row-label-omara">{item.label[lang]}</div>
                <div className="bar-track-omara">
                  <div
                    className="bar-fill-omara"
                    style={{ width: inView ? `${item.pct}%` : '0%' }}
                  ></div>
                </div>
                <div className="bar-count-omara">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Courts List */}
        <div style={{ background: 'var(--bg-dark-2)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '36px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>
            {lang === 'en' ? 'Judicial Forums & Subordinate Courts (Sri Ganganagar)' : 'अधीनस्थ न्यायालय (श्री गंगानगर)'}
          </h3>

          <div className="courts-grid-omara">
            {courtRecord.courts.map((court, idx) => (
              <div key={idx} className="court-item-omara court-item-anim">
                <span>{court.name[lang]}</span>
                <span className="court-badge-pill">
                  {court.cases} {lang === 'en' ? 'cases' : 'मामले'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
