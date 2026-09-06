import React from 'react';
import { content } from '../content';

export default function Credentials({ lang }) {
  const { credentials } = content;

  return (
    <section className="credentials-omara" id="credentials">
      <div className="wrap">
        <div className="credentials-grid-omara">
          {credentials.map((item, idx) => (
            <div key={idx} className="cred-card-omara">
              <h3 className="cred-title-omara">{item.title[lang]}</h3>
              <div className="cred-divider-omara"></div>
              <p className="cred-desc-omara">{item.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
