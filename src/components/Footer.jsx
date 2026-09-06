import React from 'react';
import { content } from '../content';

export default function Footer({ lang, onOpenInquiries }) {
  const { footer } = content;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top-row">
          <div>
            <div className="footer-brand-title">{footer.brandName[lang]}</div>
            <div style={{ color: '#d1d5db', fontSize: '0.88rem' }}>{footer.sub[lang]}</div>
          </div>

          <div className="footer-disclaimer-text">
            {footer.disclaimer[lang]}
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>&copy; {currentYear} {footer.brandName[lang]}. {footer.rights[lang]}</span>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#top" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.88rem' }}>Back to top &uarr;</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
