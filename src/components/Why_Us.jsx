// src/components/Why_Us.jsx
import React from "react";

export default function Why_Us() {
  return (
    <section id="why-us" aria-labelledby="whyus-title" className="whyus">
      <div className="whyus__inner">
        {/* Header */}
        <header className="whyus__header">
          <h2 id="whyus-title" className="whyus__title">
            Why BDS Talent Group
          </h2>
          <p className="whyus__kicker">Business • Development • Solutions</p>

          {/* Merged hero message */}
          <p className="whyus__lede">
            We keep your books clean, your filings on time, and your decisions
            data-backed—so you can focus on growth.{" "}
            <strong>Peace of mind, accounted for.</strong> With clear processes,
            practical strategies, and reliable filings—grounded in organized
            records and strategic advice—we support both growing businesses{" "}
            <em>and individual taxpayers</em> (from simple returns to complex,
            year-end filings). That’s the BDS way.
          </p>
        </header>

        {/* Bullets */}
        <ul className="whyus__list" role="list">
          <li>
            <strong>14+ years</strong> across tax, bookkeeping, and full-cycle
            accounting
          </li>
          <li>
            <strong>Industry know-how:</strong> law &amp; professional services,
            real estate/property, healthcare, restaurants, construction,
            transportation
          </li>
          <li>
            <strong>100% on-time filings</strong> and audit-ready records
          </li>
          <li>
            <strong>200+ clients served</strong> with transparent, accurate
            financials
          </li>
          <li>
            <strong>Launch &amp; level-up support:</strong> new business setups,
            cleanup/catch-up, and monthly care
          </li>
          <li>
            <strong>Plain-English guidance</strong>—no jargon, just clarity and
            confidence
          </li>
        </ul>

        {/* Owner block (text left, image right) */}
        <div className="whyus__owner">
          <div className="whyus__ownerText">
            <h3 className="whyus__ownerTitle">Meet the Owner — Brandon Davis</h3>
            <p>
              Brandon Davis, CEO of BDS Talent Group, is a seasoned accountant
              and active member of the Atlanta Accounting &amp; Tax Society and
              LaunchGSU. Known for meticulous attention to detail and
              transparent reporting, he helps leaders make confident decisions.
            </p>
            <p className="whyus__ownerBDS">
              BDS stands for <strong>Business • Development • Solutions</strong>
              —we bring <em>peace of mind, accounted for</em> to life by
              delivering <strong>Business clarity</strong>,{" "}
              <strong>Development of systems</strong>, and{" "}
              <strong>Solutions that scale</strong>. That’s how we keep
              businesses compliant and growing—and how we help individuals get
              their finances organized, stress-free, and on track.
            </p>
          </div>

          <div className="whyus__ownerMedia">
            {/* Image placeholder - add actual image later */}
            <div className="whyus__ownerImg-placeholder">
              <p>Brandon Davis, CEO</p>
              <p>BDS Talent Group</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
