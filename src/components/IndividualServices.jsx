import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const IndividualServiceCard = ({ service, isExpanded, onToggle }) => {
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

const IndividualServices = () => {
  const [expandedService, setExpandedService] = useState(null);

  const handleToggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="services-grid">
      {individualServicesData.map((service) => (
        <IndividualServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedService === service.id}
          onToggle={() => handleToggleService(service.id)}
        />
      ))}
    </div>
  );
};

export default IndividualServices;
