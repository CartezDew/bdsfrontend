import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarMenu } from '../mockData/data'
import '../styles/navbar.css'

const Navbar = ({ customConfig }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    // Use custom config if provided, otherwise use default NavbarMenu
    const menuItems = customConfig || NavbarMenu

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* logo section */}
                <div className="logo-section">
                    <Link to="/" className="logo-link">
                        <img 
                            src="/favicon.svg" 
                            alt="BDS Accounting Logo" 
                            className="logo-image"
                        />
                        <h1 className="logo-text">Talent Group</h1>
                    </Link>
                </div>

                {/* menu section */}
                <div className="menu-section">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.id}
                            to={item.path} 
                            className="menu-link"
                        >
                            {item.name === 'Home' && (
                                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            )}
                            {item.name === 'Services' && (
                                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                                </svg>
                            )}
                            {item.name === 'About Us' && (
                                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {item.name === 'Contact Us' && (
                                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )}
                            {item.name === 'FAQ' && (
                                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <span className="menu-text">{item.name}</span>
                        </Link>
                    ))}
                </div>

                {/* icon section */}
                <div className="icon-section">
                    <button className="schedule-consultation-button">
                        Schedule a Consultation
                    </button>
                </div>

                {/* mobile menu section */}
                <div className="mobile-menu-section">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mobile-menu-button"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <div className={`mobile-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-dropdown-content">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.id}
                            to={item.path} 
                            className="mobile-dropdown-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar