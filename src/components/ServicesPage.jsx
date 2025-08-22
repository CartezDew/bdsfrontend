import React, { useState, useEffect, useRef } from 'react';
import { useServiceContext } from '../context/ServiceContext';
import Navbar from './Navbar';
import IndividualServices from './IndividualServices';
import BusinessServices from './BusinessServices';
import '../styles/servicesPage.css';

// Custom navbar configuration for Services page
const servicesNavbarConfig = [
  { id: 1, name: 'Contact Us', path: '/contact' }
];

const ServicesPage = () => {
  const { serviceType, handleServiceTypeChange } = useServiceContext();
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [animationsTriggered, setAnimationsTriggered] = useState({
    header: false, title: false, subtitle: false, toggle: false, note: false, services: false
  });
  
  const [cardsVisible, setCardsVisible] = useState(false);

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
            setAnimationsTriggered(prev => ({ ...prev, services: true }));
            setCardsVisible(true); // Trigger card animations
          } else {
            setAnimationsTriggered(prev => ({ ...prev, [elementId]: true }));
          }
        }
      });
    }, observerOptions);

    // Observe elements
    if (headerRef.current) observer.observe(headerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (toggleRef.current) observer.observe(toggleRef.current);
    if (noteRef.current) observer.observe(noteRef.current);
    if (servicesRef2.current) observer.observe(servicesRef2.current);
    
    return () => observer.disconnect();
  }, []);

  // Reset card animations when service type changes
  useEffect(() => {
    setCardsVisible(false);
    // Small delay to ensure reset is complete, then trigger animations
    setTimeout(() => {
      setCardsVisible(true);
    }, 100);
  }, [serviceType]);

  const handleToggleService = (serviceId) => {
    // This function is now handled by the context
  };

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      // Look for the avoid confusion section by its class name
      const avoidConfusionSection = document.querySelector('.avoid-confusion-section');
      if (avoidConfusionSection) {
        const rect = avoidConfusionSection.getBoundingClientRect();
        // Only show navbar when avoid confusion section is fully in view (top of viewport)
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
        <div className={`servicespage-navbar-container ${isNavbarSticky ? 'sticky' : ''}`}>
          <Navbar customConfig={servicesNavbarConfig} />
        </div>
      )}
      <section className={`servicespage-section ${isNavbarSticky ? 'navbar-visible' : ''}`} ref={servicesRef}>
        <div className="servicespage-container">
          <div className={`servicespage-header ${animationsTriggered.header ? 'servicespage-animate-header' : ''}`} ref={headerRef} data-animate="header">
            <h2 className={`servicespage-title ${animationsTriggered.title ? 'servicespage-animate-title' : ''}`} ref={titleRef} data-animate="title">Our Services</h2>
            <p className={`servicespage-subtitle ${animationsTriggered.subtitle ? 'servicespage-animate-subtitle' : ''}`} ref={subtitleRef} data-animate="subtitle">
              Comprehensive accounting and tax services to support your financial success
            </p>
            
            {/* Service Type Toggle */}
            <div className={`servicespage-toggle ${animationsTriggered.toggle ? 'servicespage-animate-toggle' : ''}`} ref={toggleRef} data-animate="toggle">
              <button
                className={`servicespage-toggle-btn ${serviceType === 'individual' ? 'active' : ''}`}
                onClick={() => handleServiceTypeChange('individual')}
                data-tooltip="View personal tax and individual services"
              >
                Individual Services
              </button>
              <button
                className={`servicespage-toggle-btn ${serviceType === 'business' ? 'active' : ''}`}
                onClick={() => handleServiceTypeChange('business')}
                data-tooltip="View business accounting services"
              >
                Business Services
              </button>
            </div>
            
            {/* Current Service Type Note */}
            <div className={`servicespage-note ${animationsTriggered.note ? 'servicespage-animate-note' : ''}`} ref={noteRef} data-animate="note">
              {serviceType === 'business' 
                ? "*You are currently viewing our business services*"
                : "*You are currently viewing our individual services*"
              }
            </div>
          </div>
          
          {/* Render appropriate services based on toggle */}
          <div className={`servicespage-content ${animationsTriggered.services ? 'servicespage-animate-services' : ''}`} ref={servicesRef2} data-animate="services">
            {serviceType === 'business' ? (
              <BusinessServices />
            ) : (
              <IndividualServices />
            )}
          </div>
        </div>
      </section>
      
    </>
  );
};

export default ServicesPage;
