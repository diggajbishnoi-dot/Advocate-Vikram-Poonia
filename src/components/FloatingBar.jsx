import React from 'react';

export default function FloatingBar() {
  return (
    <>
      {/* Accessibility Icon (Bottom Left) */}
      <button
        type="button"
        className="accessibility-icon-corner"
        aria-label="Accessibility Options"
        title="Accessibility Settings"
        onClick={() => {
          document.body.classList.toggle('high-contrast');
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      </button>
    </>
  );
}
