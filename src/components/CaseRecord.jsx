import React, { useEffect, useState, useRef } from 'react';
import { content } from '../content';

export default function CaseRecord({ lang }) {
  const { caseRecord } = content;
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
    <section className="case-record" id="case-record" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">
            <span className="kicker-rule"></span>
            <span className="kicker-text">{caseRecord.kicker[lang]}</span>
          </div>
          <h2>{caseRecord.heading[lang]}</h2>
          <p>{caseRecord.intro[lang]}</p>
        </div>

        {/* Horizontal Bar List */}
        <div className="bar-list">
          {caseRecord.bars.map((item, idx) => {
            const countDisplay = typeof item.count === 'number' 
              ? item.count 
              : (lang === 'hi' && item.countHi ? item.countHi : item.count);

            return (
              <div
                key={idx}
                className={`bar-row reveal in ${inView ? 'in' : ''}`}
                style={{ '--pct': `${item.pct}%` }}
              >
                <div className="bar-label">{item.label[lang]}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: inView ? `${item.pct}%` : '0%' }}
                  ></div>
                </div>
                <div className="bar-count">{countDisplay}</div>
              </div>
            );
          })}
        </div>

        {/* 3 Status Chips */}
        <div className="status-chips reveal in">
          {caseRecord.chips.map((chip, idx) => (
            <div key={idx} className="chip">
              <span className="chip-num">{chip.num}</span>
              <span className="chip-label">{chip.label[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
