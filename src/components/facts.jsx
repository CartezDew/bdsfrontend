// src/components/facts.jsx
import React, { useState, useRef, useEffect } from "react";
import "../styles/facts.css";

/**
 * Usage:
 * <Facts items={myFactsArray} />
 * or drop in as-is with the sample items below.
 *
 * Each item: { id: number|string, q: string, a: ReactNode|string }
 */

export default function Facts({ items = sampleFacts }) {
  const [openId, setOpenId] = useState(null);
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const factsRef = useRef(null);

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

    if (factsRef.current) {
      observer.observe(factsRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  return (
    <section 
      ref={factsRef}
      aria-labelledby="facts-heading" 
      className={`w-full ${animationsTriggered ? 'facts-animated' : ''}`}
    >
      <h2 id="facts-heading" className="sr-only">Facts</h2>

      <ul className={`facts-accordion ${animationsTriggered ? 'facts-accordion-animated' : ''}`}>
        {items.map(({ id, q, a }) => (
          <FactItem
            key={id}
            id={id}
            q={q}
            isOpen={openId === id}
            onToggle={() => setOpenId(openId === id ? null : id)}
          >
            {a}
          </FactItem>
        ))}
      </ul>
    </section>
  );
}

function FactItem({ id, q, isOpen, onToggle, children }) {
  const panelRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  // Measure content height for smooth max-height animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      setMaxH(panelRef.current.scrollHeight);
    } else {
      setMaxH(0);
    }
  }, [isOpen, children]);

  // Recompute on window resize (content wrap may change)
  useEffect(() => {
    const onResize = () => {
      if (panelRef.current && isOpen) {
        setMaxH(panelRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  // Individual item animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, id * 150); // Staggered delay based on ID
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [id]);

  return (
    <li 
      ref={itemRef}
      className={`fact ${isOpen ? "open" : ""} ${isVisible ? 'fact-visible' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${id * 0.1}s, transform 0.6s ease ${id * 0.1}s`
      }}
    >
      <button
        type="button"
        className="fact-trigger"
        aria-expanded={isOpen}
        aria-controls={`fact-panel-${id}`}
        id={`fact-trigger-${id}`}
        onClick={onToggle}
      >
        <span className="chev" aria-hidden></span>
        <span>{q}</span>
      </button>

      <div
        id={`fact-panel-${id}`}
        role="region"
        aria-labelledby={`fact-trigger-${id}`}
        className="fact-panel"
        style={{ maxHeight: maxH }}
      >
        <div ref={panelRef}>
          {children}
        </div>
      </div>
    </li>
  );
}

/* --- Sample content you can replace --- */
const sampleFacts = [
  {
    id: 1,
    q: "When are individual taxes due? Can I get an extension?",
    a: <>Most calendar-year filers are due around <strong>April 15</strong>. You can file Form 4868 for an <strong>automatic 6-month extension</strong> to file (usually to Oct 15), but any taxes owed are still due by April the original deadline.</>,
  },
  {
    id: 2,
    q: "When are quarterly estimated taxes due?",
    a: <>Typical due dates are <strong>Apr 15</strong>, <strong>Jun 15</strong>, <strong>Sep 15</strong>, and <strong>Jan 15</strong> of the following year (next business day if it's a holiday/weekend).</>,
  },
  {
    id: 3,
    q: "Business deadlines: partnerships, S-corps, C-corps?",
    a: <>Partnerships & S-corps are generally due <strong>mid-March</strong>. C-corps are generally due <strong>mid-April</strong>. Extensions are available via Form 7004.</>,
  },
  {
    id: 4,
    q: "Do I need to send contractors a 1099-NEC?",
    a: <>If you paid a non-employee <strong>$600+</strong> for services in your business, you typically must issue a 1099-NEC by <strong>Jan 31</strong>. Collect a W-9 before paying.</>,
  },
  {
    id: 5,
    q: "How long should I keep tax records?",
    a: <>Commonly keep returns/supporting docs at least <strong>3 years</strong>; employment tax records <strong>4 years</strong>; and up to <strong>7 years</strong> for certain items (e.g., bad debts/worthless securities). When in doubt, keep longer.</>,
  },
  {
    id: 6,
    q: "Can I deduct vehicle use for business?",
    a: <>Yes—use <strong>actual expenses</strong> or the IRS <strong>standard mileage rate</strong> (set annually). Keep a mileage log; commuting isn't deductible.</>,
  },
  {
    id: 7,
    q: "Home office—am I eligible?",
    a: <>You may qualify if a space is used <strong>regularly and exclusively</strong> for business. The simplified method allows <strong>$5/sq ft</strong> up to 300 sq ft.</>,
  },
  {
    id: 8,
    q: "Are business meals deductible? What about entertainment?",
    a: <>Business <strong>meals are generally 50% deductible</strong> when ordinary/necessary and you're present. <strong>Entertainment is generally not deductible.</strong></>,
  },
  {
    id: 9,
    q: "Do I file Schedule C?",
    a: <>Sole proprietors (incl. most single-member LLCs) report on <strong>Schedule C</strong> with Form 1040. Net self-employment income <strong>$400+</strong> usually requires <strong>Schedule SE</strong> (SE tax).</>,
  },
  {
    id: 10,
    q: "When are W-2s due?",
    a: <>W-2s are generally due to employees and to the SSA by <strong>Jan 31</strong> (next business day if it falls on a weekend/holiday).</>,
  },
];
