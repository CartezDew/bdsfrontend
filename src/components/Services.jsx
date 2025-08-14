import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import IndividualServices from './IndividualServices';
import BusinessServices from './BusinessServices';
import EntitySelectorWidget from './EntitySelectorWidget';

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
  const servicesRef = useRef(null);

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
          <div className="services-header">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              Comprehensive accounting and tax services to support your financial success
            </p>
            
            {/* Service Type Toggle */}
            <div className="service-type-toggle">
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
            <div className="service-type-note">
              {serviceType === 'business' 
                ? "*You are currently viewing our business services*"
                : "*You are currently viewing our individual services*"
              }
            </div>
          </div>
          
          {/* Render appropriate services based on toggle */}
          <AnimatePresence mode="wait">
            {serviceType === 'business' ? (
              <BusinessServices key="business" />
            ) : (
              <IndividualServices key="individual" />
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Entity Selector Widget */}
      <section className="widget-section">
        <EntitySelectorWidget />
      </section>
    </>
  );
};

export default Services;
