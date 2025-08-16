import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to BDS Accounting</h1>
        <p>Professional accounting services for your business</p>
      </header>
      
      <main className="home-main ">
        <section className="hero-section">
          <h2>Your Trusted Financial Partner</h2>
          <p>We provide comprehensive accounting, bookkeeping, and financial consulting services to help your business thrive.</p>
          <button className="cta-button">Get Started</button>
        </section>
        <section className="services-section">
          <h3>Our Services</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>Bookkeeping</h4>
              <p>Accurate and timely financial record keeping</p>
            </div>
            <div className="service-card">
              <h4>Tax Preparation</h4>
              <p>Expert tax planning and preparation</p>
            </div>
            <div className="service-card">
              <h4>Financial Analysis</h4>
              <p>Insights to drive business decisions</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
