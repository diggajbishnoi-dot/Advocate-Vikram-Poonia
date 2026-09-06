import React from 'react';
import { content } from '../content';

export default function PracticeAreas({ lang, onSelectMatter }) {
  const { focusAreas } = content;

  return (
    <section className="focus-areas-section" id="focus-areas">
      <div className="wrap">
        {/* Section Header (Exact O'Mara Screenshot 3) */}
        <div className="focus-header-omara">
          <h2 className="focus-heading-left">{focusAreas.heading[lang]}</h2>
          <p className="focus-intro-right">{focusAreas.intro[lang]}</p>
        </div>

        {/* Stack of Big Dark Green Horizontal Cards (Exact O'Mara Screenshot 3 & 4) */}
        <div className="focus-cards-stack">
          {focusAreas.cards.map((card, idx) => (
            <div key={idx} className="focus-card-green">
              {/* Top Tag Line */}
              <div className="focus-card-top-tag">
                <span className="num-badge">{card.num}</span>
                <span>{card.tag[lang]}</span>
              </div>

              {/* 3-Column Internal Layout */}
              <div className="focus-card-layout">
                {/* Column 1: Image / Illustration Frame */}
                {card.image ? (
                  <div className="focus-img-real-frame">
                    <img
                      src={card.image}
                      alt={card.tag[lang]}
                      className="focus-card-illustration"
                    />
                  </div>
                ) : (
                  <div className="focus-img-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>{card.placeholderLabel[lang]}</span>
                  </div>
                )}

                {/* Column 2: Big Serif Headline */}
                <div className="focus-headline-col">
                  <h3>{card.headline[lang]}</h3>
                  <div className="focus-subhead">{card.subheadline[lang]}</div>
                </div>

                {/* Column 3: Paragraph & White Pill Button */}
                <div className="focus-body-col">
                  <p>{card.body[lang]}</p>
                  <a
                    href="#consultation"
                    className="btn-white-pill"
                    onClick={() => {
                      if (onSelectMatter) onSelectMatter(card.tag.en);
                    }}
                  >
                    {card.btn[lang]}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
