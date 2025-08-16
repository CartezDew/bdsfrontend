// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/hero.css';
import HeroImageShowcase from './HeroImageShowcase.jsx';
import heroImages from './data/heroImages.js';

const Hero = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  // Duplicate ticker items to create a seamless loop
  const tickerItems = [
    'Tax Returns', 'Bookkeeping', 'Compliance', 'Reporting', 'Audits', 'Tax Extensions', 'Advisory'
  ];

  // Infinite animation cycle through services
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3000); // 3 seconds per service

    return () => clearInterval(interval);
  }, [tickerItems.length]);

  return (
    <section className="hero-section" style={{ minHeight: '100vh' }}>
      {/* LEFT (60%) */}
      <div className="hero-content">
        {/* Left-side mini nav */}
        <nav className="hero-left-nav">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <img 
                src="/favicon.svg" 
                alt="BDS Accounting Logo" 
                className="logo-image"
              />
              <h1 className="logo-text">Talent Group</h1>
            </Link>
          </div>
          <div className="hero-nav-links">
            <Link to="/services" className="hero-left-link">Services</Link>
            <Link to="/about" className="hero-left-link">About Us</Link>
            <Link to="/contact" className="hero-left-link">Contact Us</Link>
          </div>
        </nav>

        {/* Headline + subhead */}
        <h1>
          Peace of mind,
          <br>
          </br>{' '}
          <span className="accent">accounted</span>
          {' '}for!
        </h1>
        <p>Clear process, practical strategies, and reliable filings — grounded in organized records and strategic advice.</p>

        {/* CTAs */}
        <div className="cta-buttons">
          <button className="cta-button-primary">Schedule a Consultation</button>
          <button className="cta-button-secondary">Get Started</button>
        </div>
      </div>

      {/* RIGHT (40%) */}
      <div className="hero-image-container">
        {/* Right-side nav (on the image) */}
        <div className="hero-nav-buttons">
          <Link to="/signin" className="hero-nav-btn">Sign In</Link>
          <Link to="/get-started" className="hero-nav-btn primary">Get Started</Link>
        </div>

        {/* ANIMATION COMPONENT */}
        <HeroImageShowcase base={heroImages.base} grid={heroImages.grid} />

        {/* Social Proof - Right Side */}
        <div className="social-proof-right">
          <div className="proof-item-right">
            <span className="proof-number-right">200+</span>
            <span className="proof-label-right">happy clients</span>
          </div>
          <div className="proof-item-right">
            <span className="proof-number-right">10+</span>
            <span className="proof-label-right">years experience</span>
          </div>
          <div className="proof-item-right">
            <span className="proof-number-right">2</span>
            <span className="proof-label-right">locations</span>
          </div>
        </div>
      </div>

      {/* Bottom services ticker; stays inside 100vh */}
      <div className="services-ticker">
        <div className="ticker-track">
          {tickerItems.map((label, i) => (
            <motion.div
              key={`${label}-${i}`}
              className="ticker-item"
              animate={{
                color: highlightedIndex === i ? 'var(--color-accent)' : '#19231A',
                scale: highlightedIndex === i ? 1.1 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;