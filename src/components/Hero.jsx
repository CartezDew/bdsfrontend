// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/hero.css';
import HeroImageShowcase from './HeroImageShowcase.jsx';
import heroImages from './data/heroImages.js';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    'Tax Returns', 'Payroll', 'Bookkeeping', 'Compliance', 'Reporting', 'Tax Extensions', 'Advisory'
  ];

  const mobileTickerItems = [
    'Tax Returns', 'Payroll', 'Bookkeeping', 'Reporting', 'Advisory'
  ];

  // Handle ticker item click - navigate to services
  const handleTickerClick = () => {
    navigate('/services');
  };

  // Handle logo click - navigate to home and scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
    }
  };

  // Scroll helper that mirrors Navbar.jsx calculation and compensates if navbar is hidden initially
  const scrollToSectionWithNavbarCompensation = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const computeScrollTop = () => {
      const navbarEl = document.querySelector('.navbar');
      // Fallback to expected scrolled navbar height (2.5rem ≈ 40px) if navbar isn't mounted yet
      const fallbackHeightPx = 40;
      const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : fallbackHeightPx;
      const rectTop = targetElement.getBoundingClientRect().top + window.scrollY;
      const styles = window.getComputedStyle(targetElement);
      const marginTop = parseFloat(styles.marginTop) || 0;
      const borderTop = parseFloat(styles.borderTopWidth) || 0;
      return rectTop - navbarHeight - marginTop - borderTop;
    };

    // Initial smooth scroll
    window.scrollTo({ top: computeScrollTop(), behavior: 'smooth' });

    // Post-adjust once the navbar likely toggled/settled after scroll starts
    setTimeout(() => {
      window.scrollTo({ top: computeScrollTop(), behavior: 'auto' });
    }, 300);
    setTimeout(() => {
      window.scrollTo({ top: computeScrollTop(), behavior: 'auto' });
    }, 700);
  };

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
    }, 2500);
    return () => clearInterval(id);
  }, [tickerItems.length]);

  return (
    /* OUTER = full-bleed background only */
    <section id="hero" className="hero-section">
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
            <div className="logo-section-hero">
              <button className="logo-link-hero" onClick={handleLogoClick}>
                <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image" />
                <h1 className="logo-text-hero">Talent Group</h1>
              </button>
            </div>
            <div className="hero-nav-links-hero">
              <button 
                className="hero-left-link"
                onClick={() => scrollToSectionWithNavbarCompensation('services')}
              >
                Services
              </button>
              <button 
                className="hero-left-link"
                onClick={() => scrollToSectionWithNavbarCompensation('why-us')}
              >
                Why Us
              </button>
              <button 
                className="hero-left-link"
                onClick={() => scrollToSectionWithNavbarCompensation('contact')}
              >
                Contact Us
              </button>
            </div>
            <button className="hero-hamburger-menu" onClick={() => {
              try {
                console.log('[Hero] hamburger clicked → dispatch toggleMobileMenu');
                const evtWin = new CustomEvent('toggleMobileMenu', { detail: { source: 'hero', ts: Date.now() } });
                window.dispatchEvent(evtWin);
                const evtDoc = new CustomEvent('toggleMobileMenu', { detail: { source: 'hero-doc', ts: Date.now() } });
                document.dispatchEvent(evtDoc);
              } catch (err) {
                console.error('[Hero] error dispatching toggleMobileMenu', err);
              }
            }}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
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
            <Link to="/get-started" className="cta-button-primary">Schedule Consultation</Link>
            <Link to="/get-started" className="cta-button-secondary">Get Started</Link>
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
            {(window.innerWidth <= 720 ? mobileTickerItems : tickerItems).map((label, i) => (
              <React.Fragment key={`${label}-${i}`}>
                <motion.div
                  className="ticker-item"
                  onClick={handleTickerClick}
                  style={{ cursor: 'pointer' }}
                  animate={{
                    color: highlightedIndex === i ? 'var(--color-accent)' : '#19231A',
                    scale: highlightedIndex === i ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.15, color: 'var(--color-hunter-green)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.div>
                {i < (window.innerWidth <= 720 ? mobileTickerItems.length - 1 : tickerItems.length - 1) && (
                  <span className="ticker-separator">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
