import React, { useEffect } from 'react';
import { content } from '../content';

export default function InquiriesModal({ isOpen, onClose, inquiries, onRefresh, lang }) {
  const { inquiriesModal } = content;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{lang === 'en' ? 'Chamber Consultations Database' : 'चैंबर परामर्श डेटाबेस'}</h3>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              {lang === 'en'
                ? `Saved to backend data/consultations.json · Total Records: ${inquiries.length}`
                : `बैकएंड में सुरक्षित · कुल रिकॉर्ड: ${inquiries.length}`}
            </span>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="modal-content-scroll">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button
              type="button"
              className="btn-emerald-pill"
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
              onClick={onRefresh}
            >
              &#x21bb; {lang === 'en' ? 'Refresh Inquiries' : 'रिफ्रेश करें'}
            </button>
          </div>

          {inquiries.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
              {lang === 'en' ? 'No consultation requests recorded yet.' : 'अभी तक कोई आवेदन दर्ज नहीं हुआ है।'}
            </p>
          ) : (
            inquiries.map((item) => (
              <div key={item.id} className="inquiry-row">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>{item.name}</strong>
                    <span style={{ marginLeft: '12px', fontSize: '0.9rem', color: 'var(--green-emerald-light)', fontWeight: 600 }}>
                      &#9742; {item.phone}
                    </span>
                    {item.email && (
                      <span style={{ marginLeft: '10px', fontSize: '0.84rem', color: '#9ca3af' }}>
                        &bull; {item.email}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                    {new Date(item.createdAt).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN')}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
                  <span style={{ background: '#203c31', color: '#a7f3d0', padding: '2px 10px', borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600 }}>
                    {item.matterType}
                  </span>
                  {item.urgency && (
                    <span style={{ background: '#3b2f15', color: '#fde68a', padding: '2px 10px', borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600 }}>
                      {item.urgency}
                    </span>
                  )}
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', marginLeft: 'auto' }}>
                    ID: {item.id}
                  </span>
                </div>

                {item.message && (
                  <p style={{ fontSize: '0.88rem', color: '#d1d5db', marginTop: '8px', background: '#141414', padding: '8px 12px', borderRadius: '6px', border: '1px solid #282828' }}>
                    {item.message}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
