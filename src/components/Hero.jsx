// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/hero.css';

const Hero = () => {
  // Duplicate ticker items to create a seamless loop
  const tickerItems = [
    'Bookkeeping', 'Small Businesses', 'Individuals', 'Payroll', 'Audits', 'Tax Extensions', 'Consulting'
  ];
  const duplicatedTickerItems = [...tickerItems, ...tickerItems];

  return (
    <section className="hero-section" style={{ minHeight: '100vh' }}>
      {/* LEFT (60%) */}
      <div className="hero-content">
        {/* Left-side mini nav */}
        <nav className="hero-left-nav">
          <Link to="/services" className="hero-left-link">Services</Link>
          <Link to="/about" className="hero-left-link">About Us</Link>
          <Link to="/contact" className="hero-left-link">Contact Us</Link>
        </nav>

        {/* Headline + subhead */}
        <h1>
          Peace of mind,
          <br>
          </br>{' '}
          <span className="accent">accounted</span>
          {' '}for!
        </h1>
        <p>Clear process, practical strategies, and reliable filings — grounded in organized records and strategic advice</p>

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