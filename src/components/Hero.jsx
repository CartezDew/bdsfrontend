import React from 'react'
import '../styles/hero.css'

const Hero = () => {
  return <>
    <section>
        <div className="container">
            {/* Hero Section */}
            <div className="branding-section">
                <h1>Peace of mind, {""} 
                    <span 
                    className="text-[#33673B] font-bold">
                    accounted
                    </span>{" "}
                    for!
                </h1>
                <p>Clear process, practical strategies, and reliable filings — grounded in organized records and strategic advice
                </p>
                {/* CTA Buttons */}
                <div className="cta-buttons">
                    <button className="cta-button-primary">Schedule a Consultation</button>
                    <button className="cta-button-secondary">Get Started</button>
                </div>
            </div>
            {/* Hero Section */}
            <div className="hero-section"></div>
        </div>
    </section>
    </>;
  };
//     <div className="home">
//       <header className="home-header">
//         <h1>Welcome to BDS Accounting</h1>
//         <p>Professional accounting services for your business</p>
//       </header>
      
//       <main className="home-main ">
//         <section className="hero-section">
//           <h2>Your Trusted Financial Partner</h2>
//           <p>We provide comprehensive accounting, bookkeeping, and financial consulting services to help your business thrive.</p>
//           <button className="cta-button">Get Started</button>
//         </section>
//         <section className="services-section">
//           <h3>Our Services</h3>
//           <div className="services-grid">
//             <div className="service-card">
//               <h4>Bookkeeping</h4>
//               <p>Accurate and timely financial record keeping</p>
//             </div>
//             <div className="service-card">
//               <h4>Tax Preparation</h4>
//               <p>Expert tax planning and preparation</p>
//             </div>
//             <div className="service-card">
//               <h4>Financial Analysis</h4>
//               <p>Insights to drive business decisions</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }



export default Hero