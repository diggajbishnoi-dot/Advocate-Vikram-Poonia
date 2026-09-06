import React, { useRef } from 'react';
import { content } from '../content';

export default function Hero({ lang }) {
  const { hero } = content;
  const cards = hero.cards;
  const gridRef = useRef(null);

  // Spotlight mouse-tracking effect for bento cards
  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.bento-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section className="hero-omara" id="hero" onMouseMove={handleMouseMove}>
      {/* Master Background - Rajasthan High Court Sabse Peeche with Slow Move Animation */}
      <div className="hero-master-bg-wrap" aria-hidden="true">
        <img
          src="/images/rajasthan-high-court.jpg"
          alt="Rajasthan High Court Background"
          className="hero-master-bg-img"
        />
        <div className="hero-master-bg-overlay" />
      </div>

      <div className="wrap hero-wrap-content">
        <div className="bento-grid" ref={gridRef}>
          {/* Tall Card on Left (Span 2 rows) with Advocate Vikram Poonia Portrait */}
          <div className="bento-card tall animate-rise" style={{ '--stagger': '0.1s' }}>
            {/* Advocate Portrait Visual Background */}
            <div className="tall-portrait-bg-wrap" aria-hidden="true">
              <img
                src="/images/advocate-vikram-poonia.jpg"
                alt="Advocate Vikram Poonia"
                className="tall-portrait-img"
              />
              <div className="tall-portrait-gradient-overlay" />
            </div>

            <div className="card-spotlight-glow" aria-hidden="true" />

            {/* Top Pill Badge */}
            <div className="tall-top-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                <path d="M12 3v17M4 7h16M4 7l-2 7h6l-2-7zm12 0l-2 7h6l-2-7zM7 21h10" />
              </svg>
              <span>{lang === 'hi' ? 'जिला न्यायालय' : 'District Court'}</span>
            </div>

            {/* Welcome Text */}
            <div className="tall-content">
              <h1 className="tall-welcome">
                <span className="split-reveal-line">{hero.welcome[lang]}</span>
                <span className="split-reveal-line highlight-name">{hero.chamberTitle[lang]}</span>
              </h1>
              <p className="tall-subtitle animate-fade" style={{ '--delay': '0.35s' }}>
                {hero.subtitle[lang]}
              </p>
            </div>
          </div>

          {/* Card 2: Top Middle - Client Chamber Consultation with Cleaned Photo */}
          <div className="bento-card item card-has-photo animate-rise" style={{ '--stagger': '0.2s' }}>
            {/* Consultation Visual Photo */}
            <div className="card-photo-bg-wrap" aria-hidden="true">
              <img
                src="/images/chamber-consultation.jpg"
                alt="Client Chamber Consultation"
                className="card-bg-photo"
              />
              <div className="card-photo-gradient-overlay" />
            </div>

            <div className="card-spotlight-glow" aria-hidden="true" />

            <div className="card-photo-content">
              <div className="card-photo-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="card-photo-title">{cards[1].label[lang]}</span>
              <span className="card-photo-sub">{cards[1].sub[lang]}</span>
            </div>
          </div>

          {/* Card 3: Top Right - District & Sessions Courtroom with Photo */}
          <div className="bento-card item card-has-photo animate-rise" style={{ '--stagger': '0.3s' }}>
            {/* Courtroom Visual Photo */}
            <div className="card-photo-bg-wrap" aria-hidden="true">
              <img
                src="/images/courtroom-appearances.jpg"
                alt="District & Sessions Courtroom"
                className="card-bg-photo"
              />
              <div className="card-photo-gradient-overlay" />
            </div>

            <div className="card-spotlight-glow" aria-hidden="true" />

            <div className="card-photo-content">
              <div className="card-photo-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <span className="card-photo-title">{cards[2].label[lang]}</span>
              <span className="card-photo-sub">{cards[2].sub[lang]}</span>
            </div>
          </div>

          {/* Card 4: Bottom Middle - Associate Counsel & Bar Record with Photo */}
          <div className="bento-card item card-has-photo animate-rise" style={{ '--stagger': '0.4s' }}>
            {/* Bar Association Felicitation Visual Photo */}
            <div className="card-photo-bg-wrap" aria-hidden="true">
              <img
                src="/images/bar-association-felicitation.jpg"
                alt="Bar Association Sri Ganganagar Felicitation"
                className="card-bg-photo"
                style={{ objectPosition: 'center 35%' }}
              />
              <div className="card-photo-gradient-overlay" />
            </div>

            <div className="card-spotlight-glow" aria-hidden="true" />

            <div className="card-photo-content">
              <div className="card-photo-icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <span className="card-photo-title">{cards[3].label[lang]}</span>
              <span className="card-photo-sub">{cards[3].sub[lang]}</span>
            </div>
          </div>

          {/* Card 5: Bottom Right (Contact Us button removed as requested) */}
          <div className="bento-card item animate-rise" style={{ '--stagger': '0.5s' }}>
            <div className="card-spotlight-glow" aria-hidden="true" />
            <div className="placeholder-inner-frame">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span className="placeholder-title">{cards[4].label[lang]}</span>
              <span className="placeholder-sub">{cards[4].sub[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
