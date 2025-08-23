import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    serviceId: "tax-returns"
  },
  {
    id: 2,
    icon: "📈",
    title: "Bookkeeping",
    description: "Monthly bookkeeping and financial record maintenance.",
    serviceId: "bookkeeping"
  },
  {
    id: 3,
    icon: "⚖️",
    title: "Compliance",
    description: "Ensure your personal finances meet all regulatory requirements.",
    serviceId: "compliance"
  },
  {
    id: 4,
    icon: "📋",
    title: "Reporting",
    description: "Comprehensive financial reporting and analysis.",
    serviceId: "reporting"
  },
  {
    id: 5,
    icon: "🔍",
    title: "Audits",
    description: "Professional representation during IRS audits and reviews.",
    serviceId: "audits"
  },
  {
    id: 6,
    title: "Tax Extensions",
    icon: "⏰",
    description: "File extensions and ensure timely tax compliance.",
    serviceId: "tax-extensions"
  }
];

const IndividualServiceCard = ({ service, cardIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

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
    navigate(`/services?type=individual&service=${service.serviceId}`);
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
        {individualServicePriceText[service.id]}
      </div>
    </div>
  );
};

const IndividualServices = () => {
  return (
    <div className="services-grid">
      {individualServicesData.map((service, index) => (
        <IndividualServiceCard
          key={service.id}
          service={service}
          cardIndex={index}
        />
      ))}
    </div>
  );
};

export default IndividualServices;
