import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import IndividualServices from './IndividualServices';
import BusinessServices from './BusinessServices';
import EntitySelectorWidget from './EntitySelectorWidget';
import SocialProof from './SocialProof';

// Custom navbar configuration for Services page
const servicesNavbarConfig = [
  { id: 1, name: 'About Us', path: '/about' },
  { id: 2, name: 'FAQ', path: '/faq' },
  { id: 3, name: 'Contact Us', path: '/contact' }
];

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [serviceType, setServiceType] = useState('individual'); // 'business' or 'individual'
  const [animationsTriggered, setAnimationsTriggered] = useState({
    header: false,
    title: false,
    subtitle: false,
    toggle: false,
    note: false,
    services: false
  });
  
  const [cardAnimations, setCardAnimations] = useState({
    individual: Array(6).fill(false), // 6 individual services
    business: Array(7).fill(false)     // 7 business services
  });
  
  const servicesRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const toggleRef = useRef(null);
  const noteRef = useRef(null);
  const servicesRef2 = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // 5% visibility
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.dataset.animate;
          
          if (elementId === 'services') {
            // Just mark services container as animated, individual cards will be handled separately
            setAnimationsTriggered(prev => ({ ...prev, services: true }));
          } else {
            setAnimationsTriggered(prev => ({
              ...prev,
              [elementId]: true
            }));
          }
        }
      });
    }, observerOptions);

    // Observe all animation elements individually
    if (headerRef.current) observer.observe(headerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (toggleRef.current) observer.observe(toggleRef.current);
    if (noteRef.current) observer.observe(noteRef.current);
    if (servicesRef2.current) observer.observe(servicesRef2.current);

    return () => observer.disconnect();
  }, []);

  // Function to handle individual card animations
  const handleCardAnimation = (serviceType, cardIndex) => {
    setCardAnimations(prev => ({
      ...prev,
      [serviceType]: prev[serviceType].map((_, index) => 
        index === cardIndex ? true : prev[serviceType][index]
      )
    }));
  };

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    setExpandedService(null); // Reset expanded service when switching types
  };

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        // Only show navbar when services section is fully in view (top of viewport)
        // This means hero section is completely out of view
        const shouldBeSticky = rect.top <= 0;
        setIsNavbarSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Only render navbar when it should be sticky (hero section out of view) */}
      {isNavbarSticky && (
        <div className={`services-navbar-container ${isNavbarSticky ? 'sticky' : ''}`}>
          <Navbar customConfig={servicesNavbarConfig} />
        </div>
      )}
      <section className={`services-section ${isNavbarSticky ? 'navbar-visible' : ''}`} ref={servicesRef}>
        <div className="services-container">
          <div className={`services-header ${animationsTriggered.header ? 'animate-header' : ''}`} ref={headerRef} data-animate="header">
            <h2 className={`services-title ${animationsTriggered.title ? 'animate-title' : ''}`} ref={titleRef} data-animate="title">Our Services</h2>
            <p className={`services-subtitle ${animationsTriggered.subtitle ? 'animate-subtitle' : ''}`} ref={subtitleRef} data-animate="subtitle">
              Comprehensive accounting and tax services to support your financial success
            </p>
            
            {/* Service Type Toggle */}
            <div className={`service-type-toggle ${animationsTriggered.toggle ? 'animate-toggle' : ''}`} ref={toggleRef} data-animate="toggle">
              <button
                className={`toggle-btn ${serviceType === 'individual' ? 'active' : ''}`}
                onClick={() => handleServiceTypeChange('individual')}
              >
                Individual Services
              </button>
              <button
                className={`toggle-btn ${serviceType === 'business' ? 'active' : ''}`}
                onClick={() => handleServiceTypeChange('business')}
              >
                Business Services
              </button>
            </div>
            
            {/* Current Service Type Note */}
            <div className={`service-type-note ${animationsTriggered.note ? 'animate-note' : ''}`} ref={noteRef} data-animate="note">
              {serviceType === 'business' 
                ? "*You are currently viewing our business services*"
                : "*You are currently viewing our individual services*"
              }
            </div>
          </div>
          
          {/* Render appropriate services based on toggle */}
          <AnimatePresence mode="wait">
            <div className={`services-content ${animationsTriggered.services ? 'animate-services' : ''}`} ref={servicesRef2} data-animate="services">
              {serviceType === 'business' ? (
                <BusinessServices 
                  cardAnimations={cardAnimations.business} 
                  onCardAnimation={(index) => handleCardAnimation('business', index)}
                />
              ) : (
                <IndividualServices 
                  cardAnimations={cardAnimations.individual} 
                  onCardAnimation={(index) => handleCardAnimation('individual', index)}
                />
              )}
            </div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <SocialProof />
      
      {/* Entity Selector Widget */}
      <section className="widget-section">
        <EntitySelectorWidget />
      </section>
    </>
  );
};

export default Services;
