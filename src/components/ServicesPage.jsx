import React, { useState, useEffect, useRef } from 'react';
import { useServiceContext } from '../context/ServiceContext';
import { motion } from 'framer-motion';
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
      threshold: 0.05, // 5% visibility - triggers when 5% of element is visible
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

          {/* Detailed Individual Services Section */}
          {serviceType === 'individual' && (
            <div className="servicespage-detailed-section">
              <IndividualServiceDetails />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Individual Service Details Component
const IndividualServiceDetails = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Service pricing text
  const individualServicePriceText = {
    1: "Starting at $175",
    2: "Starting at $99 (mo)",
    3: "Starting at $175 (hr)",
    4: "Starting at $300",
    5: "Starting at $35",
    6: "Starting at $150 (hr)"
  };

  // Detailed content per section
  const individualServiceDetails = [
    {
      id: 1,
      icon: "📊",
      title: "Tax Returns",
      longDescription:
        "Personalized preparation for simple to complex returns, including multi-state, investment activity, and rental properties. We proactively surface deduction opportunities and provide a clean, audit-ready package for your records.",
      whatsIncluded: [
        "Full intake review (income sources, life events, deductions/credits)",
        "Preparation for W-2/1099, Schedule C, E (rentals), capital gains, K-1s",
        "Multi-state filings and local returns when applicable",
        "e-File with direct-deposit/refund tracking",
        "Personalized tax summary with insights for next year"
      ],
      idealFor: [
        "W-2 earners with additional income (1099, gig, rental, investment)",
        "First-time investors (brokerage/crypto) or new landlords",
        "Multi-state movers or remote employees"
      ],
      process: ["Kickoff & secure document upload", "Preparation & quality review", "e-File, final package, and next-year plan"],
      deliverables: [
        "Filed federal/state returns (PDF)",
        "Year-end tax summary and deductions checklist",
        "Support for IRS/state notices related to the filed return"
      ],
      pricingNote:
        "Pricing varies by complexity (forms/schedules, multi-state, investments, rentals)."
    },
    {
      id: 2,
      icon: "📈",
      title: "Bookkeeping",
      longDescription:
        "Month-to-month categorization and reconciliation that turns your bank feeds into clean, tax-ready financials. Get visibility into cash flow, spending trends, and savings goals—without the spreadsheet grind.",
      whatsIncluded: [
        "Secure bank/credit card feed connections",
        "Rules-based categorization & monthly reconciliations",
        "Monthly statement pack (cash flow, categorized spend, trends)",
        "Year-end tax package for your preparer",
        "Quarterly check-ins to adjust categories and goals"
      ],
      idealFor: [
        "Busy professionals who want automated, accurate books",
        "Side-hustlers who need clean records for taxes",
        "Households tracking budgets against goals"
      ],
      process: ["Onboarding & connections", "Monthly close & report pack", "Quarterly review & optimization"],
      deliverables: [
        "Monthly PDF report pack (cash flow, category trends)",
        "CSV exports for budgeting apps",
        "Year-end tax package (all statements & category summaries)"
      ],
      pricingNote:
        "Monthly rate depends on account volume and transaction count."
    },
    {
      id: 3,
      icon: "⚖️",
      title: "Compliance",
      longDescription:
        "Stay ahead of deadlines and avoid penalties. We set up reminders, estimates, and filings so your obligations are handled on time—without guesswork.",
      whatsIncluded: [
        "Estimated tax planning & quarterly reminders",
        "State/local filings (where applicable)",
        "Guidance for 1099-K/marketplace reporting",
        "Record-keeping checklists and retention timelines"
      ],
      idealFor: [
        "Taxpayers with quarterly estimates",
        "People with income in multiple states",
        "Anyone who's received a notice and wants ongoing guardrails"
      ],
      process: ["Compliance review & calendar setup", "Quarterly monitoring", "Year-end wrap-up & next-year plan"],
      deliverables: [
        "Personal compliance calendar with reminders",
        "Documentation checklists",
        "Notice response templates (as needed)"
      ],
      pricingNote:
        "Hourly or fixed-fee depending on scope (multi-state, notices, special filings)."
    },
    {
      id: 4,
      icon: "📋",
      title: "Reporting",
      longDescription:
        "Clarity on your personal finances: custom reports that translate transactions into decisions. Understand where money goes and how to optimize taxes and savings.",
      whatsIncluded: [
        "Custom category framework aligned to goals",
        "Budget vs. actual tracking with variance notes",
        "Net-worth snapshot and trend line (optional)",
        "Goal tracking (debt payoff, emergency fund, investing)"
      ],
      idealFor: [
        "Households building a plan for savings/debt reduction",
        "Side-hustlers balancing cash flow and taxes",
        "Anyone who wants decision-ready financial visuals"
      ],
      process: ["Discovery & report design", "Data pull & buildout", "Review session & tuning"],
      deliverables: [
        "PDF/CSV reports and dashboard exports",
        "Quarterly progress summary with recommendations"
      ],
      pricingNote:
        "Fixed packages available; custom dashboards priced by complexity."
    },
    {
      id: 5,
      icon: "🔍",
      title: "Audits & Notices",
      longDescription:
        "From first notice to final resolution, we manage the paper trail and communication so you don't have to. Our focus: minimize penalties and close the loop quickly.",
      whatsIncluded: [
        "Notice decoding and response strategy",
        "Document request list & secure file handling",
        "Representation and correspondence with IRS/state",
        "Penalty abatement request (when warranted)"
      ],
      idealFor: [
        "CP2000/under-reporting notices",
        "Math/clerical error letters",
        "State residency and withholding inquiries"
      ],
      process: ["Assess & plan", "Assemble evidence", "Respond & follow-through"],
      deliverables: [
        "Filed responses and proof of submission",
        "Status updates until closure",
        "Post-resolution summary and prevention steps"
      ],
      pricingNote:
        "Priced by notice type and depth of research/representation required."
    },
    {
      id: 6,
      icon: "⏰",
      title: "Tax Extensions",
      longDescription:
        "No rush filing. We secure your automatic extension and estimate any payment due to avoid unnecessary penalties or interest.",
      whatsIncluded: [
        "Federal and state extension submissions",
        "Estimated payment calculation & vouchers",
        "Document checklist for post-extension filing",
        "Deadline reminders and next-steps timeline"
      ],
      idealFor: [
        "Late or missing documents (brokerage, K-1, 1099)",
        "New life events (home sale, relocation, business start)",
        "Complex returns needing more prep time"
      ],
      process: ["Quick assessment", "Estimate & submit", "File return by extended deadline"],
      deliverables: [
        "Extension confirmation",
        "Payment vouchers/receipts",
        "Customized filing timeline"
      ],
      pricingNote:
        "Flat fee for extension filing; return preparation priced separately."
    }
  ];

  // Single section block with image on the right
  const Section = ({ detail, index }) => {
    const sectionRef = useRef(null);
    const isVisible = visibleSections.has(detail.id);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, detail.id]));
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px' }
      );
      
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
      
      return () => observer.disconnect();
    }, [detail.id]);
    
    return (
      <section className="servicespage-service-section" id={`service-${detail.id}`} ref={sectionRef}>
        <div className={`servicespage-content-col ${isVisible ? 'servicespage-animate-in' : ''}`}>
          <div className="servicespage-section-header">
            <div className="servicespage-header-main">
              <span className="servicespage-service-icon" aria-hidden>{detail.icon}</span>
              <h2 className="servicespage-service-title">{detail.title}</h2>
            </div>
            <div className="servicespage-price-chip">{individualServicePriceText[detail.id]}</div>
          </div>

          <div className="servicespage-description-section">
            <p className="servicespage-lede">{detail.longDescription}</p>
          </div>

          <div className="servicespage-highlights-grid">
            <div className="servicespage-highlight-card">
              <h4 className="servicespage-highlight-title">
                <span className="servicespage-highlight-icon">✨</span>
                What's Included
              </h4>
              <ul className="servicespage-highlight-list">
                {detail.whatsIncluded.map((li, i) => (
                  <li key={i} className="servicespage-highlight-item">{li}</li>
                ))}
              </ul>
            </div>
            
            <div className="servicespage-highlight-card">
              <h4 className="servicespage-highlight-title">
                <span className="servicespage-highlight-icon">🎯</span>
                Ideal For
              </h4>
              <ul className="servicespage-highlight-list">
                {detail.idealFor.map((li, i) => (
                  <li key={i} className="servicespage-highlight-item">{li}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="servicespage-process-section">
            <h4 className="servicespage-process-title">
              <span className="servicespage-process-icon">🔄</span>
              How It Works
            </h4>
            <ol className="servicespage-process-list">
              {detail.process.map((step, i) => (
                <li key={i} className="servicespage-process-step">
                  <span className="servicespage-step-number">{i + 1}</span>
                  <span className="servicespage-step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="servicespage-deliverables-section">
            <h4 className="servicespage-deliverables-title">
              <span className="servicespage-deliverables-icon">📦</span>
              Deliverables
            </h4>
            <ul className="servicespage-deliverables-list">
              {detail.deliverables.map((li, i) => (
                <li key={i} className="servicespage-deliverables-item">{li}</li>
              ))}
            </ul>
          </div>

          {detail.pricingNote && (
            <div className="servicespage-pricing-section">
              <p className="servicespage-pricing-note">{detail.pricingNote}</p>
            </div>
          )}
        </div>


      </section>
    );
  };

  return (
    <div className="servicespage-service-page">
      {individualServiceDetails.map((detail, idx) => (
        <Section key={detail.id} detail={detail} index={idx} />
      ))}
    </div>
  );
};

export default ServicesPage;
