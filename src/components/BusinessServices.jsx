import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const businessServicePriceText = {
  1: "Starting at $525",
  2: "Starting at $199 (mo)",       // Payroll Services
  3: "Starting at $129 (mo)",       // Bookkeeping 
  4: "Starting at $149 (mo)",       // Compliance 
  5: "Starting at $400",            // Reporting
  6: "Starting at $50",             // Tax Extensions 
  7: "Starting at $175 (hr)",       // Advisory 
  8: "Starting at $175 (hr)"        // Tax Notice Resolution
};

const businessServicesData = [
  {
    id: 1,
    icon: "🧾",
    title: "Tax Returns",
    description: "Complete business tax return preparation and filing services.",
    serviceId: "business-tax-returns"
  },
  {
    id: 2,
    icon: "💸",
    title: "Payroll Services",
    description: "Run payroll accurately and on time—W-2s, 1099s, and tax filings handled.",
    serviceId: "payroll-services"
  },
  {
    id: 3,
    icon: "📚",
    title: "Bookkeeping",
    description: "Monthly bookkeeping and financial record maintenance.",
    serviceId: "business-bookkeeping"
  },
  {
    id: 4,
    icon: "⚖️",
    title: "Compliance",
    description: "Ensure your business meets all regulatory requirements.",
    serviceId: "business-compliance"
  },
  {
    id: 5,
    icon: "📋",
    title: "Reporting",
    description: "Comprehensive financial reporting and analysis.",
    serviceId: "business-reporting"
  },
  {
    id: 6,
    icon: "⏰",
    title: "Tax Extensions",
    description: "File extensions and ensure timely tax compliance.",
    serviceId: "business-tax-extensions"
  },
  {
    id: 7,
    icon: "💡",
    title: "Advisory",
    description: "Strategic business financial planning and consulting.",
    serviceId: "advisory"
  },
  {
    id: 8,
    icon: "📬",
    title: "Tax Notices",
    description: "Tax letter? We review, respond, and resolve.",
    serviceId: "biz-notice-resolution"
  }
];

const BusinessServiceCard = ({ service, cardIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLearnMore = () => {
    if (location.pathname === '/services') {
      const params = new URLSearchParams(location.search);
      params.set('type', 'business');
      params.set('service', service.serviceId);
      navigate({ pathname: '/services', search: `?${params.toString()}` });
    } else {
      navigate(`/services?type=business&service=${service.serviceId}`);
    }
  };

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
      </div>
      
      <button
        className="learn-more-btn"
        onClick={handleLearnMore}
      >
        Learn More
        <span className="arrow">→</span>
      </button>
      
      {/* Price Display */}
      <div className="service-price">
        {businessServicePriceText[service.id]}
      </div>
    </div>
  );
};

const BusinessServices = () => {
  return (
    <div className="services-grid">
      {businessServicesData.map((service, index) => (
        <BusinessServiceCard
          key={service.id}
          service={service}
          cardIndex={index}
        />
      ))}
    </div>
  );
};

export default BusinessServices;
