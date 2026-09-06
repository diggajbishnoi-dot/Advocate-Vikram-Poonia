import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { content } from '../content';

export default function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contactBtnRef = useRef(null);
  const { header } = content;

  // Track scroll position for transparency glassmorphism & reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 15);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        const progress = Math.min((scrollY / winHeight) * 100, 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic effect on Contact Us button
  useEffect(() => {
    const btn = contactBtnRef.current;
    if (!btn || !window.matchMedia('(pointer: fine)').matches) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    };

    const onMouseLeave = () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when overlay menu is open to prevent page bleed-through
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled-transparent' : ''}`}>
        {/* Reading Progress Indicator */}
        <div
          className="scroll-progress-indicator"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="header-inner-fluid">
          {/* Left Corner: Vikram Poonia Name */}
          <a href="#top" className="brand-omara" aria-label="Advocate Vikram Poonia">
            <div className="brand-script">
              {header.brandName[lang]}
              <span>{header.brandSub[lang]}</span>
            </div>
          </a>

          {/* Right Corner: Language Toggle, Phone, Contact Us Button, and Menu Button */}
          <div className="header-right">
            {/* Language Switch Toggle Pill */}
            <div className="lang-switch-pill" role="group" aria-label="Language switch">
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                className={lang === 'hi' ? 'active' : ''}
                onClick={() => setLang('hi')}
                aria-label="Switch to Hindi"
              >
                HI
              </button>
            </div>

            {/* Phone Link */}
            <a href={`tel:${header.phone}`} className="header-phone-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{header.phone}</span>
            </a>

            {/* Contact Us Green Pill Button */}
            <a
              ref={contactBtnRef}
              href="#consultation"
              className="btn-emerald-pill magnetic-btn shimmer-btn header-contact-btn"
            >
              <span>{header.contactBtn[lang]}</span>
            </a>

            {/* Menu Button (Hamburger) */}
            <button
              type="button"
              className={`hamburger-btn ${menuOpen ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Overlay Menu (Attached to body via Portal) */}
      {typeof document !== 'undefined' && createPortal(
        <div className={`fullscreen-nav-overlay ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation Menu">
          {/* Background ambient radial glow */}
          <div className="overlay-bg-ambient" aria-hidden="true" />

        <div className="fullscreen-nav-container">
          {/* Top Bar inside Menu */}
          <div className="overlay-topbar">
            <div className="brand-script" style={{ fontSize: '1.5rem' }}>
              {header.brandName[lang]}
              <span>{header.brandSub[lang]}</span>
            </div>

            <div className="overlay-top-actions">
              {/* Language Switch */}
              <div className="lang-switch-pill" role="group" aria-label="Language selection">
                <button
                  type="button"
                  className={lang === 'en' ? 'active' : ''}
                  onClick={() => setLang('en')}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  className={lang === 'hi' ? 'active' : ''}
                  onClick={() => setLang('hi')}
                  aria-label="Switch to Hindi"
                >
                  HI
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                className="overlay-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>{lang === 'hi' ? 'बंद करें' : 'Close'}</span>
              </button>
            </div>
          </div>

          {/* Main Content: 2-Column Split Layout */}
          <div className="overlay-main-grid">
            {/* Left Column: Chamber Info & Contact Highlights */}
            <div className="overlay-chamber-col">
              <div className="chamber-col-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v17M4 7h16M4 7l-2 7h6l-2-7zm12 0l-2 7h6l-2-7zM7 21h10" />
                </svg>
                <span>{lang === 'hi' ? 'बार एसोसिएशन श्रीगंगानगर' : 'Bar Association Sri Ganganagar'}</span>
              </div>

              <h3 className="chamber-col-title">
                {lang === 'hi' 
                  ? 'आपराधिक बचाव एवं पारिवारिक विधिक सेवा' 
                  : 'Criminal Defense & Family Law Chamber'}
              </h3>
              <p className="chamber-col-desc">
                {lang === 'hi'
                  ? 'जिला एवं सत्र न्यायालय श्रीगंगानगर तथा राजस्थान उच्च न्यायालय में 126+ दर्ज मुकदमों का अनुभव एवं विश्वसनीय पैरवी।'
                  : 'Dedicated courtroom advocacy, trial defense, and matrimonial legal consultation across Rajasthan courts with utmost confidentiality.'}
              </p>

              <div className="chamber-quick-info">
                <div className="quick-info-row">
                  <span className="quick-info-label">{lang === 'hi' ? 'मुख्य चैंबर:' : 'Chamber Desk:'}</span>
                  <span className="quick-info-val">Chamber #24, District Court Complex, Sri Ganganagar</span>
                </div>
                <div className="quick-info-row">
                  <span className="quick-info-label">{lang === 'hi' ? 'हेल्पलाइन:' : 'Direct Phone:'}</span>
                  <a href={`tel:${header.phone}`} className="quick-info-link">{header.phone}</a>
                </div>
                <div className="quick-info-row">
                  <span className="quick-info-label">{lang === 'hi' ? 'परामर्श समय:' : 'Consultation Hours:'}</span>
                  <span className="quick-info-val">{lang === 'hi' ? 'सोमवार - शनिवार (10:00 AM - 7:00 PM)' : 'Mon - Sat (10:00 AM - 7:00 PM)'}</span>
                </div>
              </div>

              {/* Direct Confidential Consultation Booking CTA */}
              <a
                href="#consultation"
                onClick={() => setMenuOpen(false)}
                className="chamber-inquiries-btn shimmer-btn"
                style={{ textDecoration: 'none' }}
              >
                <div className="inq-btn-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{lang === 'hi' ? 'गोपनीय परामर्श बुक करें' : 'Book Confidential Consultation'}</span>
                </div>
                <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
              </a>
            </div>

            {/* Right Column: Menu Options Navigation Cards */}
            <nav className="overlay-nav-grid" aria-label="Main Navigation">
              {header.nav.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="menu-option-card"
                  style={{ '--delay': `${idx * 0.05}s` }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="option-card-left">
                    <span className="option-num">{item.num || `0${idx + 1}`}</span>
                    <div className="option-text-group">
                      <span className="option-title">{item.label[lang]}</span>
                      <span className="option-desc">{item.desc ? item.desc[lang] : ''}</span>
                    </div>
                  </div>
                  <div className="option-arrow-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
);
}
