import React from 'react';
import { content } from '../content';

export default function Contact({ lang }) {
  const { contact } = content;

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">
            <span className="kicker-rule"></span>
            <span className="kicker-text">{contact.kicker[lang]}</span>
          </div>
          <h2>{contact.heading[lang]}</h2>
          <p>{contact.subtitle[lang]}</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card reveal in">
            {contact.rows.map((row, idx) => {
              const valDisplay = typeof row.val === 'object' ? row.val[lang] : row.val;
              return (
                <div key={idx} className="contact-row">
                  <div className="contact-key">{row.key[lang]}</div>
                  <div className="contact-val">{valDisplay}</div>
                </div>
              );
            })}
            <div className="contact-note">
              {contact.note[lang]}
            </div>
          </div>

          {/* Exterior Courthouse Placeholder */}
          <div className="exterior-placeholder reveal in">
            <div className="placeholder-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 21v-7m0-4V3l8-2 8 2v7m0 4v7M2 21h20M9 9h6M9 13h6M9 17h6"></path>
              </svg>
              <span>{contact.exteriorPlaceholder[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
