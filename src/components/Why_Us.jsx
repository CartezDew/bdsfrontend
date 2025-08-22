// src/components/Why_Us.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Why_Us() {
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const whyUsRef = useRef(null);

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
      { threshold: 0.05 }
    );

    if (whyUsRef.current) {
      observer.observe(whyUsRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  return (
    <section 
      ref={whyUsRef}
      id="why-us" 
      aria-labelledby="whyus-title" 
      className={`whyus ${animationsTriggered ? 'whyus-animated' : ''}`}
    >
      <div className={`whyus__inner ${animationsTriggered ? 'whyus__inner-animated' : ''}`}>
        {/* Header */}
        <header className={`whyus__header ${animationsTriggered ? 'whyus__header-animated' : ''}`}>
          <div className={`whyus__header-content ${animationsTriggered ? 'whyus__header-content-animated' : ''}`}>
            <h2 id="whyus-title" className={`whyus__title ${animationsTriggered ? 'whyus__title-animated' : ''}`}>
              Why BDS Talent Group
            </h2>
            <p className={`whyus__kicker ${animationsTriggered ? 'whyus__kicker-animated' : ''}`}>Business • Development • Solutions</p>

            {/* Merged hero message */}
            <p className={`whyus__lede ${animationsTriggered ? 'whyus__lede-animated' : ''}`}>
              We keep your books clean, your filings on time, and your decisions
              data-backed—so you can focus on growth.{" "}
              <br />
              <br />
               We support <strong>growing businesses & individual taxpayers</strong> (from simple returns to complex,
              year-end filings). That's the BDS way!
            </p>
          </div>
          <div className={`whyus__grid-image ${animationsTriggered ? 'whyus__grid-image-animated' : ''}`}>
            <img 
              src="/multi-ethnic-group-three-young-people-studying-together.png" 
              alt="Business professionals shaking hands in partnership" 
              className={`whyus__business-image ${animationsTriggered ? 'whyus__business-image-animated' : ''}`}
            />
          </div>
        </header>

        {/* Bullets */}
        <ul className={`whyus__list ${animationsTriggered ? 'whyus__list-animated' : ''}`} role="list">
          <li>
            <strong>14+ years</strong> across tax, bookkeeping, and full-cycle
            accounting
          </li>
          <li>
            <strong>100% on-time filings</strong> and audit-ready records
          </li>
          <li>
            <strong>200+ clients served</strong> with transparent, accurate
            financials
          </li>
          <li>
            <strong>Industry memberships:</strong> Atlanta Accounting & Tax Society; LaunchGSU network.
          </li>
          <li>
            <strong>Launch &amp; level-up support:</strong> new business setups,
            cleanup/catch-up, and monthly care
          </li>
          <li>
            <strong>Community-first approach</strong> expanding access to reliable, affordable accounting
          </li>
        </ul>
        
        {/* Schedule Consultation Button */}
        <div className={`whyus__cta-container ${animationsTriggered ? 'whyus__cta-container-animated' : ''}`}>
          <Link to="/get-started" className="schedule-consultation-why-us-btn">
            Schedule Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
