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
        "Cash-basis companies transitioning to accrual",
        "Businesses preparing for financing, grants, or taxes"
      ],
      process: [
        "Onboarding & chart-of-accounts tune-up",
        "Monthly close & management reports",
        "Quarterly review and optimization"
      ],
      deliverables: [
        "Monthly P&L, Balance Sheet, Cash Flow, and Trial Balance",
        "Account reconciliations and tie-outs",
        "Year-end tax package and GL detail export"
      ],
      pricingNote:
        "Tiered by transaction volume, number of accounts, and complexity."
    },
    {
      id: 4,
      icon: "⚖️",
      title: "Compliance",
      longDescription:
        "Proactive compliance management to prevent penalties and surprises.",
      whatsIncluded: [
        "Sales/use tax registrations and filings",
        "1099 preparation/e-file and W-9 collection process"
      ],
      idealFor: [
        "E-commerce and multi-location businesses",
        "New entities that need guardrails from day one"
      ],
      process: [
        "Registrations and remediation",
        "Ongoing monitoring & filings"
      ],
      deliverables: [
        "Filed confirmations and receipts",
        "SOPs and document retention guidelines"
      ],
      pricingNote:
        "Per-filing or monthly retainer depending on scope and jurisdictions."
    },
    {
      id: 5,
      icon: "📋",
      title: "Reporting",
      longDescription:
        "Tailored reporting: KPIs, Budget vs Actuals, variance analysis, runway—backed by concise, actionable narrative.",
      whatsIncluded: [
        "Custom management pack (P&L by class/location, margins, trends)",
        "Budgeting/forecasting and variance analysis",
        "Cash flow projections and scenario planning"
      ],
      idealFor: [
        "Businesses that want clear, visual insights each month",
        "Teams preparing for board or lender updates"
      ],
      process: [
        "Metrics workshop & data mapping",
        "Monthly cadence with insights & actions"
      ],
      deliverables: [
        "Monthly PDF decks",
        "Budget & forecast models",
        "Executive commentary with recommended actions"
      ],
      pricingNote:
        "Depends on data sources, integrations, and dashboard complexity."
    },
    {
      id: 6,
      icon: "🔍",
      title: "Audits",
      longDescription: "Experienced End-to-end audit representation—IRS/state, payroll, and sales tax. Evidence, correspondence, resolution handled.",
      whatsIncluded: [
        "Notice review, risk assessment",
        "Customized document request list and evidence compilation",
        "Penalty abatement and payment plan support when applicable"
      ],
      idealFor: [
        "IRS/state correspondence or field audits",
        "Payroll tax and sales/use tax examinations",
        "Businesses responding to unexpected notices"
      ],
      process: [
        "Intake & POA filing",
        "Evidence gathering & position memo",
        "Agency response, follow-ups, and resolution"
      ],
      deliverables: [
        "Filed responses and status updates",
        "Closing agreements/NOAs retained for your records",
        "Post-audit recommendations to prevent recurrences"
      ],
      pricingNote:
        "Hourly with an initial retainer; flat fees available for discrete notices."
    },
    {
      id: 7,
      icon: "⏰",
      title: "Tax Extensions",
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
      longDescription: "Deadlines handled: reminders, estimates, and filings to help you avoid penalties.",
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
      longDescription: "Custom dashboards & reports—track KPIs, budget vs. actuals, and cash flow you can act on.",
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
      longDescription: "Audit support from notice to close—docs, responses, and representation.",
      whatsIncluded: [
        "Audit notice review and response preparation",
        "Documentation gathering and organization",
        "Communication with IRS agents",
      ],
      idealFor: [
        "Taxpayers receiving audit notices",
        "Businesses facing IRS examinations",
        "Anyone needing audit preparation help"
      ],
      process: ["Notice review & assessment", "Documentation preparation", "Resolution & follow-up"],
      deliverables: [
        "Audit response packages",
        "Documentation checklists",
        "Audit resolution summaries"
      ],
      pricingNote:
        "Hourly rate for audit support services."
    },
    {
      id: 6,
      icon: "📚",
      title: "Tax Planning",
      longDescription: "Tailored tax strategies—reduce taxes now and later with clear next steps.",
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
  const Section = ({ detail, index, priceText }) => {
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
