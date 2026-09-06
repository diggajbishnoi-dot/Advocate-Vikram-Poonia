import React, { useState } from 'react';
import { content } from '../content';

export default function Testimonials({ lang }) {
  const { testimonials } = content;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === testimonials.cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="wrap">
        {/* Header matching Screenshot 5 */}
        <div className="testimonials-header-omara">
          <div>
            <span className="testimonials-kicker-pill">{testimonials.tag[lang]}</span>
            <h2 className="testimonials-title-omara">{testimonials.heading[lang]}</h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="carousel-nav-arrows">
              <button
                type="button"
                onClick={handlePrev}
                className="carousel-arrow-btn"
                aria-label="Previous testimonial"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="carousel-arrow-btn"
                aria-label="Next testimonial"
              >
                &rarr;
              </button>
            </div>

            <a href="#consultation" className="btn-emerald-pill shimmer-btn">
              <span>{testimonials.viewAllBtn[lang]}</span>
            </a>
          </div>
        </div>

        {/* 3 Testimonial Cards matching Screenshot 5 with interactive focus */}
        <div className="testimonials-grid-omara">
          {testimonials.cards.map((item, idx) => (
            <div
              key={idx}
              className={`testimonial-card-omara card-hover-tilt ${idx === activeIndex ? 'is-active-review' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <h3 className="testimonial-title">{item.title[lang]}</h3>
              <p className="testimonial-quote">"{item.quote[lang]}"</p>

              <div className="testimonial-footer">
                <div className="avatar-initials">{item.initials}</div>
                <div>
                  <div className="testimonial-stars">★★★★★</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{item.location[lang]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
