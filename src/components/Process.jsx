import React from 'react';
import { content } from '../content';

export default function Process({ lang }) {
  const { process } = content;

  return (
    <section className="process-section dark-bg" id="process">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">
            <span className="kicker-rule"></span>
            <span className="kicker-text">{process.kicker[lang]}</span>
          </div>
          <h2>{process.heading[lang]}</h2>
          <p>{process.subtitle[lang]}</p>
        </div>

        <div className="process-steps-omara">
          {process.steps.map((step, idx) => (
            <div key={idx} className="process-step-box">
              <span className="process-step-num">{step.num}</span>
              <h4>{step.title[lang]}</h4>
              <p>{step.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
