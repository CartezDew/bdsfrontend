// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/hero.css';
import HeroImageShowcase from './HeroImageShowcase.jsx';
import heroImages from './data/heroImages.js';
import { HeartHandshake } from 'lucide-react';
import AppLoading from './AppLoading.jsx';

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isHeroHamburgerOpenAnim, setIsHeroHamburgerOpenAnim] = useState(false); // controls X morph
  const [hideHeroToggle, setHideHeroToggle] = useState(false); // hides after navbar begins opening
  const [animationsTriggered, setAnimationsTriggered] = useState({
    nav: false,
    headline: false,
    subtext: false,
    buttons: false,
    imageContainer: false,
    socialProof: false,
    ticker: false
  });
  const [heroImagesLoaded, setHeroImagesLoaded] = useState(false);

  // Preload hero images in HTML head for faster loading
  useEffect(() => {
    const preloadImages = () => {
      const allImages = [heroImages.base, ...(heroImages.grid || [])].filter(Boolean);
      allImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };
    
    preloadImages();
  }, []);

  const navRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);
  const socialProofRef = useRef(null);
  const socialProofMobileRef = useRef(null);
  const tickerRef = useRef(null);
  const heroHamburgerRef = useRef(null);

  const tickerItems = [
    'Tax Returns', 'Payroll', 'Bookkeeping', 'Compliance', 'Reporting', 'Tax Extensions', 'Advisory'
  ];

  const mobileTickerItems = [
    'Tax Returns', 'Payroll', 'Bookkeeping', 'Reporting', 'Advisory', 
  ];

  const smallMobileTickerItems = [
    'Tax Returns', 'Payroll', 'Bookkeeping', 'Advisory'
  ];

  const getTickerItemsForWidth = (width) => {
    if (width <= 505) return smallMobileTickerItems;
    if (width <= 760) return mobileTickerItems;
    return tickerItems;
  };

  const [currentTickerItems, setCurrentTickerItems] = useState(() => getTickerItemsForWidth(typeof window !== 'undefined' ? window.innerWidth : 9999));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setCurrentTickerItems(getTickerItemsForWidth(currentWidth));
      
      // Update mobile state for logo behavior
      setIsMobile(currentWidth <= 680);
    };
    
    // Set initial mobile state
    setIsMobile(window.innerWidth <= 680);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle ticker item click - navigate to services
  const handleTickerClick = () => {
    navigate('/services');
  };

  // Handle logo click - toggle mobile navbar on mobile, navigate on desktop
  const handleLogoClick = (e) => {
    e.preventDefault();
    
    if (isMobile) {
      // On mobile, toggle the mobile navbar dropdown
      // If already open, close it; if closed, open it
      try {
        window.dispatchEvent(new CustomEvent('toggleMobileMenu', { detail: { source: 'hero-logo', ts: Date.now() } }));
      } catch {}
    } else {
      // On desktop, use the original navigation behavior
      if (location.pathname === '/') {
        // If already on home page, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home page
        navigate('/');
      }
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

    [navRef, headlineRef, subtextRef, buttonsRef, imageContainerRef, socialProofRef, socialProofMobileRef, tickerRef]
      .forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightedIndex(prev => (prev + 1) % currentTickerItems.length);
    }, 2500);
    return () => clearInterval(id);
  }, [currentTickerItems.length]);

  // Sync hero hamburger visibility with global mobile menu state and animation
  useEffect(() => {
    const handleMobileMenuState = (e) => {
      if (e && e.detail && typeof e.detail.open === 'boolean') {
        if (e.detail.open) {
          // After the mobile menu opens, keep hamburger hidden
          return;
        } else {
          // Fallback: ensure it reappears shortly after close begins
          setTimeout(() => {
            try { if (heroHamburgerRef.current) heroHamburgerRef.current.style.setProperty('display', 'flex', 'important'); } catch {}
            setHideHeroToggle(false);
            setIsHeroHamburgerOpenAnim(false);
          }, 340);
          return;
        }
      }
    };
    const handleOpenAnimEnd = () => {
      // Morph finished. Ease the button off to the right but keep it mounted.
      setHideHeroToggle(true);
    };
    const handleCloseAnimEnd = () => {
      setHideHeroToggle(false);
      setIsHeroHamburgerOpenAnim(false);
    };
    window.addEventListener('mobileMenuState', handleMobileMenuState);
    window.addEventListener('mobileMenuOpenAnimationEnd', handleOpenAnimEnd);
    window.addEventListener('mobileMenuCloseAnimationEnd', handleCloseAnimEnd);
    return () => {
      window.removeEventListener('mobileMenuState', handleMobileMenuState);
      window.removeEventListener('mobileMenuOpenAnimationEnd', handleOpenAnimEnd);
      window.removeEventListener('mobileMenuCloseAnimationEnd', handleCloseAnimEnd);
    };
  }, []);

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
            <button ref={heroHamburgerRef} className={`hero-hamburger-menu ${isHeroHamburgerOpenAnim ? 'open' : ''} ${hideHeroToggle ? 'offstage' : ''}`} onClick={() => {
               try {
                 window.dispatchEvent(new CustomEvent('toggleMobileMenu', { detail: { source: 'hero', ts: Date.now() } }));
               } catch {}
            }}>
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
            <Link to="/" className="cta-button-primary">Schedule Consultation</Link>
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
          
          {/* Mobile Social Proof - Left of image under 680px */}
          <div
            ref={socialProofMobileRef}
            data-animate="socialProof"
            className="social-proof-mobile"
          >
            <motion.div
              className="proof-item-mobile"
              initial={{ opacity: 0, y: 12 }}
              animate={animationsTriggered.socialProof ? { opacity: 1, y: 0, boxShadow: '0 10px 24px rgba(0,0,0,0.18)' } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              {/* Clock icon for on-time filings */}
              <svg className="proof-icon-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <div className="proof-content-mobile">
                <span className="proof-number-mobile">100%</span>
                <span className="proof-label-mobile">on-time filings</span>
              </div>
            </motion.div>
            <motion.div
              className="proof-item-mobile"
              initial={{ opacity: 0, y: 12 }}
              animate={animationsTriggered.socialProof ? { opacity: 1, y: 0, boxShadow: '0 10px 24px rgba(0,0,0,0.18)' } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            >
              <HeartHandshake className="proof-icon-mobile" aria-hidden="true" />
              <div className="proof-content-mobile">
                <span className="proof-number-mobile">200+</span>
                <span className="proof-label-mobile">happy clients</span>
              </div>
            </motion.div>
            <motion.div
              className="proof-item-mobile"
              initial={{ opacity: 0, y: 12 }}
              animate={animationsTriggered.socialProof ? { opacity: 1, y: 0, boxShadow: '0 10px 24px rgba(0,0,0,0.18)' } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            >
              {/* Trophy/Award icon for years of experience */}
              <svg className="proof-icon-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 4h8v4a4 4 0 01-4 4 4 4 0 01-4-4V4z" />
                <path d="M6 4H4a3 3 0 003 3" />
                <path d="M18 4h2a3 3 0 01-3 3" />
                <path d="M12 17v4" />
                <path d="M8 21h8" />
              </svg>
              <div className="proof-content-mobile">
                <span className="proof-number-mobile">14+</span>
                <span className="proof-label-mobile">years experience</span>
              </div>
            </motion.div>
          </div>
          
          <div className="hero-media" style={{ position: 'relative' }}>
            {/* Loading overlay while hero images prepare */}
            {!heroImagesLoaded && <AppLoading />}
            <HeroImageShowcase base={heroImages.base} grid={heroImages.grid} onImagesReady={() => setHeroImagesLoaded(true)} />
          </div>

          {/* Desktop Social Proof - Hidden under 680px */}
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
            {currentTickerItems.map((label, i) => (
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
                {i < (currentTickerItems.length - 1) && (
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
