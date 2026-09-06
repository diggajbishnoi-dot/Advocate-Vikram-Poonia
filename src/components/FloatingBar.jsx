import React, { useState, useRef, useEffect } from 'react';

export default function FloatingBar({ lang = 'en' }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef(null);

  const whatsappNumber = '918824597770';

  const defaultGreeting = lang === 'hi'
    ? 'नमस्ते एडवोकेट विक्रम पूनिया, मुझे विधिक परामर्श के संबंध में जानकारी चाहिए।'
    : 'Hello Advocate Vikram Poonia, I would like to consult regarding a legal matter.';

  const quickChips = [
    {
      label: lang === 'hi' ? '⚡ तत्काल जमानत' : '⚡ Urgent Bail',
      text: lang === 'hi'
        ? 'नमस्ते, मुझे श्री गंगानगर कोर्ट में तत्काल जमानत (Bail) के संबंध में परामर्श चाहिए।'
        : 'Hello Advocate Poonia, I require urgent legal assistance regarding a Bail Application in Sri Ganganagar.'
    },
    {
      label: lang === 'hi' ? '⚖️ आपराधिक केस' : '⚖️ Criminal Defense',
      text: lang === 'hi'
        ? 'नमस्ते, मुझे एक आपराधिक मामले (Criminal Defense) में विधिक सलाह चाहिए।'
        : 'Hello Advocate Poonia, I need legal defense consultation regarding a criminal case.'
    },
    {
      label: lang === 'hi' ? '🏛️ पारिवारिक विवाद' : '🏛️ Family Dispute',
      text: lang === 'hi'
        ? 'नमस्ते, मुझे पारिवारिक/वैवाहिक विवाद (Family / Matrimonial Matter) में विधिक सहायता चाहिए।'
        : 'Hello Advocate Poonia, I would like to consult regarding a family/matrimonial legal matter.'
    },
    {
      label: lang === 'hi' ? '📅 चैंबर अपॉइंटमेंट' : '📅 Chamber Appointment',
      text: lang === 'hi'
        ? 'नमस्ते, मैं एडवोकेट विक्रम पूनिया जी से चैंबर में व्यक्तिगत परामर्श हेतु समय लेना चाहता हूँ।'
        : 'Hello, I would like to schedule an in-person legal consultation at Advocate Vikram Poonia Chamber.'
    }
  ];

  const handleStartChat = (customMsg) => {
    const textToSend = customMsg || message.trim() || defaultGreeting;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target) && !e.target.closest('.whatsapp-fab-btn')) {
        setChatOpen(false);
      }
    };
    if (chatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [chatOpen]);

  return (
    <>
      {/* 1. Accessibility Icon (Bottom Left) */}
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

      {/* 2. WhatsApp Floating Action Widget (Bottom Right) */}
      <div className="whatsapp-floating-widget" ref={chatRef}>
        {/* Interactive Chat Popup Window */}
        <div className={`whatsapp-chat-popup ${chatOpen ? 'is-open' : ''}`} aria-hidden={!chatOpen}>
          {/* Header */}
          <div className="wa-popup-header">
            <div className="wa-header-avatar-wrap">
              <img
                src="/images/advocate-vikram-poonia.jpg"
                alt="Advocate Vikram Poonia"
                className="wa-header-avatar"
              />
              <span className="wa-online-pulse" aria-hidden="true" />
            </div>

            <div className="wa-header-info">
              <span className="wa-header-name">Advocate Vikram Poonia</span>
              <span className="wa-header-status">
                {lang === 'hi' ? 'ऑनलाइन · त्वरित उत्तर' : 'Online · Quick Legal Response'}
              </span>
            </div>

            <button
              type="button"
              className="wa-popup-close-btn"
              onClick={() => setChatOpen(false)}
              aria-label="Close WhatsApp chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Body / Chat Bubble */}
          <div className="wa-popup-body">
            <div className="wa-chat-bubble-received">
              <p className="wa-bubble-text">
                {lang === 'hi'
                  ? 'नमस्ते! विक्रम पूनिया विधिक चैंबर में आपका स्वागत है। आपके केस या विधिक परामर्श के संबंध में हम कैसे सहायता कर सकते हैं?'
                  : 'Namaste! Welcome to Advocate Vikram Poonia Law Chamber. How may we assist you with your legal representation or consultation today?'}
              </p>
              <span className="wa-bubble-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Quick Topic Chips */}
            <div className="wa-quick-chips">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="wa-chip-btn"
                  onClick={() => handleStartChat(chip.text)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer / Input Area */}
          <div className="wa-popup-footer">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartChat(message);
              }}
              className="wa-input-row"
            >
              <input
                type="text"
                className="wa-input-field"
                placeholder={lang === 'hi' ? 'अपना संदेश यहां टाइप करें...' : 'Type your legal query...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="wa-send-btn"
                aria-label="Send message on WhatsApp"
                title="Send on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-direct-link-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.65.81-.8 1-.15.16-.3.18-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.13.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.22-.16-.47-.29z"/>
              </svg>
              <span>{lang === 'hi' ? 'सीधे व्हाट्सएप पर बात करें' : 'Open Directly in WhatsApp (8824597770)'}</span>
            </a>
          </div>
        </div>

        {/* Floating Trigger Button (FAB) */}
        <button
          type="button"
          className="whatsapp-fab-btn"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Chat on WhatsApp with Advocate Vikram Poonia"
          title="Chat on WhatsApp (+91 88245 97770)"
        >
          {/* Animated pulse ring */}
          <span className="wa-fab-pulse" aria-hidden="true" />

          {/* Official WhatsApp Icon */}
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#ffffff" className="wa-fab-icon">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.204 8.204 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.65.81-.8 1-.15.16-.3.18-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.56.13.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.22-.16-.47-.29z"/>
          </svg>

          {/* Hover Tooltip on desktop */}
          <span className="wa-fab-tooltip">
            {lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}
          </span>
        </button>
      </div>
    </>
  );
}
