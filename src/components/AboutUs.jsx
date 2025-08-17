import React from 'react';
import Navbar from './Navbar';
import Meet_Owner from './Meet_Owner';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Header */}
      <header className="about-hero">
        <div className="hero-content">
          <h1>About BDS Talent Group</h1>
          <p>Building trust through exceptional service and unwavering commitment to our clients' success</p>
        </div>
      </header>

      {/* Meet Owner Section */}
      <Meet_Owner />
    </div>
  );
};

export default AboutUs;
