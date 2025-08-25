import React from 'react';
import '../styles/servicesDetailed.css';

const ServicesDetailed = ({ serviceType = 'individual' }) => {
  // Service pricing text
  const individualServicePriceText = {
    1: "Starting at $175",
    2: "Starting at $99 (mo)",
    3: "Starting at $175 (hr)",
    4: "Starting at $300",
    5: "Starting at $35",
    6: "Starting at $150 (hr)"
  };


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

  // Business services details
  const businessServicesDetails = [
    {
      id: 1,
      icon: "📊",
      title: "Tax Returns",
      serviceId: "tax-returns",
      longDescription: "Complete 1065/1120/1120-S prep—apportionment, depreciation, K-1s—plus entity-specific deductions, credits, and elections. Audit-ready.",
      whatsIncluded: [
        "Federal and state business returns (1065, 1120, 1120-S) with e-file",
        "Schedule K-1s for owners/partners and basis tracking",
        "Vehicle & home office deductions (substantiation)",
        "Repairs vs. improvements (safe harbor rules)"
      ],
      idealFor: [
        "LLCs/partnerships, S-corps, and C-corps",
        "Multi-state or growing teams with nexus in several states",
        "First-year filers or businesses undergoing ownership changes"
      ],
      process: [
        "Intake & prior-year review",
        "Draft preparation & review call",
        "Owner K-1 delivery, e-file, and closeout package"
      ],
      deliverables: [
        "Filed federal/state returns (PDF)",
        "Owner K-1s and payment vouchers/estimates",
        "Year-end tax summary with next-year planning notes"
      ],
      pricingNote:
        "Pricing varies by entity type, number of states, and bookkeeping condition."
    },
    {
      id: 2,
      icon: "💸",
      title: "Payroll Services",
      serviceId: "payroll-services",
      longDescription: "On-time payroll for employees & contractors—automated taxes, filings, multi-state, year-end handled.",
      whatsIncluded: [
        "Payroll setup (direct deposit, withholdings, benefits/garnishments)",
        "Automated tax deposits and filings (941, 940, state unemployment)",
        "Quarterly/annual forms: W-2/W-3, 1099/1096",
        "New-hire reporting and self-service portals"
      ],
      idealFor: [
        "Teams of 1–50+ employees or mixed W-2/1099 workforces",
        "Remote/multi-state staff with complex withholding",
        "Owners wanting audit-ready payroll records"
      ],
      process: [
        "Discovery & system setup",
        "First payroll parallel run",
        "Monthly processing & quarterly compliance checks"
      ],
      deliverables: [
        "Payroll registers and pay stubs",
        "Tax filing confirmations/receipts",
        "Year-end W-2s and 1099s for staff/contractors"
      ],
      pricingNote:
        "Monthly base plus per-employee fees; additional charges for multi-state or special filings."
    },
    {
      id: 3,
      icon: "📈",
      title: "Bookkeeping",
      serviceId: "bookkeeping",
      longDescription:
        "Clean, timely books—monthly close, reconciliations, GAAP categories. Investor/tax-ready with clear spend, margins, cash.",
      whatsIncluded: [
        "Bank/credit-card feeds, rules-based categorization, and reconciliations",
        "Monthly close with accruals/adjusting entries",
        "A/R & A/P aging and vendor/customer cleanup",
        "Year-end tax package for your preparer"
      ],
      idealFor: [
        "Startups and growing SMBs needing reliable monthly financials",
        "Businesses preparing for funding or sale",
        "Owners wanting clear visibility into performance"
      ],
      process: [
        "Setup & historical cleanup",
        "Monthly processing & close",
        "Quarterly reviews & year-end package"
      ],
      deliverables: [
        "Monthly financial statements",
        "Quarterly performance reviews",
        "Year-end tax package"
      ],
      pricingNote:
        "Monthly subscription based on transaction volume and complexity."
    },
    {
      id: 4,
      icon: "⚖️",
      title: "Compliance",
      serviceId: "compliance",
      longDescription: "Stay compliant with business tax laws and regulations through proactive management and documentation.",
      whatsIncluded: [
        "Business tax obligation assessment and planning",
        "Regulatory compliance monitoring",
        "Documentation requirements and record keeping",
        "Penalty avoidance strategies"
      ],
      idealFor: [
        "Businesses with complex tax situations",
        "Those wanting to avoid penalties",
        "Companies needing help with documentation"
      ],
      process: [
        "Compliance review",
        "Documentation setup",
        "Ongoing monitoring"
      ],
      deliverables: [
        "Compliance checklist",
        "Documentation templates",
        "Regular compliance updates"
      ],
      pricingNote:
        "Monthly subscription with setup fee."
    },
    {
      id: 5,
      icon: "📋",
      title: "Reporting",
      serviceId: "reporting",
      longDescription: "Comprehensive business financial reporting and analysis to help you make informed decisions.",
      whatsIncluded: [
        "Financial statement preparation",
        "Trend analysis and insights",
        "Custom report creation",
        "Performance metrics and KPIs"
      ],
      idealFor: [
        "Businesses wanting financial clarity",
        "Those planning major investments",
        "Companies tracking financial goals"
      ],
      process: [
        "Data collection",
        "Analysis and reporting",
        "Insights and recommendations"
      ],
      deliverables: [
        "Financial reports",
        "Analysis insights",
        "Actionable recommendations"
      ],
      pricingNote:
        "Per report or monthly subscription."
    },
    {
      id: 6,
      icon: "🔍",
      title: "Audits",
      serviceId: "audits",
      longDescription: "Professional representation during IRS audits and reviews with expert guidance.",
      whatsIncluded: [
        "Audit preparation and documentation review",
        "IRS communication and representation",
        "Response preparation and filing",
        "Settlement negotiation if needed"
      ],
      idealFor: [
        "Businesses facing IRS audits",
        "Those needing audit representation",
        "Companies with complex tax situations"
      ],
      process: [
        "Audit notification review",
        "Documentation preparation",
        "IRS representation",
        "Resolution"
      ],
      deliverables: [
        "Audit response package",
        "Representation services",
        "Resolution documentation"
      ],
      pricingNote:
        "Hourly rate for representation services."
    },
    {
      id: 7,
      icon: "⏰",
      title: "Tax Extensions",
      serviceId: "tax-extensions",
      longDescription:
        "Fast, accurate federal and state extensions (Form 7004 and equivalents) with estimated payments to minimize interest and penalties.",
      whatsIncluded: [
        "Extension prep/e-file for partnerships, S-corps, and C-corps",
        "State extensions and franchise tax considerations",
        "Safe-harbor estimate calculations and payment vouchers",
        "Reminder schedule for final filing deliverables"
      ],
      idealFor: [
        "Books cleanup or first-year setups still in progress",
        "Businesses awaiting K-1s/third-party statements",
        "Multi-state filers needing coordinated deadlines"
      ],
      process: [
        "Quick intake & prior-year review",
        "E-file extension and confirmation"
      ],
      deliverables: [
        "Extension confirmations (federal/state)",
        "Estimate worksheets and vouchers",
        "Final-filing timeline and checklist"
      ],
      pricingNote:
        "Flat per entity; additional states billed separately."
    },
    {
      id: 8,
      icon: "💡",
      title: "Advisory",
      serviceId: "advisory",
      longDescription:
        "Practical, CFO-level advice for structure, strategy, and taxes. We help you improve margins, manage cash, and plan for growth, funding, or exit—with clear, actionable steps.",
      whatsIncluded: [
        "Entity selection/restructuring and ownership/basis planning",
        "Pricing, margin, and unit-economics analysis",
        "Cash management, runway planning, and financing readiness",
        "Systems stack guidance (accounting, payroll, AP/AR, reporting)"
      ],
      idealFor: [
        "Growing SMBs needing recurring CFO-style support",
        "Pre-raise or lender-ready companies",
        "Owners planning expansion, acquisition, or exit"
      ],
      process: [
        "Discovery & goal setting",
        "90-day roadmap with quick wins",
        "Monthly/quarterly reviews and adjustments"
      ],
      deliverables: [
        "Strategy roadmap with KPIs/OKRs",
        "Implementation checklists and SOPs",
        "Quarterly scorecards and action plans"
      ],
      pricingNote:
        "Hourly or retainer; project pricing available for one-time initiatives."
    }
  ];

  // Detailed content per section
  const individualServiceDetails = [
    {
      id: 1,
      icon: "📊",
      title: "Tax Returns",
      serviceId: "tax-returns",
      longDescription: "Personalized returns for W-2, 1099, investments, and rentals—maximize deductions, audit-ready.",
      whatsIncluded: [
        "Full intake review (income sources, life events, deductions/credits)",
        "Preparation for W-2/1099, Schedule C, E (rentals), capital gains, K-1s",
        "e-File with direct-deposit/refund tracking",
        "Personalized tax summary with insights for next year"
      ],
      idealFor: [
        "W-2 earners with additional income (1099, gig, rental, investment)",
        "First-time investors (brokerage/crypto) or new landlords",
        "Multi-state movers or remote employees"
      ],
      process: ["Get started with our secure document upload", "Preparation & quality review", "e-File, final package, and next-year plan"],
      deliverables: [
        "Filed federal/state returns (PDF)",
        "Year-end tax summary and deductions checklist",
        "Support for IRS/state notices related to the filed return"
      ],
      pricingNote:
        "Pricing varies by complexity (forms/schedules, investments, rentals)."
    },
    {
      id: 2,
      icon: "📈",
      title: "Bookkeeping",
      serviceId: "bookkeeping",
      longDescription: "Monthly categorizations & reconciliations—clean, tax-ready books with clear cash-flow insight.",
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
      process: ["Initial setup & account connections", "Monthly processing & categorization", "Quarterly reviews & year-end package"],
      deliverables: [
        "Monthly financial statements",
        "Year-end tax package",
        "Ongoing support and quarterly check-ins"
      ],
      pricingNote:
        "Monthly subscription with setup fee."
    },
    {
      id: 3,
      icon: "⚖️",
      title: "Compliance",
      serviceId: "compliance",
      longDescription: "Stay compliant with tax laws and regulations through proactive management and documentation.",
      whatsIncluded: [
        "Tax obligation assessment and planning",
        "Documentation requirements and record keeping",
        "Compliance monitoring and updates",
        "Penalty avoidance strategies"
      ],
      idealFor: [
        "Individuals with complex tax situations",
        "Those who want to avoid penalties",
        "People needing help with documentation"
      ],
      process: ["Compliance review", "Documentation setup", "Ongoing monitoring"],
      deliverables: [
        "Compliance checklist",
        "Documentation templates",
        "Regular compliance updates"
      ],
      pricingNote:
        "Hourly rate for consultation and setup."
    },
    {
      id: 4,
      icon: "📋",
      title: "Reporting",
      serviceId: "reporting",
      longDescription: "Comprehensive financial reporting and analysis to help you make informed decisions.",
      whatsIncluded: [
        "Financial statement preparation",
        "Trend analysis and insights",
        "Custom report creation",
        "Performance metrics and KPIs"
      ],
      idealFor: [
        "Individuals wanting financial clarity",
        "Those planning major purchases",
        "People tracking financial goals"
      ],
      process: ["Data collection", "Analysis and reporting", "Insights and recommendations"],
      deliverables: [
        "Financial reports",
        "Analysis insights",
        "Actionable recommendations"
      ],
      pricingNote:
        "Per report or monthly subscription."
    },
    {
      id: 5,
      icon: "🔍",
      title: "Audits",
      serviceId: "audits",
      longDescription: "Professional representation during IRS audits and reviews with expert guidance.",
      whatsIncluded: [
        "Audit preparation and documentation review",
        "IRS communication and representation",
        "Response preparation and filing",
        "Settlement negotiation if needed"
      ],
      idealFor: [
        "Individuals facing IRS audits",
        "Those needing audit representation",
        "People with complex tax situations"
      ],
      process: ["Audit notification review", "Documentation preparation", "IRS representation", "Resolution"],
      deliverables: [
        "Audit response package",
        "Representation services",
        "Resolution documentation"
      ],
      pricingNote:
        "Hourly rate for representation services."
    },
    {
      id: 6,
      icon: "⏰",
      title: "Tax Extensions",
      serviceId: "tax-extensions",
      longDescription: "File extensions and ensure timely tax compliance with proper documentation.",
      whatsIncluded: [
        "Extension preparation and filing",
        "Estimated payment calculations",
        "Deadline management",
        "Final filing coordination"
      ],
      idealFor: [
        "Individuals needing more time",
        "Those with complex tax situations",
        "People awaiting documentation"
      ],
      process: ["Extension preparation", "Filing and confirmation", "Final filing coordination"],
      deliverables: [
        "Extension confirmation",
        "Estimated payment vouchers",
        "Final filing timeline"
      ],
      pricingNote:
        "Flat fee for extension filing."
    }
  ];

  // Single section block
  const Section = ({ detail, index, priceText }) => {
    return (
      <section 
        className="servicesdetailed-service-section" 
        id={detail.serviceId}
      >
        <div className="servicesdetailed-content-col">
          <div className="servicesdetailed-section-header">
            <div className="servicesdetailed-header-main">
              <span className="servicesdetailed-service-icon" aria-hidden>{detail.icon}</span>
              <h2 className="servicesdetailed-service-title">{detail.title}</h2>
            </div>
            <div 
              className="servicesdetailed-price-chip detailed-price-chip" 
              id={`price-chip-${detail.id}`}
              style={{
                background: '#CC3F0C',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '2rem',
                fontSize: '1rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(204, 63, 12, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#9A6D38';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(154, 109, 56, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#CC3F0C';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(204, 63, 12, 0.3)';
              }}
            >
              {priceText[detail.id]}
            </div>
          </div>

          <div className="servicesdetailed-description-section">
            <p className="servicesdetailed-lede">{detail.longDescription}</p>
          </div>

          <div className="servicesdetailed-highlights-grid">
            <div className="servicesdetailed-highlight-card"
              style={{
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 12px 32px rgba(42, 90, 47, 0.15)';
                e.target.style.borderColor = 'var(--color-hunter-green)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(42, 90, 47, 0.06)';
                e.target.style.borderColor = 'rgba(42, 90, 47, 0.1)';
              }}
            >
              <h4 className="servicesdetailed-highlight-title">
                <span className="servicesdetailed-highlight-icon">✨</span>
                What's Included
              </h4>
              <ul className="servicesdetailed-highlight-list">
                {detail.whatsIncluded.map((li, i) => (
                  <li key={i} className="servicesdetailed-highlight-item">{li}</li>
                ))}
              </ul>
            </div>
            
            <div className="servicesdetailed-highlight-card"
              style={{
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 12px 32px rgba(42, 90, 47, 0.15)';
                e.target.style.borderColor = 'var(--color-hunter-green)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(42, 90, 47, 0.06)';
                e.target.style.borderColor = 'rgba(42, 90, 47, 0.1)';
              }}
            >
              <h4 className="servicesdetailed-highlight-title">
                <span className="servicesdetailed-highlight-icon">🎯</span>
                Ideal For
              </h4>
              <ul className="servicesdetailed-highlight-list">
                {detail.idealFor.map((li, i) => (
                  <li key={i} className="servicesdetailed-highlight-item">{li}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="servicesdetailed-process-section">
            <h4 className="servicesdetailed-process-title">
              <span className="servicesdetailed-process-icon">🔄</span>
              How It Works
            </h4>
            <ol className="servicesdetailed-process-list">
              {detail.process.map((step, i) => (
                <li key={i} className="servicesdetailed-process-step"
                  style={{
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(4px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(42, 90, 47, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span className="servicesdetailed-step-number">{i + 1}</span>
                  <span className="servicesdetailed-step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="servicesdetailed-deliverables-section">
            <h4 className="servicesdetailed-deliverables-title">
              <span className="servicesdetailed-deliverables-icon">📦</span>
              Deliverables
            </h4>
            <ul className="servicesdetailed-deliverables-list">
              {detail.deliverables.map((li, i) => (
                <li key={i} className="servicesdetailed-deliverables-item">{li}</li>
              ))}
            </ul>
          </div>

          {detail.pricingNote && (
            <div className="servicesdetailed-pricing-section">
              <p className="servicesdetailed-pricing-note">{detail.pricingNote}</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Determine which services to render based on serviceType
  const servicesToRender = serviceType === 'business' ? businessServicesDetails : individualServiceDetails;
  const priceTextToUse = serviceType === 'business' ? businessServicePriceText : individualServicePriceText;

  return (
    <div className="servicesdetailed-section">
      <div className="servicesdetailed-container">
        {servicesToRender.map((detail, idx) => (
          <Section key={detail.id} detail={detail} index={idx} priceText={priceTextToUse} />
        ))}
      </div>
    </div>
  );
};

export default ServicesDetailed;
