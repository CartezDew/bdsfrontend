import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const businessServicePriceText = {
  1: "Starting at $525",      // Tax Returns (1065/1120S/1120 - simple)
  2: "Starting at $199 (mo)", // Bookkeeping
  3: "Starting at $129 (mo)", // Compliance (sales tax/payroll filings, annual regs)
  4: "Starting at $149 (mo)", // Reporting (P&L, BS, cash flow)
  5: "Starting at $400",      // Audits (IRS/GA exam support; flat start)
  6: "Starting at $50",       // Tax Extensions (Form 7004/IT-303 admin)
  7: "Starting at $175 (hr)"  // Advisory (tax/financial strategy)
};

const businessServicesData = [
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

const BusinessServiceCard = ({ service, isExpanded, onToggle, isAnimated, onAnimationTrigger, cardIndex }) => {
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
        {businessServicePriceText[service.id]}
      </div>
    </motion.div>
  );
};

const BusinessServices = ({ cardAnimations = [], onCardAnimation }) => {
  const [expandedService, setExpandedService] = useState(null);

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="services-grid">
      {businessServicesData.map((service, index) => (
        <BusinessServiceCard
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

export default BusinessServices;
