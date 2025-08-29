import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Calculator, Users, Phone, HelpCircle, LogIn, MessageCircle } from 'lucide-react'
import { NavbarMenu } from '../mockData/data'
import '../styles/navbar.css'

const NavbarMobile = ({ customConfig }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const isOpenRef = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = customConfig || NavbarMenu
    const menuRef = useRef(null)
    const openAtRef = useRef(0)

    // Check screen size and update mobile state
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 680)
        }
        
        // Check on mount
        checkScreenSize()
        
        // Add resize listener
        window.addEventListener('resize', checkScreenSize)
        
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const handleLogoClick = (e) => {
        e.preventDefault()
        
        // Use the isMobile state instead of checking window.innerWidth directly
        if (isMobile) {
            // On mobile, toggle the mobile navbar dropdown
            // If already open, close it; if closed, open it
            setIsOpen(!isOpen)
        } else {
            // On larger screens, use the original navigation behavior
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                navigate('/')
            }
        }
    }

    // Removed height calculation logic - not needed for mobile navbar
    // useLayoutEffect(() => {
    //     const setVar = () => {
    //         const nav = document.querySelector('.navbar-container') || document.querySelector('.navbar')
    //         const h = nav ? Math.round(nav.getBoundingClientRect().height) : 48
    //         document.documentElement.style.setProperty('--navbar-height', `${h}px`)
    //     }
    //     setVar()
    //     window.addEventListener('resize', setVar)
    //     return () => window.removeEventListener('resize', setVar)
    // }, [])

    // Mount / unmount logs
    useEffect(() => {
        return () => {}
    }, [])

    // Listen for global toggleMobileMenu events (from Hero/App)
    useEffect(() => {
        const handleExternalToggle = (e) => {
            if (isOpenRef.current) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }
        window.addEventListener('toggleMobileMenu', handleExternalToggle)
        return () => {
            window.removeEventListener('toggleMobileMenu', handleExternalToggle)
        }
    }, [])

    // Observe external class changes that might hide things
    useEffect(() => {
        const bodyObserver = new MutationObserver(() => {})
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        let appObserver
        const appEl = document.querySelector('.App')
        if (appEl) {
            appObserver = new MutationObserver(() => {})
            appObserver.observe(appEl, { attributes: true, attributeFilter: ['class'] })
        }

        return () => {
            bodyObserver.disconnect()
            if (appObserver) appObserver.disconnect()
        }
    }, [])

    // Publish state changes + duration tracking
    useEffect(() => {
        const now = Date.now()
        if (isOpen) {
            openAtRef.current = now
            document.body.classList.add('mobile-menu-opened')
        } else {
            const dt = now - (openAtRef.current || now)
        }
    }, [isOpen])

    const onHashClick = (hash) => {
        const targetId = hash.substring(1)
        if (location.pathname !== '/') { navigate(`/#${targetId}`); setIsOpen(false); return }
        const targetElement = document.getElementById(targetId)
        if (!targetElement) return
        // Smoothly scroll the exact section into view without manual offsets
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
    }

    const getIconForMenuItem = (name) => {
        switch (name) {
            case 'Home':
                return <Home className="mobile-nav-icon" size={18} />
            case 'Services':
                return <Calculator className="mobile-nav-icon" size={18} />
            case 'Why Us':
                return <Users className="mobile-nav-icon" size={18} />
            case 'Contact Us':
                return <Phone className="mobile-nav-icon" size={18} />
            case 'Testimonials':
                return <MessageCircle className="mobile-nav-icon" size={18} />
            case 'FAQ':
                return <HelpCircle className="mobile-nav-icon" size={18} />
            case 'Sign In':
                return <LogIn className="mobile-nav-icon" size={18} />
            default:
                return null
        }
    }

    return (
        <nav className="navbar navbar-mobile">
            <div className="navbar-container">
                <div className="logo-section">
                    <button className="logo-link" onClick={handleLogoClick} aria-label="Go to home">
                        <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image-nav" />
                        <h1 className="logo-text-nav">Talent Group</h1>
                    </button>
                </div>
                <button className={`mobile-nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => { 
                    setIsOpen(v => {
                        // Always allow close when open
                        if (isOpenRef.current && v) return false
                        // Opening: if already open (shouldn't happen), keep open; else open
                        return !v
                    })
                }} aria-label="Toggle mobile menu">
                    <span className="mobile-nav-line"></span>
                    <span className="mobile-nav-line"></span>
                </button>
                <div className="icon-section">
                    <Link 
                        to="/get-started" 
                        className="get-started-btn" 
                        onClick={(e) => { 
                            if (location.pathname === '/get-started') {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                            setIsOpen(false) 
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </div>

            <AnimatePresence initial={false} mode="wait" onExitComplete={() => { 
              try { document.body.classList.remove('mobile-menu-opened') } catch {}
              try { window.dispatchEvent(new CustomEvent('mobileMenuCloseAnimationEnd', { detail: { open: false, ts: Date.now() } })) } catch {}
            }}>
                {isOpen && (
                    <motion.div
                        key="mobileMenu"
                        className="mobile-nav-menu"
                        ref={menuRef}
                        initial={{ y: '-110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 } }}
                        exit={{ y: '-100%', opacity: 0.98, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } }}
                        onAnimationStart={() => {}}
                        onAnimationComplete={() => { 
                          if (isOpen) { try { window.dispatchEvent(new CustomEvent('mobileMenuOpenAnimationEnd', { detail: { open: true, ts: Date.now() } })) } catch {} }
                        }}
                        style={{ left: 0, right: 'auto' }}
                    >
                        <div className="mobile-nav-items">
                            {menuItems.map((item) => {
                                if (item.path === '#services' && location.pathname === '/services') return null
                                const isHash = item.path.startsWith('#')
                                const icon = getIconForMenuItem(item.name)
                                if (isHash) {
                                    return (
                                        <button key={item.id} className="mobile-nav-item" onClick={() => onHashClick(item.path)}>
                                            {icon}
                                            {item.name}
                                        </button>
                                    )
                                }
                                return (
                                    <Link key={item.id} to={item.path} className="mobile-nav-item" onClick={() => { setIsOpen(false) }}>
                                        {icon}
                                        {item.name}
                                    </Link>
                                )
                            })}
                            {/* Sign In */}
                            <Link to="/sign-in" className="mobile-nav-item" onClick={() => { setIsOpen(false) }}>
                                {getIconForMenuItem('Sign In')}
                                Sign In
                            </Link>
                            {/* CTA: Schedule Consultation */}
                            <Link 
                                to="/" 
                                className="mobile-nav-item cta-button-primary" 
                                onClick={(e) => { 
                                    if (location.pathname === '/') {
                                        // Already on home page → scroll to appointment scheduler
                                        e.preventDefault()
                                        const schedulerEl = document.getElementById('appointment-scheduler') || document.querySelector('.appointment-scheduler')
                                        if (schedulerEl) {
                                            const navbarEl = document.querySelector('.navbar')
                                            const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
                                            const rectTop = schedulerEl.getBoundingClientRect().top + window.scrollY
                                            const styles = window.getComputedStyle(schedulerEl)
                                            const marginTop = parseFloat(styles.marginTop) || 0
                                            const borderTop = parseFloat(styles.borderTopWidth) || 0
                                            const pos = rectTop - navbarHeight - marginTop - borderTop
                                            window.scrollTo({ top: pos, behavior: 'smooth' })
                                        }
                                    } else if (location.pathname === '/get-started' || location.pathname === '/sign-in') {
                                        // On get-started or sign-in → navigate to home and scroll to scheduler
                                        e.preventDefault()
                                        navigate('/', { state: { scrollTo: 'appointment-scheduler' } })
                                    } else {
                                        // Other route: default navigation to home
                                    }
                                    setIsOpen(false) 
                                }}
                            >
                                Schedule Consultation
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default NavbarMobile
