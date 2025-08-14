import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

// Custom navbar configuration for Services page
const servicesNavbarConfig = [
  { id: 1, name: 'About Us', path: '/about' },
  { id: 2, name: 'FAQ', path: '/faq' },
  { id: 3, name: 'Contact Us', path: '/contact' }
];

const servicesData = [
  {
    id: 1,
    title: 'Tax Returns',
    description: 'Comprehensive tax preparation and filing services for individuals and businesses.',
    details: 'Our expert team handles all types of tax returns including personal, corporate, partnership, and trust returns. We ensure maximum deductions and credits while maintaining full compliance with current tax laws.',
    icon: '📊'
  },
  {
    id: 2,
    title: 'Bookkeeping',
    description: 'Professional bookkeeping services to keep your financial records organized and accurate.',
    details: 'We provide complete bookkeeping services including accounts payable/receivable, payroll processing, bank reconciliations, and financial statement preparation. Our cloud-based solutions give you real-time access to your financial data.',
    icon: '📚'
  },
  {
    id: 3,
    title: 'Compliance',
    description: 'Stay compliant with all regulatory requirements and tax obligations.',
    details: 'Our compliance services cover tax filing deadlines, regulatory reporting, state and local tax compliance, and ongoing monitoring to ensure you never miss important deadlines or requirements.',
    icon: '✅'
  },
  {
    id: 4,
    title: 'Reporting',
    description: 'Comprehensive financial reporting and analysis for informed decision-making.',
    details: 'We provide detailed financial reports including profit & loss statements, balance sheets, cash flow analysis, and custom reports tailored to your specific business needs and industry requirements.',
    icon: '📈'
  },
  {
    id: 5,
    title: 'Audits',
    description: 'Professional audit support and representation during IRS examinations.',
    details: 'Our audit services include preparation support, representation during IRS meetings, documentation assistance, and strategic guidance to ensure the best possible outcome for your audit.',
    icon: '🔍'
  },
  {
    id: 6,
    title: 'Tax Extensions',
    description: 'Timely filing of tax extensions to avoid penalties and interest.',
    details: 'We handle all tax extension filings including individual, business, and trust extensions. Our team ensures proper documentation and timely submission to give you the time needed for accurate tax preparation.',
    icon: '⏰'
  },
  {
    id: 7,
    title: 'Advisory',
    description: 'Strategic tax and financial planning advice for your business growth.',
    details: 'Our advisory services include tax planning strategies, business structure optimization, succession planning, and ongoing consultation to help you make informed financial decisions and minimize tax liability.',
    icon: '💡'
  }
];

const ServiceCard = ({ service, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="service-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="service-card-content">
        <div className="service-header">
          <div className="service-icon">{service.icon}</div>
          <h3 className="service-title">{service.title}</h3>
        </div>
        <div className="service-separator"></div>
        <p className="service-description">{service.description}</p>
        
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              className="service-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{service.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.button
        className="learn-more-btn"
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        <span className="arrow">{isExpanded ? '↑' : '→'}</span>
      </motion.button>
    </motion.div>
  );
};

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const servicesRef = useRef(null);

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
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
      <section className="services-section" ref={servicesRef}>
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              Comprehensive accounting and tax services to support your financial success
            </p>
          </div>
          
          <div className="services-grid">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isExpanded={expandedService === service.id}
                onToggle={() => handleToggleService(service.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
