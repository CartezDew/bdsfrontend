import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const individualServicePriceText = {
  1: "Starting at $175",       // Personal Tax Returns (flat)
  2: "Starting at $99 (mo)",   // Personal Bookkeeping
  3: "Starting at $175 (hr)",  // Tax Planning
  4: "Starting at $300",       // Audit Support (flat start)
  5: "Starting at $35",        // Tax Deadline Extensions (flat)
  6: "Starting at $150 (hr)"   // Financial Advisory
};

const individualServicesData = [
  {
    id: 1,
    title: 'Personal Tax Returns',
    description: 'Comprehensive tax preparation and filing services for individuals and families.',
    details: 'Our expert team handles all types of personal tax returns including W-2 income, investment income, rental properties, and self-employment. We ensure maximum deductions and credits while maintaining full compliance with current tax laws.',
    icon: '📊'
  },
  {
    id: 2,
    title: 'Personal Bookkeeping',
    description: 'Professional personal financial record keeping and organization services.',
    details: 'We provide complete personal bookkeeping services including expense tracking, income documentation, receipt organization, and financial statement preparation. Our systems help you stay organized for tax time and financial planning.',
    icon: '📚'
  },
  {
    id: 3,
    title: 'Tax Planning',
    description: 'Strategic tax planning to minimize your personal tax liability.',
    details: 'Our tax planning services cover retirement contributions, investment strategies, charitable giving, and timing of income and deductions. We help you make informed decisions throughout the year to optimize your tax situation.',
    icon: '✅'
  },
  {
    id: 4,
    title: 'Audit Support',
    description: 'Professional support and representation during IRS examinations.',
    details: 'Our audit support services include preparation assistance, representation during IRS meetings, documentation help, and strategic guidance. We ensure you have the best possible outcome for your personal tax audit.',
    icon: '🔍'
  },
  {
    id: 5,
    title: 'Tax Deadline Extensions',
    description: 'Timely filing of personal tax extensions to avoid penalties.',
    details: 'We handle all personal tax extension filings including individual and trust extensions. Our team ensures proper documentation and timely submission to give you the time needed for accurate tax preparation.',
    icon: '⏰'
  },
  {
    id: 6,
    title: 'Financial Advisory',
    description: 'Personal financial planning and investment advice.',
    details: 'Our personal advisory services include retirement planning, investment strategy, debt management, and estate planning. We help you build wealth and achieve your long-term financial goals.',
    icon: '💡'
  }
];

const IndividualServiceCard = ({ service, isExpanded, onToggle, isAnimated, onAnimationTrigger, cardIndex }) => {
  const cardRef = useRef(null);

  // Intersection Observer for individual card
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // 5% visibility
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAnimated) {
          onAnimationTrigger(cardIndex);
        }
      });
    }, observerOptions);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimated, onAnimationTrigger, cardIndex]);

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      layout
      initial={{ opacity: 0, x: -100 }}
      animate={isAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
      
      {/* Price Display */}
      <div className="service-price">
        {individualServicePriceText[service.id]}
      </div>
    </motion.div>
  );
};

const IndividualServices = ({ cardAnimations = [], onCardAnimation }) => {
  const [expandedService, setExpandedService] = useState(null);

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="services-grid">
      {individualServicesData.map((service, index) => (
        <IndividualServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedService === service.id}
          onToggle={() => handleToggleService(service.id)}
          isAnimated={cardAnimations[index] || false}
          onAnimationTrigger={onCardAnimation}
          cardIndex={index}
        />
      ))}
    </div>
  );
};

export default IndividualServices;
