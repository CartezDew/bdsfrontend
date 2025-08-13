// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => {
  // Duplicate ticker items to create a seamless loop
  const tickerItems = [
    'Taxes', 'Bookkeeping', 'Compliance', 'Reporting', 'Audits', 'Tax Extensions', 'Advisory'
  ];
  const duplicatedTickerItems = [...tickerItems, ...tickerItems];

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

        {/* Main Image */}
        <div className="hero-image-wrapper">
          <img src="/hero_images/Young-clients.jpg" alt="Young clients consulting with BDS" />
        </div>

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

        <div className="hero-image-wrapper"></div>
      </div>

      {/* Bottom services ticker; stays inside 100vh */}
      <div
        className="services-ticker"
        data-pause="1"
        style={{ '--ticker-duration': '30s' }}
      >
        <div className="ticker-track">
          {duplicatedTickerItems.map((label, i) => (
            <div key={`${label}-${i}`} className="ticker-item">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;