import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AvoidConfusion = () => {
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const avoidConfusionRef = useRef(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationsTriggered) {
            setAnimationsTriggered(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (avoidConfusionRef.current) {
      observer.observe(avoidConfusionRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  return (
    <section 
      ref={avoidConfusionRef}
      className={`avoid-confusion-section ${animationsTriggered ? 'avoid-confusion-section-animated' : ''}`}
    >
      <div className={`avoid-confusion-container ${animationsTriggered ? 'avoid-confusion-container-animated' : ''}`}>
        <div className={`avoid-confusion-header ${animationsTriggered ? 'avoid-confusion-header-animated' : ''}`}>
          <h2 className={animationsTriggered ? 'avoid-confusion-title-animated' : ''}>Not Sure Where to Start?</h2>
          <p className={animationsTriggered ? 'avoid-confusion-subtitle-animated' : ''}>Choose the option that best fits your needs</p>
        </div>
        
        <div className={`cta-options ${animationsTriggered ? 'cta-options-animated' : ''}`}>
          <div className={`cta-option ${animationsTriggered ? 'cta-option-animated' : ''}`}>
            <div className={`cta-content ${animationsTriggered ? 'cta-content-animated' : ''}`}>
              <h3>Get Started (Upload Now)</h3>
              <p className="cta-description">Best if you're ready to send documents</p>
              <ul className="cta-benefits">
                <li>No appointment required</li>
                <li>We begin work immediately and follow up</li>
              </ul>
              <Link to="/get-started" className="cta-button-primary-avoid-confusion">
                Get Started
              </Link>
              <p className="cta-alternative">
                Prefer talking first? <Link to="/get-started">Schedule an Appointment</Link>.
              </p>
            </div>
          </div>
          
          <div className={`cta-option ${animationsTriggered ? 'cta-option-animated' : ''}`}>
            <div className={`cta-content ${animationsTriggered ? 'cta-content-animated' : ''}`}>
              <h3>Schedule an Appointment</h3>
              <p className="cta-description">Best for complex questions or planning</p>
              <ul className="cta-benefits">
                <li>New clients or special situations</li>
                <li>Prefer a live walkthrough</li>
              </ul>
              <Link to="/get-started" className="cta-button-secondary-avoid-confusion">
                Schedule Appointment
              </Link>
              <p className="cta-alternative">
                Ready to skip the calendar? <Link to="/get-started">Get Started</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvoidConfusion;
