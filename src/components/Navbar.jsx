import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
        
        const handleExternalToggle = (e) => {
            console.log('[Navbar] toggleMobileMenu received', e && e.detail)
            setIsMobileMenuOpen(prev => !prev)
        }
        console.log('[Navbar] mounting, attaching toggleMobileMenu listeners')
        window.addEventListener('toggleMobileMenu', handleExternalToggle)
        document.addEventListener('toggleMobileMenu', handleExternalToggle)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('toggleMobileMenu', handleExternalToggle)
            document.removeEventListener('toggleMobileMenu', handleExternalToggle)
        }
    }, [])

    // Handle logo click - navigate to home and scroll to top
    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    const setMobileMenuOpenAndBroadcast = (nextOpen) => {
        setIsMobileMenuOpen(nextOpen)
        try {
            window.dispatchEvent(new CustomEvent('mobileMenuState', { detail: { open: nextOpen, source: 'navbar', ts: Date.now() } }))
        } catch {}
    }

    const toggleMobileMenuAndBroadcast = () => {
        setIsMobileMenuOpen(prev => {
            const next = !prev
            try { window.dispatchEvent(new CustomEvent('mobileMenuState', { detail: { open: next, source: 'navbar', ts: Date.now() } })) } catch {}
            return next
        })
    }

    // Keep body class in sync with open state (hide hero hamburger while opening/visible)
    useEffect(() => {
        if (isMobileMenuOpen) {
            try { document.body.classList.add('mobile-menu-opened'); } catch {}
        }
    }, [isMobileMenuOpen])

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
                        // Hide Services button when on /services route
                        if (item.path === '#services' && location.pathname === '/services') {
                            return null
                        }
                        
                        const isHashLink = item.path.startsWith('#')
                        
                        if (isHashLink) {
                            return (
                                <button
                                    key={item.id}
                                    className="menu-link"
                                    onClick={() => {
                                        const targetId = item.path.substring(1)
                                        // If not on home page, navigate to home with hash so App-level
                                        // hash handler performs precise mount scroll.
                                        if (location.pathname !== '/') {
                                            navigate(`/#${targetId}`)
                                            return
                                        }

                                        const targetElement = document.getElementById(targetId)
                                        if (targetElement) {
                                            // Compute precise scroll position so navbar is flush with target top
                                            const navbarEl = document.querySelector('.navbar')
                                            const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
                                            const rectTop = targetElement.getBoundingClientRect().top + window.scrollY
                                            const styles = window.getComputedStyle(targetElement)
                                            const marginTop = parseFloat(styles.marginTop) || 0
                                            const borderTop = parseFloat(styles.borderTopWidth) || 0
                                            const scrollPosition = rectTop - navbarHeight - marginTop - borderTop
                                            window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
                                        }
                                        // Close mobile menu after navigation
                                        setMobileMenuOpenAndBroadcast(false)
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
                        } else {
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className="menu-link"
                                    onClick={() => setMobileMenuOpenAndBroadcast(false)}
                                >
                                    <span className="menu-text">{item.name}</span>
                                </Link>
                            )
                        }
                    })}
                </div>

                {/* Mobile Navigation Toggle */}
                <button 
                    className={`mobile-nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenuAndBroadcast}
                    aria-label="Toggle mobile menu"
                >
                    <span className="mobile-nav-line"></span>
                    <span className="mobile-nav-line"></span>
                </button>

                {/* icon section */}
                <div className="icon-section">
                    <Link to="/get-started" className="get-started-btn" onClick={() => setMobileMenuOpenAndBroadcast(false)}>
                        Get Started
                    </Link>
                </div>
            </div>
            
            {/* Mobile Navigation Menu (Framer Motion) */}
            <AnimatePresence initial={false} onExitComplete={() => {
                try { window.dispatchEvent(new CustomEvent('mobileMenuCloseAnimationEnd', { detail: { open: false, ts: Date.now() } })) } catch {}
                try { document.body.classList.remove('mobile-menu-opened'); } catch {}
            }}>
            {isMobileMenuOpen && (
                <motion.div
                    key="mobileMenu"
                    className="mobile-nav-menu"
                    initial={{ y: '-110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 } }}
                    exit={{ y: '-110%', opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
                    onAnimationComplete={() => {
                        if (isMobileMenuOpen) {
                            try { window.dispatchEvent(new CustomEvent('mobileMenuOpenAnimationEnd', { detail: { open: true, ts: Date.now() } })) } catch {}
                        }
                    }}
                    style={{ left: 0, right: 'auto' }}
                >
                <div className="mobile-nav-items">
                {menuItems.map((item) => {
                    // Hide Services button when on /services route
                    if (item.path === '#services' && location.pathname === '/services') {
                        return null
                    }
                    
                    const isHashLink = item.path.startsWith('#')
                    
                    if (isHashLink) {
                        return (
                            <button
                                key={item.id}
                                className="mobile-nav-item"
                                onClick={() => {
                                    const targetId = item.path.substring(1)
                                    // If not on home page, navigate to home with hash so App-level
                                    // hash handler performs precise mount scroll.
                                    if (location.pathname !== '/') {
                                        navigate(`/#${targetId}`)
                                        return
                                    }

                                    const targetElement = document.getElementById(targetId)
                                    if (targetElement) {
                                        // Compute precise scroll position so navbar is flush with target top
                                        const navbarEl = document.querySelector('.navbar')
                                        const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
                                        const rectTop = targetElement.getBoundingClientRect().top + window.scrollY
                                        const styles = window.getComputedStyle(targetElement)
                                        const marginTop = parseFloat(styles.marginTop) || 0
                                        const borderTop = parseFloat(styles.borderTopWidth) || 0
                                        const scrollPosition = rectTop - navbarHeight - marginTop - borderTop
                                        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
                                    }
                                    setMobileMenuOpenAndBroadcast(false)
                                }}
                            >
                                {item.name === 'Home' && (
                                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                )}
                                {item.name === 'Services' && (
                                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {item.name === 'Why Us' && (
                                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                )}
                                {item.name === 'Contact Us' && (
                                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {item.name === 'FAQ' && (
                                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {item.name}
                            </button>
                        )
                    } else {
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className="mobile-nav-item"
                                onClick={() => setMobileMenuOpenAndBroadcast(false)}
                            >
                                <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {item.name}
                            </Link>
                        )
                    }
                })}
                {/* Add Sign In button under FAQ */}
                <Link to="/signin" className="mobile-nav-item" onClick={() => setMobileMenuOpenAndBroadcast(false)}>
                    <svg className="mobile-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Sign In
                </Link>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar