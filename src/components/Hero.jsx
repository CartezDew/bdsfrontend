import React from 'react'
import '../styles/hero.css'

const Hero = () => {
  return (
    <section className="hero-section">
        {/* Hero Content */}
        <div className="hero-content">
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
        {/* Hero Image */}
        <div className="hero-image-container">
            <img src="/hero_images/Young-clients.jpg" alt="Young clients consulting with BDS" />
        </div>
    </section>
  );
};

export default Hero