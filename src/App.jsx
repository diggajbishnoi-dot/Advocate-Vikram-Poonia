import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Credentials from './components/Credentials';
import PracticeAreas from './components/PracticeAreas';
import Testimonials from './components/Testimonials';
import Consultation from './components/Consultation';
import Footer from './components/Footer';
import FloatingBar from './components/FloatingBar';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = sessionStorage.getItem('adv_preferred_lang');
      if (saved === 'hi' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  });

  const [selectedMatter, setSelectedMatter] = useState(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    try {
      sessionStorage.setItem('adv_preferred_lang', lang);
    } catch (e) {}
  }, [lang]);

  return (
    <div className="site-wrapper" id="top">
      {/* 1. Preloader Intro Animation */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 2. Custom Ambient Cursor with Lerp Physics */}
      <CustomCursor />

      {/* 3. Header with Reading Scroll Indicator, Scrollspy, & Magnetic Button */}
      <Header
        lang={lang}
        setLang={setLang}
      />

      <main>
        {/* 4. Bento Hero Grid with Word-Reveal and Staggered Rise-up */}
        <Hero lang={lang} />

        {/* 5. Credentials Strip matching Screenshot 2 */}
        <Credentials lang={lang} />

        {/* 6. Our Areas of Focus with Large Dark Emerald Cards */}
        <PracticeAreas
          lang={lang}
          onSelectMatter={(matter) => {
            setSelectedMatter(matter);
            const el = document.getElementById('consultation');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 7. Words From Our Clients Testimonials with Carousel Controls */}
        <Testimonials lang={lang} />

        {/* 8. Consultation Booking Form saving directly to Backend Database & Excel Sheet */}
        <Consultation
          lang={lang}
          selectedMatter={selectedMatter}
        />
      </main>

      {/* 10. Footer */}
      <Footer
        lang={lang}
      />

      {/* 11. Floating Accessibility & WhatsApp Chat Bar */}
      <FloatingBar lang={lang} />
    </div>
  );
}
