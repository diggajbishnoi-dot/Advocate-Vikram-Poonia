import React, { useState } from 'react';
import { content } from '../content';

export default function CaseStudies({ lang }) {
  const { caseStudies } = content;
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: caseStudies.filterAll[lang] },
    { id: 'bail', label: lang === 'en' ? 'Bail & Liberty' : 'जमानत व स्वतंत्रता' },
    { id: 'criminal', label: lang === 'en' ? 'Criminal Trial' : 'आपराधिक ट्रायल' },
    { id: 'family', label: lang === 'en' ? 'Family Law' : 'पारिवारिक विधि' },
    { id: 'revisions', label: lang === 'en' ? 'Revision & Appeals' : 'पुनरीक्षण व अपील' }
  ];

  const filteredStudies = activeTab === 'all'
    ? caseStudies.studies
    : caseStudies.studies.filter(item => item.category === activeTab);

  return (
    <section className="case-studies-section" id="case-studies">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">
            <span className="kicker-rule"></span>
            <span className="kicker-text" style={{ color: 'var(--gold-light)' }}>
              {caseStudies.kicker[lang]}
            </span>
          </div>
          <h2 style={{ color: '#ffffff' }}>{caseStudies.heading[lang]}</h2>
          <p style={{ color: '#9ca3af' }}>{caseStudies.subtitle[lang]}</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Case Study Filters">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="case-studies-grid">
          {filteredStudies.map((study) => (
            <article key={study.id} className="case-study-card">
              <div className="cs-header">
                <span className="cs-category-badge">{study.categoryLabel[lang]}</span>
                <span className="cs-court">{study.court[lang]}</span>
              </div>

              <h3>{study.title[lang]}</h3>

              <div className="cs-block">
                <div className="cs-label">{lang === 'en' ? 'The Legal Challenge / Facts' : 'तथ्य एवं विधिक चुनौती'}</div>
                <p className="cs-text">{study.facts[lang]}</p>
              </div>

              <div className="cs-block">
                <div className="cs-label">{lang === 'en' ? 'Advocate Strategy & Court Argument' : 'रणनीति एवं न्यायालयीन बहस'}</div>
                <p className="cs-text">{study.strategy[lang]}</p>
              </div>

              <div className="cs-outcome-box">
                <div className="cs-label">{lang === 'en' ? 'Judicial Order & Case Outcome' : 'न्यायालयीन आदेश एवं परिणाम'}</div>
                <p className="cs-text">{study.outcome[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
