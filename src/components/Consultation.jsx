import React, { useState, useEffect } from 'react';
import { content } from '../content';

export default function Consultation({ lang, selectedMatter, onConsultationAdded }) {
  const { consultation } = content;
  const { fields } = consultation;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    matterType: 'Criminal Defense',
    urgency: 'Immediate (Within 24 Hours)',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    refId: null
  });

  useEffect(() => {
    if (selectedMatter) {
      setFormData(prev => ({ ...prev, matterType: selectedMatter }));
    }
  }, [selectedMatter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus(prev => ({
        ...prev,
        error: lang === 'en' ? 'Please provide your full name and phone number.' : 'कृपया अपना पूरा नाम और फोन नंबर दर्ज करें।'
      }));
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null, refId: null });

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          submitting: false,
          submitted: true,
          refId: data.consultation?.id || data.id || 'VP-2026-CONFIRMED'
        });
      } else {
        throw new Error(data.error || 'Failed to submit consultation');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({
        submitting: false,
        submitted: false,
        error: lang === 'en' ? 'Unable to connect to chamber server. Please call directly.' : 'चैंबर सर्वर से संपर्क नहीं हो सका। कृपया सीधे फोन करें।',
        refId: null
      });
    }
  };

  return (
    <section className="consultation-omara" id="consultation">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)', fontFamily: 'var(--f-serif)', color: '#ffffff', marginBottom: '14px' }}>
            {consultation.heading[lang]}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.65 }}>
            {consultation.subtitle[lang]}
          </p>
        </div>

        <div className="consultation-box">
          {status.submitted ? (
            <div className="consultation-success-card">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>

              <h3>{lang === 'en' ? 'Consultation Request Confirmed' : 'परामर्श आवेदन सफलतापूर्वक दर्ज हुआ'}</h3>

              <p style={{ color: '#d1d5db', fontSize: '0.96rem', maxWidth: '520px', margin: '0 auto' }}>
                {lang === 'en'
                  ? 'Your case inquiry has been securely stored in Advocate Vikram Poonia’s chamber database. Our office will review the matter and contact you shortly.'
                  : 'आपकी जानकारी अधिवक्ता विक्रम पूनिया के चैंबर डेटाबेस में सुरक्षित दर्ज हो गई है। हमारा कार्यालय शीघ्र आपसे संपर्क करेगा।'}
              </p>

              <div className="ref-pill">
                {lang === 'en' ? 'Reference ID:' : 'संदर्भ संख्या:'} {status.refId}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-emerald-pill"
                  onClick={() => {
                    setStatus({ submitting: false, submitted: false, error: null, refId: null });
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      matterType: 'Criminal Defense',
                      urgency: 'Immediate (Within 24 Hours)',
                      message: ''
                    });
                  }}
                >
                  {lang === 'en' ? 'Submit Another Request' : 'अन्य आवेदन दर्ज करें'}
                </button>

                <a href={`tel:${content.header.phone}`} className="btn-emerald-pill" style={{ background: '#203c31', border: '1px solid #3e6857' }}>
                  {lang === 'en' ? 'Call Chamber Directly' : 'चैंबर को सीधे फोन करें'}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {status.error && (
                <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '6px', color: '#fca5a5', marginBottom: '24px', fontSize: '0.9rem' }}>
                  {status.error}
                </div>
              )}

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="name">{fields.name[lang]}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={lang === 'en' ? 'e.g. Ramesh Kumar' : 'उदा. रमेश कुमार'}
                    className="input-omara"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">{fields.phone[lang]}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="input-omara"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="email">{fields.email[lang]}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="client@example.com"
                    className="input-omara"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="matterType">{fields.matter[lang]}</label>
                  <select
                    id="matterType"
                    name="matterType"
                    className="input-omara"
                    value={formData.matterType}
                    onChange={handleChange}
                  >
                    <option value="Criminal Defense">{lang === 'en' ? 'Criminal Defense & Trial' : 'आपराधिक बचाव एवं ट्रायल'}</option>
                    <option value="Bail & Anticipatory Relief">{lang === 'en' ? 'Bail & Anticipatory Bail' : 'जमानत एवं अग्रिम जमानत'}</option>
                    <option value="Family Law">{lang === 'en' ? 'Family Law & Matrimonial Dispute' : 'पारिवारिक एवं वैवाहिक विवाद'}</option>
                    <option value="Special Court Proceedings">{lang === 'en' ? 'Special Courts (SC/ST, POCSO)' : 'विशेष न्यायालयीन मामले'}</option>
                    <option value="Cheque Bounce / 138 NI Act">{lang === 'en' ? 'Cheque Bounce / 138 NI Act' : 'चेक बाउंस (138 NI Act)'}</option>
                    <option value="General Consultation">{lang === 'en' ? 'Other Legal Consultation' : 'अन्य विधिक परामर्श'}</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">{fields.message[lang]}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder={lang === 'en'
                    ? 'Please describe your legal situation, upcoming court date, or police notice...'
                    : 'कृपया अपने मामले का विवरण, आगामी न्यायालयीन तिथि अथवा पुलिस नोटिस का उल्लेख करें...'}
                  className="input-omara"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="btn-submit-omara"
              >
                {status.submitting ? fields.submitting[lang] : fields.submit[lang]}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
