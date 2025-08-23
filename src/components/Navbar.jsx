import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { NavbarMenu } from '../mockData/data'
import '../styles/navbar.css'

const Navbar = ({ customConfig }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Use custom config if provided, otherwise use default NavbarMenu
    const menuItems = customConfig || NavbarMenu
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50
            setIsScrolled(scrolled)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle logo click - navigate to home and scroll to top
    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            // If already on home page, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            // Navigate to home page
            navigate('/')
        }
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* logo section */}
                <div className="logo-section">
                    <button className="logo-link" onClick={handleLogoClick}>
                        <img 
                            src="/favicon.svg" 
                            alt="BDS Accounting Logo" 
                            className="logo-image"
                        />
                        <h1 className="logo-text">Talent Group</h1>
                    </button>
                </div>

                {/* menu section */}
                <div className="menu-section">
                    {menuItems.map((item) => {
                        const isHashLink = item.path.startsWith('#')
                        
                        if (isHashLink) {
                            return (
                                <button
                                    key={item.id}
                                    className="menu-link"
                                    onClick={() => {
                                        const targetId = item.path.substring(1)
                                        const targetElement = document.getElementById(targetId)
                                        if (targetElement) {
                                            // Compute precise scroll position so navbar is flush with previous container
                                            const navbarEl = document.querySelector('.navbar')
                                            const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
                                            const rectTop = targetElement.getBoundingClientRect().top + window.scrollY
                                            const styles = window.getComputedStyle(targetElement)
                                            const marginTop = parseFloat(styles.marginTop) || 0
                                            const borderTop = parseFloat(styles.borderTopWidth) || 0
                                            const scrollPosition = rectTop - navbarHeight - marginTop - borderTop
                                            window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
                                        }
                                    }}
                                >
                                    {item.name === 'Home' && (
                                        <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    )}
                                    {item.name === 'Services' && (
                                        <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                    {item.name === 'Why Us' && (
                                        <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
                                </button>
                            )
                        }
                        
                        return (
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
                                {item.name === 'Why Us' && (
                                    <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
                        )
                    })}
                </div>

                {/* icon section */}
                <div className="icon-section">
                    <Link to="/get-started" className="get-started-btn">
                        Get Started
                    </Link>
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