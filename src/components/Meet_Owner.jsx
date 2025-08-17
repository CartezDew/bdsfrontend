import React from 'react';
import CEOImage from '../assets/Images/CEO.jpeg';

const Meet_Owner = () => {
  return (
    <section className="meet-owner-section">
      <div className="container">
        <div className="section-header">
          <h2>Meet Brandon Davis</h2>
          <div className="accent-line"></div>
        </div>
        
        <div className="owner-content">
          <div className="owner-image">
            <img 
              src={CEOImage} 
              alt="Brandon Davis, CEO of BDS Talent Group" 
              className="ceo-image"
            />
          </div>
          
          <div className="owner-bio">
            <h3>CEO & Principal</h3>
            <p>
              Brandon Davis is the CEO of BDS Talent Group and a seasoned accountant with more than 14 years 
              of experience in accounting, tax, and bookkeeping. An active member of the Atlanta Accounting 
              and Tax Society and LaunchGSU, he has advised clients across diverse industries—including law, 
              real estate, charter bus and transportation, healthcare, restaurants, construction, and a broad 
              range of small businesses.
            </p>
            
            <p>
              Guided by the principle <strong>"Peace of mind, accounted for!"</strong>, Brandon is known for 
              meticulous attention to detail and industry-specific expertise. He delivers transparent, accurate 
              financials that enable leaders to make confident decisions.
            </p>
            
            <p>
              Equally important, he is committed to equity—expanding access to reliable, affordable accounting 
              services for underserved entrepreneurs and the communities they power. At BDS Talent Group, that 
              commitment is reflected in clear communication, practical solutions, and measurable outcomes that 
              move clients forward.
            </p>
            
            <div className="owner-credentials">
              <div className="credential">
                <span className="credential-icon">👑</span>
                <span>CEO of BDS Talent Group</span>
              </div>
              <div className="credential">
                <span className="credential-icon">📊</span>
                <span>14+ Years in Accounting, Tax & Bookkeeping</span>
              </div>
              <div className="credential">
                <span className="credential-icon">🏢</span>
                <span>Member of Atlanta Accounting and Tax Society</span>
              </div>
              <div className="credential">
                <span className="credential-icon">🚀</span>
                <span>Active Member of LaunchGSU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meet_Owner;
