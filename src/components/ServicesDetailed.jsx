import React from 'react';
import '../styles/servicesDetailed.css';

const ServicesDetailed = () => {
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
        "Personalized preparation for simple to complex returns, including investment activity, and rental properties. We proactively surface deduction opportunities and provide a clean, audit-ready package for your records.",
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
      longDescription:
        "Month-to-month categorization and reconciliation that turns your bank feeds into clean, tax-ready financials. Get visibility into cash flow, spending trends, and savings goals.",
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
        "Transform your data into actionable insights. We create custom reports and dashboards that help you understand your financial position and make informed decisions.",
      whatsIncluded: [
        "Custom financial reports and dashboards",
        "Key performance indicators (KPIs) tracking",
        "Budget vs. actual analysis",
        "Cash flow forecasting and projections",
        "Regular financial health check-ins"
      ],
      idealFor: [
        "Business owners needing financial insights",
        "Managers tracking department performance",
        "Investors monitoring portfolio companies"
      ],
      process: ["Data analysis & report design", "Dashboard creation & setup", "Ongoing monitoring & updates"],
      deliverables: [
        "Custom financial dashboards",
        "Monthly/quarterly report packages",
        "KPI tracking spreadsheets",
        "Financial health scorecards"
      ],
      pricingNote:
        "Fixed monthly rate with custom report development included."
    },
    {
      id: 5,
      icon: "🔍",
      title: "Audit Support",
      longDescription:
        "Expert guidance through IRS audits and examinations. We help you prepare documentation, respond to notices, and navigate the audit process with confidence.",
      whatsIncluded: [
        "Audit notice review and response preparation",
        "Documentation gathering and organization",
        "Communication with IRS agents",
        "Audit representation (if needed)",
        "Post-audit follow-up and planning"
      ],
      idealFor: [
        "Taxpayers receiving audit notices",
        "Businesses facing IRS examinations",
        "Anyone needing audit preparation help"
      ],
      process: ["Notice review & assessment", "Documentation preparation", "Audit representation", "Resolution & follow-up"],
      deliverables: [
        "Audit response packages",
        "Documentation checklists",
        "Communication templates",
        "Audit resolution summaries"
      ],
      pricingNote:
        "Hourly rate for audit support services."
    },
    {
      id: 6,
      icon: "📚",
      title: "Tax Planning",
      longDescription:
        "Strategic tax planning to minimize your tax burden and maximize savings. We analyze your situation and recommend strategies for current and future tax years.",
      whatsIncluded: [
        "Comprehensive tax situation analysis",
        "Tax-saving strategy recommendations",
        "Quarterly tax planning sessions",
        "Year-end tax optimization",
        "Multi-year tax planning roadmap"
      ],
      idealFor: [
        "High-income earners",
        "Business owners and investors",
        "Anyone with complex tax situations"
      ],
      process: ["Initial tax analysis", "Strategy development", "Implementation guidance", "Ongoing optimization"],
      deliverables: [
        "Tax planning reports",
        "Strategy implementation guides",
        "Quarterly planning summaries",
        "Tax optimization checklists"
      ],
      pricingNote:
        "Hourly rate for planning services with quarterly retainer options."
    }
  ];

  // Single section block
  const Section = ({ detail, index }) => {
    return (
      <section 
        className="servicesdetailed-service-section" 
        id={`service-${detail.id}`}
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
              {individualServicePriceText[detail.id]}
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

  return (
    <div className="servicesdetailed-section">
      <div className="servicesdetailed-container">
        {individualServiceDetails.map((detail, idx) => (
          <Section key={detail.id} detail={detail} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default ServicesDetailed;
