import React from 'react';
import { content } from '../content';

export default function Journey({ lang }) {
  const { journey } = content;

  return (
    <section className="journey-section" id="journey">
      <div className="wrap">
        <div className="journey-grid">
          {/* Journey Overview Narrative */}
          <div className="journey-body">
            <div className="section-head" style={{ marginBottom: '28px' }}>
              <div className="section-kicker">
                <span className="kicker-rule"></span>
                <span className="kicker-text">{journey.kicker[lang]}</span>
              </div>
              <h2>{journey.heading[lang]}</h2>
            </div>

            <p>{journey.p1[lang]}</p>
            <p>{journey.p2[lang]}</p>

            <div style={{ marginTop: '28px' }}>
              <a href="#consultation" className="btn btn-maroon">
                {lang === 'en' ? 'Discuss Your Matter With Advocate' : 'अधिवक्ता से विधिक परामर्श करें'}
              </a>
            </div>
          </div>

          {/* 4 Professional Pillar Cards */}
          <div className="journey-cards">
            {journey.highlights.map((item, idx) => (
              <div key={idx} className="journey-card">
                <span className="journey-num">{item.num}</span>
                <h4>{item.title[lang]}</h4>
                <p>{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
