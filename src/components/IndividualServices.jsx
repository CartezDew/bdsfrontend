import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const individualServicePriceText = {
  1: "Starting at $175",
  2: "Starting at $99 (mo)",
  3: "Starting at $175 (hr)",
  4: "Starting at $300",
  5: "Starting at $35",
  6: "Starting at $150 (hr)"
};

const individualServicesData = [
  {
    id: 1,
    icon: "📊",
    title: "Tax Returns",
    description: "Complete personal tax return preparation and filing services.",
    details: "We handle all types of personal tax returns including W-2s, 1099s, investment income, rental properties, and more. Our experts ensure maximum deductions and credits while maintaining full compliance with IRS regulations."
  },
  {
    id: 2,
    icon: "📈",
    title: "Bookkeeping",
    description: "Monthly bookkeeping and financial record maintenance.",
    details: "Professional bookkeeping services to keep your personal finances organized. We track income, expenses, categorize transactions, and provide monthly reports to help you understand your financial position."
  },
  {
    id: 3,
    icon: "⚖️",
    title: "Compliance",
    description: "Ensure your personal finances meet all regulatory requirements.",
    details: "Stay compliant with tax laws and regulations. We help you understand your obligations, maintain proper documentation, and avoid penalties through proactive compliance management."
  },
  {
    id: 4,
    icon: "📋",
    title: "Reporting",
    description: "Comprehensive financial reporting and analysis.",
    details: "Get clear insights into your financial situation with detailed reports. We analyze your income, expenses, and financial trends to help you make informed decisions about your money."
  },
  {
    id: 5,
    icon: "🔍",
    title: "Audits",
    description: "Professional representation during IRS audits and reviews.",
    details: "If you're facing an IRS audit, we provide expert representation and guidance. Our team handles all communication with the IRS and works to resolve issues efficiently and favorably."
  },
  {
    id: 6,
    title: "Tax Extensions",
    icon: "⏰",
    description: "File extensions and ensure timely tax compliance.",
    details: "Need more time to file your taxes? We can file extensions for you and ensure you meet all deadlines. This gives you extra time to gather documents while avoiding late filing penalties."
  }
];

const IndividualServiceCard = ({ service, isExpanded, onToggle }) => {
  return (
    <div className="service-card">
      <div className="service-card-content">
        <div className="service-header">
          <div className="service-icon">{service.icon}</div>
          <h3 className="service-title">{service.title}</h3>
        </div>
        <div className="service-separator"></div>
        <p className="service-description">{service.description}</p>
        
        {isExpanded && (
          <div className="service-details">
            <p>{service.details}</p>
          </div>
        )}
      </div>
      
      <button
        className="learn-more-btn"
        onClick={onToggle}
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        <span className="arrow">{isExpanded ? '↑' : '→'}</span>
      </button>
      
      {/* Price Display */}
      <div className="service-price">
        {individualServicePriceText[service.id]}
      </div>
    </div>
  );
};

const IndividualServices = () => {
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
        />
      ))}
    </div>
  );
};

export default IndividualServices;
