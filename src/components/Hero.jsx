// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/hero.css';
import HeroImageShowcase from './HeroImageShowcase.jsx';
import heroImages from './data/heroImages.js';

const Hero = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [animationsTriggered, setAnimationsTriggered] = useState({
    nav: false,
    headline: false,
    subtext: false,
    buttons: false,
    imageContainer: false,
    socialProof: false,
    ticker: false
  });

  const navRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const socialProofRef = useRef(null);
  const tickerRef = useRef(null);

  const tickerItems = [
    'Tax Returns', 'Bookkeeping', 'Compliance', 'Reporting', 'Audits', 'Tax Extensions', 'Advisory'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.dataset.animate;
        const fire = (k, d=0) => setTimeout(() =>
          setAnimationsTriggered(p => ({ ...p, [k]: true })), d);
        if (id === 'nav') fire('nav', 0);
        else if (id === 'headline') fire('headline', 200);
        else if (id === 'subtext') fire('subtext', 400);
        else if (id === 'buttons') fire('buttons', 600);
        else if (id === 'imageContainer') fire('imageContainer', 300);
        else if (id === 'socialProof') fire('socialProof', 800);
        else if (id === 'ticker') fire('ticker', 1000);
      });
    }, { threshold: 0.05, rootMargin: '0px' });

    [navRef, headlineRef, subtextRef, buttonsRef, imageContainerRef, socialProofRef, tickerRef]
      .forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightedIndex(prev => (prev + 1) % tickerItems.length);
    }, 3000);
    return () => clearInterval(id);
  }, [tickerItems.length]);

  return (
    /* OUTER = full-bleed background only */
    <section className="hero-section">
      {/* INNER = width-capped grid frame */}
      <div className="hero-inner">

        {/* LEFT (60%) */}
        <div className="hero-content">
          <nav
            ref={navRef}
            data-animate="nav"
            className="hero-left-nav"
            style={{
              opacity: animationsTriggered.nav ? 1 : 0,
              transform: animationsTriggered.nav ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image" />
                <h1 className="logo-text">Talent Group</h1>
              </Link>
            </div>
            <div className="hero-nav-links">
              <Link to="/services" className="hero-left-link">Services</Link>
              <Link to="/about" className="hero-left-link">About Us</Link>
              <Link to="/contact" className="hero-left-link">Contact Us</Link>
            </div>
          </nav>

          <h1
            ref={headlineRef}
            data-animate="headline"
            style={{
              opacity: animationsTriggered.headline ? 1 : 0,
              transform: animationsTriggered.headline ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            Peace of mind,
            <br />
            <span className="accent">accounted</span> for!
          </h1>

          <p
            ref={subtextRef}
            data-animate="subtext"
            style={{
              opacity: animationsTriggered.subtext ? 1 : 0,
              transform: animationsTriggered.subtext ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            Clear process, practical strategies, and reliable filings — grounded in organized
            records and strategic advice.
          </p>

          <div
            ref={buttonsRef}
            data-animate="buttons"
            className="cta-buttons"
            style={{
              opacity: animationsTriggered.buttons ? 1 : 0,
              transform: animationsTriggered.buttons ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <button className="cta-button-primary">Schedule a Consultation</button>
            <button className="cta-button-secondary">Get Started</button>
          </div>
        </div>

        {/* RIGHT (40%) */}
        <div
          ref={imageContainerRef}
          data-animate="imageContainer"
          className="hero-image-container"
          style={{
            opacity: animationsTriggered.imageContainer ? 1 : 0,
            transform: animationsTriggered.imageContainer ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="hero-nav-buttons">
            <Link to="/signin" className="hero-nav-btn">Sign In</Link>
            <Link to="/get-started" className="hero-nav-btn primary">Get Started</Link>
          </div>

          <div className="hero-media">
            <HeroImageShowcase base={heroImages.base} grid={heroImages.grid} />
          </div>

          <div
            ref={socialProofRef}
            data-animate="socialProof"
            className="social-proof-right"
            style={{
              opacity: animationsTriggered.socialProof ? 1 : 0,
              transform: animationsTriggered.socialProof ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="proof-item-right">
              <span className="proof-number-right">100%</span>
              <span className="proof-label-right">on-time filings</span>
            </div>
            <div className="proof-item-right">
              <span className="proof-number-right">200+</span>
              <span className="proof-label-right">happy clients</span>
            </div>
            <div className="proof-item-right">
              <span className="proof-number-right">14+</span>
              <span className="proof-label-right">years experience</span>
            </div>
          </div>
        </div>

        {/* Bottom services ticker (inside the inner grid) */}
        <div
          ref={tickerRef}
          data-animate="ticker"
          className="services-ticker"
          style={{
            /* keep visible (no translate so it doesn't slip below dvh) */
            opacity: animationsTriggered.ticker ? 1 : 0,
            transform: animationsTriggered.ticker ? 'translateY(0)' : 'translateY(24px)', // from below
            transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1)',
            willChange: 'transform, opacity'
          }}
        >
          <div className="ticker-track">
            {tickerItems.map((label, i) => (
              <motion.div
                key={`${label}-${i}`}
                className="ticker-item"
                animate={{
                  color: highlightedIndex === i ? 'var(--color-accent)' : '#19231A',
                  scale: highlightedIndex === i ? 1.1 : 1
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
