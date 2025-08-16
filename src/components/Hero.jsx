// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Refs for intersection observer
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const socialProofRef = useRef(null);
  const tickerRef = useRef(null);
  
  // Duplicate ticker items to create a seamless loop
  const tickerItems = [
    'Tax Returns', 'Bookkeeping', 'Compliance', 'Reporting', 'Audits', 'Tax Extensions', 'Advisory'
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // Trigger when 5% in view
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.dataset.animate;
          
          if (elementId === 'nav') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, nav: true })), 0);
          } else if (elementId === 'headline') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, headline: true })), 200);
          } else if (elementId === 'subtext') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, subtext: true })), 400);
          } else if (elementId === 'buttons') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, buttons: true })), 600);
          } else if (elementId === 'imageContainer') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, imageContainer: true })), 300);
          } else if (elementId === 'socialProof') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, socialProof: true })), 800);
          } else if (elementId === 'ticker') {
            setTimeout(() => setAnimationsTriggered(prev => ({ ...prev, ticker: true })), 1000);
          }
        }
      });
    }, observerOptions);

    // Observe all elements
    if (navRef.current) observer.observe(navRef.current);
    if (headlineRef.current) observer.observe(headlineRef.current);
    if (subtextRef.current) observer.observe(subtextRef.current);
    if (buttonsRef.current) observer.observe(buttonsRef.current);
    if (imageContainerRef.current) observer.observe(imageContainerRef.current);
    if (socialProofRef.current) observer.observe(socialProofRef.current);
    if (tickerRef.current) observer.observe(tickerRef.current);

    return () => observer.disconnect();
  }, []);

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
          <br>
          </br>{' '}
          <span className="accent">accounted</span>
          {' '}for!
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
          Clear process, practical strategies, and reliable filings — grounded in organized records and strategic advice.
        </p>

        {/* CTAs */}
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
        {/* Right-side nav (on the image) */}
        <div className="hero-nav-buttons">
          <Link to="/signin" className="hero-nav-btn">Sign In</Link>
          <Link to="/get-started" className="hero-nav-btn primary">Get Started</Link>
        </div>

        {/* ANIMATION COMPONENT */}
        <HeroImageShowcase base={heroImages.base} grid={heroImages.grid} />

        {/* Social Proof - Right Side */}
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
      <div 
        ref={tickerRef}
        data-animate="ticker"
        className="services-ticker"
        style={{
          opacity: animationsTriggered.ticker ? 1 : 0,
          transform: animationsTriggered.ticker ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
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