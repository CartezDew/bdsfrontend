import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { NavbarMenu } from '../mockData/data'
import { Home, Calculator, Users, Phone, HelpCircle, MessageCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/navbar.css'

const NavbarDesktop = ({ customConfig }) => {
    const [inServicesSection, setInServicesSection] = useState(false)
    const [inWhyUsSection, setInWhyUsSection] = useState(false)
    const [inContactSection, setInContactSection] = useState(false)
    const [inFaqSection, setInFaqSection] = useState(false)
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [suppressLinks, setSuppressLinks] = useState(false)
    const [pendingTarget, setPendingTarget] = useState(null) // 'services' | 'why-us' | 'contact' | 'faq'
    const REAPPEAR_MS = 1_000
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = customConfig || NavbarMenu

    // New: hide menu items while scrolling on >=680px, re-appear after idle
    const [scrollingHide, setScrollingHide] = useState(false)
    const scrollTimerRef = useRef(null)
    const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const cooldownUntilRef = useRef(0)
    const rafIdRef = useRef(0)

    // Slow initial enter on specific routes
    const slowEnterRoutes = ['/sign-in', '/get-started']
    const shouldSlowEnter = slowEnterRoutes.includes(location.pathname)
    const mountedOnceRef = useRef(false)
    useEffect(() => { mountedOnceRef.current = true }, [])

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 680px)')
        const onScroll = () => {
            if (!mq.matches) return
            const now = Date.now()
            if (now < cooldownUntilRef.current) return // ignore brief jiggles right after reveal
            if (rafIdRef.current) return
            rafIdRef.current = requestAnimationFrame(() => {
                rafIdRef.current = 0
                const prevY = lastScrollYRef.current
                const curY = window.scrollY
                lastScrollYRef.current = curY
                const delta = Math.abs(curY - prevY)
                if (delta < 6) return // ignore micro scroll noise

                if (!scrollingHide) setScrollingHide(true)
                if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
                scrollTimerRef.current = setTimeout(() => {
                    setScrollingHide(false)
                    // small cooldown so minor residual scroll doesn't immediately hide again
                    cooldownUntilRef.current = Date.now() + 600
                }, 240)
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        }
    }, [scrollingHide])

    useEffect(() => {
        // When route changes, ensure navbar can reveal smoothly and ignore initial layout scrolls
        cooldownUntilRef.current = Date.now() + 800
        setScrollingHide(false)
    }, [location.pathname])

    const getIconForMenuItem = (itemName) => {
        switch (itemName) {
            case 'Home':
                return <Home className="menu-icon" size={18} />
            case 'Services':
                return <Calculator className="menu-icon" size={18} />
            case 'Why Us':
                return <Users className="menu-icon" size={18} />
            case 'Contact Us':
                return <Phone className="menu-icon" size={18} />
            case 'Testimonials':
                return <MessageCircle className="menu-icon" size={18} />
            case 'FAQ':
                return <HelpCircle className="menu-icon" size={18} />
            default:
                return null
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate('/')
        }
    }

    // Detect when the key sections are visible on the home page
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (location.pathname !== '/') { 
            setInServicesSection(false)
            setInWhyUsSection(false)
            setInContactSection(false)
            setInFaqSection(false)
            return 
        }

        const observers = []
        const makeObserver = (id, setter, threshold = 0.35) => {
            const el = document.getElementById(id)
            if (!el) { setter(false); return }
            const obs = new IntersectionObserver((entries) => {
                const entry = entries[0]
                setter(!!(entry && entry.isIntersecting))
            }, { threshold })
            obs.observe(el)
            observers.push(obs)
        }

        makeObserver('services', setInServicesSection)
        makeObserver('why-us', setInWhyUsSection, 0.25)
        makeObserver('contact', setInContactSection, 0.25)
        makeObserver('faq', setInFaqSection, 0.35)

        return () => { observers.forEach(o => o.disconnect()) }
    }, [location.pathname])

    // Track when the navbar is actually visible (App wrapper toggles class)
    useEffect(() => {
        const appEl = document.querySelector('.App')
        if (!appEl) return
        const update = () => setNavbarVisible(!appEl.classList.contains('navbar-hidden'))
        update()
        const obs = new MutationObserver(update)
        obs.observe(appEl, { attributes: true, attributeFilter: ['class'] })
        return () => obs.disconnect()
    }, [])

    // Unsuppress links once the intended section is reached (or as a fallback timer)
    useEffect(() => {
        if (!suppressLinks) return
        const reached = (
            (pendingTarget === 'services' && inServicesSection) ||
            (pendingTarget === 'why-us' && inWhyUsSection) ||
            (pendingTarget === 'contact' && inContactSection) ||
            (pendingTarget === 'faq' && inFaqSection)
        )
        if (reached) {
            setSuppressLinks(false)
            setPendingTarget(null)
            return
        }
        const t = setTimeout(() => { setSuppressLinks(false); setPendingTarget(null) }, REAPPEAR_MS)
        return () => clearTimeout(t)
    }, [suppressLinks, pendingTarget, inServicesSection, inWhyUsSection, inContactSection, inFaqSection])

    const shouldShowMenu = !suppressLinks && !scrollingHide

    return (
        <nav className="navbar navbar-desktop">
            <div className="navbar-container">
                <div className="logo-section">
                    <button className="logo-link" onClick={handleLogoClick}>
                        <img src="/favicon.svg" alt="BDS Accounting Logo" className="logo-image-nav" />
                        <h1 className="logo-text-nav">Talent Group</h1>
                    </button>
                </div>
                {/* Menu items: keep mounted to avoid flicker; animate between hidden/visible */}
                {(
                  <motion.div
                    className="menu-section"
                    style={{ willChange: 'opacity, transform' }}
                    initial={ shouldSlowEnter && !mountedOnceRef.current ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 } }
                    animate={ (suppressLinks || scrollingHide)
                      ? { opacity: 0, y: -4, pointerEvents: 'none', transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }
                      : { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } }
                    }
                  >
                    {menuItems.map((item) => {
                        // Hide Testimonials on desktop navbar
                        if (item.name === 'Testimonials') return null
                        
                        // On dedicated services route, fully hide Services link
                        if (item.name === 'Services' && location.pathname === '/services') return null

                        // Hide the current section's button when that section is visible and navbar is mounted
                        const hideCurrentOnHome = location.pathname === '/' && navbarVisible && (
                            (item.name === 'Services' && inServicesSection) ||
                            (item.name === 'Why Us' && inWhyUsSection) ||
                            (item.name === 'Contact Us' && inContactSection) ||
                            (item.name === 'FAQ' && inFaqSection)
                        )
                        if (hideCurrentOnHome) return null
                        const isHashLink = item.path.startsWith('#')
                        const icon = getIconForMenuItem(item.name)
                        const linkClass = 'menu-link'
                        
                        if (isHashLink) {
                            return (
                                <button key={item.id} className={linkClass} onClick={() => {
                                    const targetId = item.path.substring(1)
                                    setPendingTarget(targetId)
                                    setSuppressLinks(true)
                                    if (location.pathname !== '/') { navigate(`/#${targetId}`); return }
                                    const targetElement = document.getElementById(targetId)
                                    if (targetElement) {
                                        const navbarEl = document.querySelector('.navbar')
                                        const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
                                        const rectTop = targetElement.getBoundingClientRect().top + window.scrollY
                                        const styles = window.getComputedStyle(targetElement)
                                        const marginTop = parseFloat(styles.marginTop) || 0
                                        const borderTop = parseFloat(styles.borderTopWidth) || 0
                                        const scrollPosition = rectTop - navbarHeight - marginTop - borderTop
                                        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
                                    }
                                    // Ensure navbar becomes visible when navigating away from hero
                                    try {
                                        const heroEl = document.getElementById('hero')
                                        if (heroEl) {
                                            const heroRect = heroEl.getBoundingClientRect()
                                            if (heroRect.bottom <= 0) {
                                                const appRoot = document.querySelector('.App')
                                                if (appRoot) appRoot.classList.remove('navbar-hidden')
                                            }
                                        }
                                    } catch {}
                                }}>
                                    {icon && icon}
                                    <span className="menu-text">{item.name}</span>
                                </button>
                            )
                        }
                        return (
                            <Link key={item.id} to={item.path} className={linkClass}>
                                {icon && icon}
                                <span className="menu-text">{item.name}</span>
                            </Link>
                        )
                    })}
                  </motion.div>
                )}
                <div className="icon-section">
                    <Link 
                        to="/get-started" 
                        className="get-started-btn"
                        onClick={(e) => {
                            if (location.pathname === '/get-started') {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavbarDesktop
