// src/components/Why_Us.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Why_Us() {
  return (
    <section id="why-us" aria-labelledby="whyus-title" className="whyus">
      <div className="whyus__inner">
        {/* Header */}
        <header className="whyus__header">
          <div className="whyus__header-content">
            <h2 id="whyus-title" className="whyus__title">
              Why BDS Talent Group
            </h2>
            <p className="whyus__kicker">Business • Development • Solutions</p>

            {/* Merged hero message */}
            <p className="whyus__lede">
              We keep your books clean, your filings on time, and your decisions
              data-backed—so you can focus on growth.{" "}
              <br />
              <br />
               We support <strong>growing businesses & individual taxpayers</strong> (from simple returns to complex,
              year-end filings). That's the BDS way!
            </p>
          </div>
          <div className="whyus__grid-image">
            <img 
              src="/multi-ethnic-group-three-young-people-studying-together.png" 
              alt="Business professionals shaking hands in partnership" 
              className="whyus__business-image"
            />
          </div>
        </header>

        {/* Bullets */}
        <ul className="whyus__list" role="list">
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
        <div className="whyus__cta-container">
          <Link to="/get-started" className="schedule-consultation-why-us-btn">
            Schedule Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
