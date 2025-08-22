import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const businessServicePriceText = {
  1: "Starting at $525",
  2: "Starting at $199 (mo)",       // Payroll Services
  3: "Starting at $129 (mo)",       // Bookkeeping 
  4: "Starting at $149 (mo)",       // Compliance 
  5: "Starting at $400",            // Reporting 
  6: "Starting at $400",            // Audits 
  7: "Starting at $50",             // Tax Extensions 
  8: "Starting at $175 (hr)"        // Advisory 
};

const businessServicesData = [
  {
    id: 1,
    icon: "📊",
    title: "Tax Returns",
    description: "Complete business tax return preparation and filing services.",
    details: "We handle all types of business tax returns including corporate, partnership, and LLC filings. Our experts ensure maximum deductions and credits while maintaining full compliance with IRS regulations and business tax laws."
  },
  {
    id: 2,
    icon: "💸",
    title: "Payroll Services",
    description: "Run payroll accurately and on time—W-2s, 1099s, and tax filings handled.",
    details: "Full-service payroll setup and processing for employees and contractors. We manage direct deposit, multi-state withholding, payroll tax deposits, and quarterly/annual filings (941, 940, W-2/W-3, 1099/1096). Includes new-hire reporting, year-end forms, garnishments, and compliance monitoring so you stay audit-ready."
  },
  {
    id: 3,
    icon: "📈",
    title: "Bookkeeping",
    description: "Monthly bookkeeping and financial record maintenance.",
    details: "Professional bookkeeping services to keep your business finances organized. We track income, expenses, categorize transactions, and provide monthly reports to help you understand your business financial position."
  },
  {
    id: 4,
    icon: "⚖️",
    title: "Compliance",
    description: "Ensure your business meets all regulatory requirements.",
    details: "Stay compliant with business tax laws and regulations. We help you understand your obligations, maintain proper documentation, and avoid penalties through proactive compliance management."
  },
  {
    id: 5,
    icon: "📋",
    title: "Reporting",
    description: "Comprehensive financial reporting and analysis.",
    details: "Get clear insights into your business financial situation with detailed reports. We analyze your income, expenses, and financial trends to help you make informed decisions about your business."
  },
  {
    id: 6,
    icon: "🔍",
    title: "Audits",
    description: "Professional representation during IRS audits and reviews.",
    details: "If your business is facing an IRS audit, we provide expert representation and guidance. Our team handles all communication with the IRS and works to resolve issues efficiently and favorably."
  },
  {
    id: 7,
    icon: "⏰",
    title: "Tax Extensions",
    description: "File extensions and ensure timely tax compliance.",
    details: "Need more time to file your business taxes? We can file extensions for you and ensure you meet all deadlines. This gives you extra time to gather documents while avoiding late filing penalties."
  },
  {
    id: 8,
    icon: "💡",
    title: "Advisory",
    description: "Strategic business financial planning and consulting.",
    details: "Our business advisory services include tax planning, financial strategy, growth planning, and business structure optimization. We help you build wealth and achieve your long-term business goals."
  }
];

const BusinessServiceCard = ({ service, isExpanded, onToggle, cardIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, cardIndex * 300); // 300ms delay between cards
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [cardIndex]);

  return (
    <div 
      ref={cardRef}
      className="service-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
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
        {businessServicePriceText[service.id]}
      </div>
    </div>
  );
};

const BusinessServices = () => {
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
          cardIndex={index}
        />
      ))}
    </div>
  );
};

export default BusinessServices;
